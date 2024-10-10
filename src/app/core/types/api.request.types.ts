import { APIRequestResources } from "../enums"

export type APIRequestResource = APIRequestResources.AuthService |
  APIRequestResources.MonitorsService

export type APIRequestCacheStrategy = 'performance' | 'freshness'

export type APIRequestMethod = 'delete' | 'get' | 'post' | 'put'