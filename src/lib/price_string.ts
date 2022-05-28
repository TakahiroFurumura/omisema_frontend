function price_from_str(price_val: number) {
  if (!price_val) return '';
  return (Number(price_val).toLocaleString('ja-JP', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '円～')
}

function price_str(price_val: number) {
  if (!price_val) return '';
  return (Number(price_val).toLocaleString('ja-JP', {minimumFractionDigits: 0, maximumFractionDigits: 0})) + "円"
}

function commaValStr(price_val: number) {
  if (!price_val) return '';
  return (Number(price_val).toLocaleString('ja-JP', {minimumFractionDigits: 0, maximumFractionDigits: 0}))
}


export {
    price_from_str,
    price_str,
    commaValStr
}