function compare_price(a, b) {
  // 価格nullは最後
  if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) {
    return 1
  }
  else if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) {
    return -1
  }

  // 表示中の価格種別で場合分け
  // 送料あり、ポイント除く
  // shipping_charge_with_taxがnull/undifinedの場合は、ペナルティで千円足して比較
  let a_price_landed = a.price_with_tax + (a.shipping_charge_with_tax != null ? a.shipping_charge_with_tax : 1000)
  let b_price_landed = b.price_with_tax + (b.shipping_charge_with_tax != null ? b.shipping_charge_with_tax : 1000)
  if (a.price_is_shipping_charge_inclusive && !a.price_is_net_of_point) {
    if (a_price_landed < b_price_landed) {
      return -1;
    } else {
      return 1;
    }
  }
  // 送料あり、ポイント引き後
  let a_price_landed_net_point = a_price_landed - (a.point ? a.point : 0);
  let b_price_landed_net_point = b_price_landed - (b.point ? b.point : 0);
  // 送料あり、ポイント引き後
  if (a.price_is_shipping_charge_inclusive && a.price_is_net_of_point) {
    if (a_price_landed_net_point < b_price_landed_net_point) {
      return -1;
    } else {
      return 1;
    }
  }
  // 送料なし、ポイント引き後
  let a_price_net_point = a.price_with_tax - (a.point ? a.point : 0);
  let b_price_net_point = b.price_with_tax - (b.point ? b.point : 0);
  // 送料なし、ポイント除く
  if (!a.price_is_shipping_charge_inclusive && !a.price_is_net_of_point) {
    if (a_price_net_point < b_price_net_point) {
      return -1;
    } else {
      return 1;
    }
  }
  // どれにも該当しなければ、とりあえず生価格で並べ替え
  if (a.price_with_tax < b.price_with_tax) {
    return -1;
  } else {
    return 1;
  }
}

export {
  compare_price,
}