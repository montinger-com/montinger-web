import { Component, inject, signal } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../services'
import { map, take } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private toastr = inject(ToastrService)
  private translate = inject(TranslateService)

  loginForm: FormGroup

  get $$isLogged() {
    return this.authService.$$isLogged
  }

  $$loading = signal(false)

  constructor() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  check() {
    this.route.queryParamMap.pipe(map((params: any) => params.get('next'))).pipe(take(1)).subscribe({
      next: next => {
        if (this.$$isLogged() && !next) this.router.navigateByUrl('/')
        if (this.$$isLogged() && next) window.location.href= next
      },
    })
  }

  loginWithUsernamePassword() {
    if (this.loginForm.valid) {
      this.$$loading.set(true)
      this.authService.signInWithCredentials(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: () => {
          this.check()
          this.$$loading.set(false)
        },
        error: (err) => {
          if (err.error.errors) {
            if (err.error.errors.message) this.toastr.error(err.error.errors.message)
            else
              err.error.errors.forEach((error: string) =>
                this.toastr.error(error)
              )
          }

          console.error(err)
          this.$$loading.set(false)
        },
      })
    } else {
      this.toastr.error(this.translate.instant('login.correct_errors'))
    }
  }
}
