/* Class representing the structure of a product received from Shopify Product List */
class Product {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.desc = data.body_html;
        this.vendor = data.vendor;
        this.price = data.variants[0].price;
        this.productType = data.product_type;
        this.createdAt = data.created_at;
        this.images = [];
        this.thumbSrc = "";
        if (data.image) {
            this.thumbSrc = data.image.src;
        }
    }

    get dictionary() {
        return (
            {
                "id": `${this.id}`,
                "title": this.title,
                "desc": this.desc,
                "vendor": this.vendor,
                "price": this.price,
                "productType": this.productType,
                "createdAt": this.createdAt,
                "thumbSrc": this.thumbSrc
            }
        );
    }

}

module.exports = Product