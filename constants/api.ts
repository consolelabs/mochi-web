import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

import { MOCHI_PAY_API, MOCHI_PROFILE_API } from './env'

export const API = {
  MOCHI_PROFILE: wretch(MOCHI_PROFILE_API)
    .addon(QueryStringAddon)
    .errorType('json'),
  MOCHI_PAY: wretch(MOCHI_PAY_API).addon(QueryStringAddon).errorType('json'),
}
