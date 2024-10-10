import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UrlCheckerService {

  constructor(private http: HttpClient) {}

  async checkUrl(url: string) {
    try {
      const response = await firstValueFrom(this.http.head(url, { observe: 'response' }))
      if (response)
        return response.status >= 200 && response.status < 300
      else
        return false
    } catch (error) {
      console.warn('Favicon URL might not be accessible:', error)
      return false
    }
  }
}
