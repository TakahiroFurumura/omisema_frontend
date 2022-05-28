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

  review_rating: number;
  review_count: number;

  item_keywords: string;

  constructor(api_item_info: {
    item_key: string,
    item_name: string,
    item_description: string,
    item_description_source_url: string,
    manufacturer_brand: string,
    manufacturer_brand_url: string,
    category: string,
    net_volume: number,
    net_volume_unit: string,
    net_weight: number,
    net_weight_unit: string,
    quantity: number,
    img: string,
    img_source_url: string,
    ref_price: number,
    review_rating: number,
    review_count: number,
    item_keywords: string,
  }) {

    this.item_key = "123ABC";
    this.item_name = "商品名□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□";

    this.item_description = "商品の説明□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□";
    this.item_description_source_url = "";

    this.manufacturer_brand = "Brand";
    this.manufacturer_brand_url = "Brand URL";
    this.category = "Category";
    this.net_volume = 0;
    this.net_volume_unit = "";
    this.net_weight = 0;
    this.net_weight_unit = "個";
    this.quantity = 1
    this.item_img_path = "";
    this.item_img_source_url = "";
    this.ref_price = 100;
    this.review_rating = 3;
    this.review_count = 59;

    this.item_key = api_item_info.item_key;
    this.item_name = api_item_info.item_name;
    this.item_description = api_item_info.item_description;
    this.item_description_source_url = api_item_info.item_description_source_url;
    this.manufacturer_brand = api_item_info.manufacturer_brand;
    this.manufacturer_brand_url = api_item_info.manufacturer_brand_url;
    this.category = api_item_info.category;
    this.net_volume = api_item_info.net_volume;
    this.net_volume_unit = api_item_info.net_volume_unit;
    this.net_weight = api_item_info.net_weight;
    this.net_weight_unit = api_item_info.net_weight_unit;
    this.quantity = api_item_info.quantity;
    this.item_img_path = "https://omisema.com/assets/images/item_imgs/" + api_item_info.img;
    this.item_img_source_url = api_item_info.img_source_url;
    this.ref_price = api_item_info.ref_price;
    this.review_rating = api_item_info.review_rating;
    this.review_count = api_item_info.review_count;
    this.item_keywords = api_item_info.item_keywords;
    /*
    this.item_description: response.data[key].item_description,
    this.item_description_source_url: response.data[key].item_description_source_url,
    this.manufacturer_brand: response.data[key].manufacturer_brand,
    this.manufacturer_brand_url: response.data[key].manufacturer_brand_url,
    this.category: response.data[key].category,
    this.net_volume: response.data[key].net_volume,
    this.net_volume_unit: response.data[key].net_volume_unit,
    this.net_weight: response.data[key].net_weight,
    this.net_weight_unit: response.data[key].net_weight_unit,
    this.quantity: response.data[key].quantity,
    this.item_img_path: response.data[key].img == null ? null
        :"https://omisema.com/assets/images/item_imgs/" + response.data[key].img,
    this.item_img_source_url: response.data[key].img_source_url,
    this.ref_price: Number(response.data[key].ref_price),
    this.is_link_to_offer_list:true,

     */

  }
}
