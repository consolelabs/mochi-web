import { IconEth } from '~components/icons/components/IconEth'
import { CurrencyIcon, CurrencyType } from '~components/icons/CurrencyIcon'
import { ITokenMetadata } from '~types/nft'
import { formatPrice } from '~utils/nft'
import { formatNumber } from '~utils/number'
import { formatDate, secondToDays } from '~utils/time'

interface Props {
  data?: ITokenMetadata | null
  chainTokenSymbol?: string
}

export const AssetStat = (props: Props) => {
  const {
    dob,
    total_owners,
    total_sales,
    current_hold_time_in_secs,
    longest_hold_time_in_secs,
    max_price,
    min_price,
    latest_listing,
  } = props.data || {}
  const chainTokenSymbol = props.chainTokenSymbol

  return (
    <div className="rounded-2xl overflow-hidden border border-theme px-4 py-5 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Max Price</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {max_price?.amount || 0}&nbsp;
          </span>
          {chainTokenSymbol && (
            <CurrencyIcon
              type={chainTokenSymbol as CurrencyType}
              className="text-2xl text-gray-400 dark:text-gray-600"
            />
          )}
          {!!max_price?.amount_in_usd && (
            <p className="text-green-500 text-sm font-medium">
              (${formatNumber(max_price?.amount_in_usd)})
            </p>
          )}
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">7D Sale</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {latest_listing?.amount || 0}&nbsp;
          </span>
          {chainTokenSymbol && (
            <CurrencyIcon
              type={chainTokenSymbol as CurrencyType}
              className="text-2xl text-gray-400 dark:text-gray-600"
            />
          )}
          {!!latest_listing?.amount_in_usd && (
            <p className="text-green-500 text-sm font-medium">
              (${formatNumber(latest_listing?.amount_in_usd)})
            </p>
          )}
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Past Owner</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {total_owners}
          </span>
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Current hold time</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {secondToDays(current_hold_time_in_secs || 0)} days
          </span>
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Min Price</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {min_price?.amount || 0}&nbsp;
          </span>
          {chainTokenSymbol && (
            <CurrencyIcon
              type={chainTokenSymbol as CurrencyType}
              className="text-2xl text-gray-400 dark:text-gray-600"
            />
          )}
          {!!min_price?.amount_in_usd && (
            <p className="text-green-500 text-sm font-medium">
              (${formatNumber(min_price?.amount_in_usd)})
            </p>
          )}
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Total Sale</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {total_sales}
          </span>
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Date of birth</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {formatDate(dob || '')}
          </span>
        </div>
      </div>
      <div className="text-center space-y-0.5">
        <span className="text-sm block text-gray-500">Longest hold time</span>
        <div className="flex items-center justify-center">
          <span className="font-semibold text-sm text-gray-800">
            {secondToDays(longest_hold_time_in_secs || 0)} days
          </span>
        </div>
      </div>
    </div>
  )
}
