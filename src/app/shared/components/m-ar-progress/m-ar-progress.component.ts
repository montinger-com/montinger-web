import { AfterViewInit, Component, Input, signal } from '@angular/core'
import { MonitorHistory } from '../../../monitors'

@Component({
  selector: 'app-m-ar-progress',
  standalone: true,
  imports: [],
  templateUrl: './m-ar-progress.component.html',
  styleUrl: './m-ar-progress.component.scss'
})
export class MArProgressComponent implements AfterViewInit {

  @Input() history_data!: MonitorHistory[]

  $$progress = signal([] as any[])

  ngAfterViewInit() {
    const maxResponseTime = Math.max(...this.history_data.map(data => data.response_time))
    const progress: any[] = []

    this.history_data.forEach(data => {
      progress.push({ height: (data.response_time / maxResponseTime) * 100, status: data.status_code < 400 ? 2 : 3})
    })

    this.$$progress.set(progress)

    console.log(progress)
  }
}
