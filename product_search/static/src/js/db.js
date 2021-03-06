odoo.define('product_search.db', function (require) {
"use strict";


    var POS_db = require('point_of_sale.DB');
    var models = require('point_of_sale.models');

    models.load_fields('product.product',['active_ingredient_ids', 'supplier_data_json']);


    POS_db.include({
        init: function(options){
                var self = this;
                this._super(options);

        },



        _product_search_string: function(product){
        var str = product.display_name;
        if (product.barcode) {
            str += '|' + product.barcode;
        }
        if (product.default_code) {
            str += '|' + product.default_code;
        }
        if (product.seller_ids_name) {
            str += '|' + product.seller_ids_name;
        }
        if (product.description) {
            str += '|' + product.description;
        }
        if (product.description_sale) {
            str += '|' + product.description_sale;
        }
        var supplier_data_list = JSON.parse(product.supplier_data_json);
            for(var i = 0, len = supplier_data_list.length; i < len; i++){
                var supplier_data = supplier_data_list[i];
                if (supplier_data.supplier_name) {
                    str += '|' + supplier_data.supplier_name.replace(/:/g,'');
                }
            }
        str  = product.id + ':' + str.replace(/:/g,'') + '\n';
        return str;
    },


    });
});
