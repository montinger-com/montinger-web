import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { HttpLoaderFactory, tokenInterceptor } from './core'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
}
