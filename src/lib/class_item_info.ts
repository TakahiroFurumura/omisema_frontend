export default class ItemInfo {

  item_key: string;
  item_name: string;
  item_description: string;
  item_description_source_url: string;

  manufacturer_brand: string;
  manufacturer_brand_url: string;
  category: string;

  net_volume: number;
  net_volume_unit: string;
  net_weight: number;
  net_weight_unit: string;
  quantity: number;
  item_img_path: string;
  item_img_source_url: string;
  ref_price: number;

  rating: number;
  review_count: number;

  constructor(api_item_json: JSON | string) {

    if (api_item_json === 'test') {
      console.log('test')
    }
    else {
      console.log()
    }
    this.item_key = "123ABC";
    this.item_name = "商品名□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□";

    this.item_description = "商品の説明□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□";
    this.item_description_source_url = "";

    this.manufacturer_brand = "";
    this.manufacturer_brand_url = "";
    this.category = "";
    this.net_volume = 0;
    this.net_volume_unit = "";
    this.net_weight = 0;
    this.net_weight_unit = "個";
    this.quantity = 1
    this.item_img_path = "";
    this.item_img_source_url = "";
    this.ref_price = 100;

      this.rating = 3.5;
      this.review_count = 10;
    }
}
