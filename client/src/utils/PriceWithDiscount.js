// client/src/utils/PriceWithDiscount.js

export function pricewithDiscount(price, discountPercent) {
  if (!price || !discountPercent) return price;
  const discount = (price * discountPercent) / 100;
  return price - discount;
}