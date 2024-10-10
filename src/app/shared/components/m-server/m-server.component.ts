import { getNearestSize } from './../../../core/util/calculation.functions'
import { Component, Input, signal } from '@angular/core'
import { Monitor } from '../../../monitors'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DatePipe } from '@angular/common'
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts'
import { EChartsOption } from 'echarts'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { simpleArchlinux, simpleLinux, simpleUbuntu, simpleLinuxserver, simpleRockylinux } from '@ng-icons/simple-icons'

@Component({
  selector: 'app-m-server',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe, NgxEchartsDirective, NgIconComponent],
  providers: [provideEcharts(), provideIcons({ simpleArchlinux, simpleLinux, simpleUbuntu, simpleLinuxserver, simpleRockylinux })],
  templateUrl: './m-server.component.html',
  styleUrl: './m-server.component.scss'
})
export class MServerComponent {

  private _monitor!: Monitor

  @Input() set monitor(mon: Monitor) {
    this._monitor = mon
    this.$$isError.set(this.isError())
  }
  get monitor(): Monitor {
    return this._monitor
  }

  $$isError = signal(false)

  getNearestSize = getNearestSize

  cpuChartInstance: any
  memChartInstance: any
  gaugeChartOption: EChartsOption = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.5, '#3b82f6'],
              [0.9, '#f97316'],
              [1, '#ef4444']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -15,
          length: 5,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -15,
          length: 15,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 17,
          fontSize: 0
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} %',
          color: 'inherit',
          fontSize: 12
        },
        data: [
          {
            value: 0
          }
        ]
      }
    ]
  }

  getPlatformIcon(platform: string, type: string) {
    switch (type) {
      case 'linux':
        switch (platform) {
          case 'arch':
            return simpleArchlinux

          case 'ubuntu':
            return simpleUbuntu

          case 'rocky':
            return simpleRockylinux

          default:
            return simpleLinux
        }

      default:
        return simpleLinuxserver
    }
  }

  isError(): boolean {
    let error = false

    if (this.monitor.last_data_on) {
      const now = new Date()
      const date = new Date(this.monitor.last_data_on)
      const diff = (now.getTime() - date.getTime()) / (1000 * 60)

      error = diff > 5
    }

    return error
  }

  onCPUChartInit(e: any) {
    this.cpuChartInstance = e

    setTimeout(() => {
      this.cpuChartInstance.setOption({
        series: [
          {
            data: [
              {
                value: this.monitor.last_data?.cpu?.used_percent?.toFixed(2)
              }
            ]
          }
        ]
      })
    }, 500)
  }

  onMemChartInit(e: any) {
    this.memChartInstance = e

    setTimeout(() => {
      this.memChartInstance.setOption({
        series: [
          {
            data: [
              {
                value: this.monitor.last_data?.memory?.used_percent?.toFixed(2)
              }
            ]
          }
        ]
      })
    }, 500)
  }
}
