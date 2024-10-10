import { HttpInterceptorFn } from '@angular/common/http'
import { ApiConfig } from '../config'
import { inject } from '@angular/core'
import { AuthService, TokenService } from '../services'
import { catchError, mergeMap, throwError } from 'rxjs'

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const tokenService = inject(TokenService)

  const isApiUrl = req.url.startsWith(ApiConfig.apiBaseURL)
  const isLoginUrl = req.url.includes(`${ApiConfig.apiBaseURL}/auth/login`)
  const isRefreshUrl = req.url.includes(`${ApiConfig.apiBaseURL}/auth/refresh`)

  if (isRefreshUrl) {
    const $$refreshToken = tokenService.$$refreshToken

    if ($$refreshToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${$$refreshToken()}`
        }
      })

      return next(req)
    }
  }

  if (isApiUrl && !isLoginUrl) {
    const $$accessToken = tokenService.$$accessToken

    if ($$accessToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${$$accessToken()}`
        }
      })

      return next(req).pipe(catchError(err => {
        if (err.status === 401) {
          tokenService.setRefreshStatus(true)

          return authService.refreshToken().pipe(
            mergeMap(() => {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${$$accessToken()}`
                }
              })

              return next(req)
            }),
            catchError(() => {
              tokenService.setRefreshStatus(false)
              authService.signOut(window.location.href)
              return throwError(() => err)
            })
          )
        }

        return next(req)
      }))
    }
  }

  return next(req)
}
