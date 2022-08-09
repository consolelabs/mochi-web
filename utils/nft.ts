import { BigNumber, utils } from 'ethers'
import { formatNumber } from './number'

export const getNftPrice = ({ listing }: any) => {
  if (
    listing &&
    listing.listing_price_obj &&
    listing.listing_price_obj.amount
  ) {
    const { listing_price_obj } = listing

    const amountBN = BigNumber.from(listing_price_obj.amount)

    return Number(
      utils.formatUnits(amountBN, listing_price_obj.token?.decimals),
    )
  }
  return undefined
}

export const formatPrice = (
  priceModel?: any,
  defaultValue?: string | number,
) => {
  if (priceModel && priceModel.amount && priceModel.token) {
    const { amount, token } = priceModel
    const amountBN = BigNumber.from(amount)

    return formatNumber(
      Number(utils.formatUnits(amountBN, token.decimals ?? 18)),
    )
  }
  return defaultValue
}
