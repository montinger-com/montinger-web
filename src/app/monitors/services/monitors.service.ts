import { Injectable, signal } from '@angular/core'
import { APIRequestResources, CachedAPIRequest } from '../../core'
import { HttpClient } from '@angular/common/http'
import { Monitor } from '../interfaces'
import { take, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MonitorsService extends CachedAPIRequest {

  $$all = signal([] as Monitor[])

  constructor(protected override http: HttpClient) {
    super(http, APIRequestResources.MonitorsService)

    this.getAll().pipe(take(1)).subscribe()
  }

  getAll() {
    return this.get<Monitor[]>({}, 'freshness').pipe(tap(res => this.$$all.set(res.data ?? [])))
  }
}
