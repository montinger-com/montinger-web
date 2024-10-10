import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from './core'
import { Observable, Subject, Subscription, catchError, debounceTime, filter, fromEvent, merge, of, switchMap, takeUntil, throttleTime, timer } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService)
  private readonly translate = inject(TranslateService)

  private userActive$!: Observable<Event | null>
  private readonly destroy$: Subject<void> = new Subject<void>()
  private activitySubscription!: Subscription

  title = 'Montinger'
  loginCheckInterval: any

  constructor() {
    this.translate.setDefaultLang('en')
    this.translate.use('en')
  }

  ngOnInit() {
    // Create an observable that emits events for both mouse movement and inactivity
    const mousemove$ = fromEvent(document, 'mousemove').pipe(debounceTime(250), takeUntil(this.destroy$))
    const inactivity$ = timer(5 * 60 * 1000).pipe(
      switchMap(() => of(null)) // Emit null instead of a number on inactivity
    ) // Emit after 5 minutes of inactivity

    this.userActive$ = merge(mousemove$, inactivity$).pipe(
      throttleTime(30000), // Emit every 30 seconds
    )

    this.activitySubscription = this.userActive$.pipe(
      filter(() => this.authService.$$isLogged()),
      filter(event => event instanceof MouseEvent),
      switchMap(() => this.authService.loginCheck()),
      catchError(error => {
        console.error("Error refreshing token:", error)
        return of(null)
      })
    )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
    this.activitySubscription.unsubscribe()
  }
}
