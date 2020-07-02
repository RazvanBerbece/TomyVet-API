var shopifyAPI = require('shopify-node-api');
const Product = require("./Classes/Product");
 
class ShopifyManager {

    constructor(config) {
        this.Shopify = new shopifyAPI({
            shop: config.SHP_STORENAME, // MYSHOP.myshopify.com
            shopify_api_key: config.SHP_APIKEY, // Your API key
            access_token: config.SHP_TOKEN, // Your API password
            verbose: false
          });
    }

    /* Gets a list of all the products in the store */
    getAllProducts(callback) {
        this.Shopify.get('/admin/products.json', (err, data, headers) => {
            var productObjectsList = [];
            if (!err) {
                // console.log(data.products[0].id);
                for (var i = 0; i < data.products.length; i++) {
                    productObjectsList.push(new Product(data.products[i]));
                }
                callback(null, productObjectsList);
            }
            else {
                callback(err, null)
            }
        });
    }

}

module.exports = ShopifyManager
