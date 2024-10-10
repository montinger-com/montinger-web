import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { MHttpsComponent } from '../../../shared'
import { MonitorsService } from '../../../monitors'
import { take } from 'rxjs'
import { MServerComponent } from '../../../shared/components/m-server/m-server.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MHttpsComponent,
    MServerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly monitorsService = inject(MonitorsService)

  get $$monitors() { return this.monitorsService.$$all }

  interval: any

  ngOnInit() {
    this.interval = setInterval(() => {
      this.monitorsService.getAll().pipe(take(1)).subscribe()
    }, 60000)
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
