/**
 * Formats a price string to a localized currency display
 */
export function formatPrice(
  price: string | number,
  currency: string = "EUR",
  locale: string = "nl-NL"
): string {
  if (typeof price === "string") {
    price = parseFloat(price)
  }

  // Handle non-numeric values
  if (isNaN(price)) {
    return "N/A"
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
} 