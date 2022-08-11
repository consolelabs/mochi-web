export const padding = (value: string | number, length = 2, padding = '0') =>
  (padding.repeat(length - 1) + value).slice(-1 * length)

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
