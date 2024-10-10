import { Component, inject, Input, OnInit } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCircle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { MArProgressComponent } from '../m-ar-progress/m-ar-progress.component'
import { Monitor } from '../../../monitors'
import { UrlCheckerService } from '../../services'

@Component({
  selector: 'app-m-https',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MArProgressComponent
  ],
  templateUrl: './m-https.component.html',
  styleUrl: './m-https.component.scss'
})
export class MHttpsComponent implements OnInit {

  @Input() monitor!: Monitor

  private readonly urlCheckerService = inject(UrlCheckerService)

  get faGlobe() { return faGlobe }
  get faCircle() { return faCircle }

  favicon: string | null = null

  ngOnInit() {
    if (this.monitor.url)
      this.urlCheckerService.checkUrl(this.monitor.url + '/favicon.ico').then(faviconUrl => {
        if (faviconUrl) {
          this.favicon = this.monitor.url + '/favicon.ico'
        }
      })
    }
}
