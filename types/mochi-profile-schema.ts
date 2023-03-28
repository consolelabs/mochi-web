/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DtoAuthBlockchainAccountRequest {
  code: string
  signature: string
  wallet_address: string
}

export interface DtoMarkReadActivitiesRequest {
  ids: number[]
}

export interface DtoUpdateProfileInfoRequest {
  avatar?: string
  profile_name?: string
}

export interface ViewActivityResponse {
  action?: string
  action_description?: string
  created_at?: string
  id?: number
  platform?: string
  profile_id?: string
  read_at?: string
  status?: string
  updated_at?: string
}

export interface ViewActivityResponseData {
  data?: ViewActivityResponse[]
  pagination?: ViewPaginationResponse
}

export interface ViewAssociatedAccount {
  created_at?: string
  id?: string
  platform?: string
  platform_identifier?: string
  profile_id?: string
  updated_at?: string
}

export interface ViewAuthResponse {
  access_token?: string
}

export interface ViewDiscordGuild {
  features?: string[]
  icon?: string
  id?: string
  mochi_supported?: boolean
  name?: string
  owner?: boolean
  permissions?: string
}

export interface ViewMarkReadActivitiesResponse {
  message?: string
}

export interface ViewPaginationResponse {
  page?: number
  size?: number
  total?: number
}

export interface ViewProfile {
  associated_accounts?: ViewAssociatedAccount[]
  avatar?: string
  created_at?: string
  id?: string
  profile_name?: string
  updated_at?: string
}

export interface ViewUserDiscordGuilds {
  others?: ViewDiscordGuild[]
  owning?: ViewDiscordGuild[]
}
