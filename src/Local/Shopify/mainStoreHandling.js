const Product = require("./Classes/Product");
const JDSBuyAPI = require('shopify-buy');

const fetch = require('isomorphic-fetch');
 
class ShopifyManager {

    constructor(config) {
        this.client = JDSBuyAPI.buildClient({
            domain: config.SHP_STORENAME,
            storefrontAccessToken: config.SHP_TOKEN
        }, fetch);
    }

    /* Gets a list of all the products in the store */
    getAllProducts(callback) {
        var productObjectsList = [];
        var productPromise = this.client.product.fetchAll()
        Promise.all([productPromise])
        .then(([products]) => {
            for (var i = 0; i < products.length; i++) {
                productObjectsList.push(new Product(products[i]));
            }
            if (productObjectsList.length) {
                callback(null, productObjectsList);
            }
            else {
                callback(1, null);
            }
        })
    }

    /*
     * Creates a checkout object which can be then sent to Shopify Storefront API through JSDBuy 
     * Returns a callback with the checkout object
    */
    getCheckoutForOrder(order, callback) {
        const _self = this;
        var lineItemsToAdd = [];
        var checkoutPromise = this.client.checkout.create()
        Promise.all([checkoutPromise])
        .then(([checkout]) => {
            /* Get products with the IDS found in order */
            for (var i = 0; i < order.length; i++) {
                const id = Buffer.from(order[i].product.id).toString('base64');
                lineItemsToAdd.push({
                    variantId: id,
                    quantity: order[i].quantity
                });
            }
            /* Add the items to the checkout object */
            _self.client.checkout.addLineItems(checkout.id, lineItemsToAdd).then((checkout) => {
                /* Callback weburl for payment */
                callback(checkout.webUrl);
            })
        })
    }

}

module.exports = ShopifyManager
