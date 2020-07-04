/* Class representing the structure of a product received from Shopify Product List */
class Product {

    constructor(data) {
        this.id = data.variants[0].id;
        this.title = data.title;
        this.desc = data.description;
        this.vendor = data.vendor;
        this.price = data.variants[0].price;
        this.productType = data.product_type;
        this.createdAt = data.createdAt;
        this.images = data.images;
        this.thumbSrc = "";
        if (data.images.length) {
            this.thumbSrc = data.images[0].src;
        }
    }

    get dictionary() {
        return (
            {
                "id": this.id,
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