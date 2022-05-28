// API 生データ格納用＝MerchantOfferのコンストラクタ引数
export interface ApiMerchantOffer {
    platform_merchant_item_key: string,
    item_key: string,

    platform_id: number | string,
    platform_name: string,
    merchant_id: number | string,
    merchant_display_name: string,

    offer_url: string,
    price_with_tax: number | string,
    landed_price_with_tax: number | string,
    delivery_promise: string,
    expected_delivery_days: number | string,
    shipping_charge_with_tax: number | string,
    free_shipment_minimum_purchase: number | string,

    point: number | string,
    point_type: string,

    availability_level_id: number | string,
    min_shipment_days: number | string,
    max_shipment_days: number | string,
    min_delivery_days: number | string,
    max_delivery_days: number | string,
    snapshot_datetime: string,

    is_sponsored: boolean,
    sponsorship_disclosure_text: string

}

export default class MerchantOffer {

  platform_merchant_item_key: string;
  item_key: string;

  platform_id: number;
  platform_name: string;
  merchant_id: number;
  merchant_display_name: string;

  offer_url: string;
  price_with_tax: number | null;
  landed_price_with_tax: number | null;
  delivery_promise: string | null;
  expected_delivery_days: number | null;
  shipping_charge_with_tax: number | null;
  free_shipment_minimum_purchase: number | null;

  point: number | null;
  point_type: string | null;

  availability_level_id: number;
  min_shipment_days: number | null;
  max_shipment_days: number | null;
  min_delivery_days: number | null;
  max_delivery_days: number | null;
  snapshot_datetime: Date | null;

  is_sponsored: boolean;
  sponsorship_disclosure_text: string;

  constructor(api_offer_info: ApiMerchantOffer) {
    this.platform_merchant_item_key = api_offer_info.platform_merchant_item_key;
    this.item_key = api_offer_info.item_key;

    this.platform_id = typeof(api_offer_info.platform_id) === "string" ? parseInt(api_offer_info.platform_id) : api_offer_info.platform_id;
    this.platform_name = api_offer_info.platform_name;
    this.merchant_id = typeof(api_offer_info.merchant_id) === "string" ? parseInt(api_offer_info.merchant_id) : api_offer_info.merchant_id;
    this.merchant_display_name = api_offer_info.merchant_display_name;

    this.offer_url = api_offer_info.offer_url;
    this.price_with_tax = typeof(api_offer_info.price_with_tax) === "string" ? parseFloat(api_offer_info.price_with_tax) : api_offer_info.price_with_tax;
    this.landed_price_with_tax = typeof(api_offer_info.landed_price_with_tax) === "string" ? parseFloat(api_offer_info.landed_price_with_tax) : api_offer_info.landed_price_with_tax;

    if (api_offer_info.delivery_promise != null && api_offer_info.delivery_promise.length > 0) {
        this.delivery_promise = api_offer_info.delivery_promise;
    } else {
        this.delivery_promise = "お届け日数は店舗サイトでご確認下さい"
    }
    this.expected_delivery_days = typeof(api_offer_info.expected_delivery_days) === "string" ? parseInt(api_offer_info.expected_delivery_days) : api_offer_info.expected_delivery_days;
    this.shipping_charge_with_tax = typeof(api_offer_info.shipping_charge_with_tax) === "string" ? parseFloat(api_offer_info.shipping_charge_with_tax) : api_offer_info.shipping_charge_with_tax;
    this.free_shipment_minimum_purchase = typeof(api_offer_info.free_shipment_minimum_purchase) === "string" ? parseFloat(api_offer_info.free_shipment_minimum_purchase) : api_offer_info.free_shipment_minimum_purchase;

    if (api_offer_info.point !== null) {
      this.point = typeof(api_offer_info.point) === "string" ? parseFloat(api_offer_info.point) : api_offer_info.point;
    } else{
      this.point = null;
    }
    this.point_type = api_offer_info.point_type;

    this.availability_level_id = typeof(api_offer_info.availability_level_id) === "string" ? parseInt(api_offer_info.availability_level_id) : api_offer_info.availability_level_id;
    this.min_shipment_days = typeof(api_offer_info.min_shipment_days) === "string" ? parseInt(api_offer_info.min_shipment_days) : api_offer_info.min_shipment_days;
    this.max_shipment_days = typeof(api_offer_info.max_shipment_days) === "string" ? parseInt(api_offer_info.max_shipment_days) : api_offer_info.max_shipment_days;
    this.min_delivery_days = typeof(api_offer_info.min_delivery_days) === "string" ? parseInt(api_offer_info.min_delivery_days) : api_offer_info.min_delivery_days;
    this.max_delivery_days = typeof(api_offer_info.max_delivery_days) === "string" ? parseInt(api_offer_info.max_delivery_days) : api_offer_info.max_delivery_days;

    this.snapshot_datetime = new Date(api_offer_info.snapshot_datetime.replace('Z', ''));

    // 広告かどうか
    // Amazon.co.jp用
    if(this.merchant_id === 1000008702) {
      this.is_sponsored = true;
      this.sponsorship_disclosure_text = "omisema.comはAmazonアソシエイト契約に基づく収入を得ています。";
    }
    // 楽天
    else if (this.merchant_id === 1000009912 ) {
      this.is_sponsored = true;
      this.sponsorship_disclosure_text = "価格等の情報はomisema.comが管理掲載しており、実際と異なる場合があります。購入時に楽天市場各店舗で表示される条件が販売に適用されます。";
    }
    else {
      this.is_sponsored = false;
      this.sponsorship_disclosure_text = "";
    }

  }
}
