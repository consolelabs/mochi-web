import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

import { MOCHI_PAY_API, MOCHI_PROFILE_API } from '../envs'

const MOCHI_PROFILE = wretch(MOCHI_PROFILE_API)
  .addon(QueryStringAddon)
  .errorType('json')

const MOCHI_PAY = wretch(MOCHI_PAY_API)
  .addon(QueryStringAddon)
  .errorType('json')

export const API = {
  MOCHI_PROFILE,
  MOCHI_PAY,
}

export const apiLogin = (token: string) => {
  API.MOCHI_PROFILE = MOCHI_PROFILE.auth(`Bearer ${token}`)
  API.MOCHI_PAY = MOCHI_PAY.auth(`Bearer ${token}`)
}

export const apiLogout = () => {
  API.MOCHI_PROFILE = MOCHI_PROFILE
  API.MOCHI_PAY = MOCHI_PAY
}
