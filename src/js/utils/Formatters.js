import accounting from 'accounting';

export const priceFormatter = (price) => {
  return accounting.formatMoney(price, {symbol: '$', precision: 0});
}