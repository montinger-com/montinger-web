import { formatDuration, getNearestSize } from './../../../core/util/calculation.functions'
import { Component, Input, signal } from '@angular/core'
import { Monitor } from '../../../monitors'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DatePipe } from '@angular/common'
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts'
import { EChartsOption } from 'echarts'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { simpleArchlinux, simpleLinux, simpleUbuntu, simpleLinuxserver, simpleRockylinux, simpleCentos } from '@ng-icons/simple-icons'

@Component({
  selector: 'app-m-server',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe, NgxEchartsDirective, NgIconComponent],
  providers: [provideEcharts(), provideIcons({ simpleArchlinux, simpleLinux, simpleUbuntu, simpleLinuxserver, simpleRockylinux, simpleCentos })],
  templateUrl: './m-server.component.html',
  styleUrl: './m-server.component.scss'
})
export class MServerComponent {

  private _monitor!: Monitor

  @Input() set monitor(mon: Monitor) {
    this._monitor = mon
    this.$$isError.set(this.isError())

    if (this.cpuChartInstance) {
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
    }

    if (this.memChartInstance) {
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
    }

    this.setupMemory()
    this.setupOS()
    this.setupKernel()

    this.$$platformIcon.set(this.getPlatformIcon(this.monitor.last_data?.os?.platform ?? '', this.monitor.last_data?.os?.type ?? ''))
    this.$$uptime.set(formatDuration(this.monitor.last_data?.uptime ?? 0))
  }
  get monitor(): Monitor {
    return this._monitor
  }

  $$isError = signal(false)
  $$usedMemory = signal('')
  $$totalMemory = signal('')
  $$platformIcon = signal(simpleLinuxserver)
  $$uptime = signal('')
  $$os = signal('')
  $$kernel = signal('')

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
              [0.6, '#3b82f6'],
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
          fontSize: 5,
          show: false
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

  setupMemory() {
    this.$$usedMemory.set(getNearestSize(this.monitor.last_data?.memory?.used ?? 0))
    this.$$totalMemory.set(getNearestSize(this.monitor.last_data?.memory?.total ?? 0))

    const usedSplitted = this.$$usedMemory().split(' ')
    const totalSplitted = this.$$totalMemory().split(' ')

    if (usedSplitted[1] == totalSplitted[1]) {
      this.$$usedMemory.set(usedSplitted[0])
    }
  }

  setupOS() {
    switch (this.monitor.last_data?.os?.platform) {
      case 'centos':
        this.$$os.set(`CentOS ${this.monitor.last_data?.os?.platform_version ?? ''}`)
        break

      case 'arch':
        this.$$os.set(`Arch Linux ${this.monitor.last_data?.os?.platform_version ?? ''}`)
        break

      default:
        this.$$os.set(`${this.monitor.last_data?.os?.platform.capitalizeFirst()} ${this.monitor.last_data?.os?.platform_version ?? ''}`)
    }
  }

  setupKernel() {
    this.$$kernel.set(`${this.monitor.last_data?.os?.kernel_arch ?? ''} ${this.monitor.last_data?.os?.type.capitalizeFirst() ?? ''} ${this.monitor.last_data?.os?.kernel_version ?? ''}`)
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

          case 'centos':
            return simpleCentos

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
