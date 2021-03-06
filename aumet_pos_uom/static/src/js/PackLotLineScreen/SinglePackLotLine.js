odoo.define('aumet_pod_uom.SinglePackLotLine', function (require) {
    'use strict';

    const SinglePackLotLine = require('point_of_sale.SinglePackLotLine');
    const Registries = require('point_of_sale.Registries');

    const SinglePackLotLineInh = (SinglePackLotLine) =>
        class extends SinglePackLotLine {
            onUomChange(e) {
                const uom_id = e.target.value;
                var real_qty = this.props.serial.real_qty;
                this.props.serial.uom = uom_id;
                var uom_obj = this.env.pos.units_by_id[uom_id];
                var newQty = this.env.pos.db.get_qty_for_selected_uom(uom_obj, real_qty);
                this.props.serial.location_product_qty = Math.floor(newQty);
                this.render();
            }

            onClickPlus(serial) {
                if (this.props.isSingleItem) {
                    if (this.props.serial.isSelected) {
                        this.trigger('toggle-Lot');
                        this.props.serial.isSelected = !this.props.serial.isSelected;
                    }
                    if (!this.props.isLotSelected) {
                        this.trigger('toggle-Lot');
                        this.props.serial.isSelected = !this.props.serial.isSelected;
                        let result = this.trigger('toggle-button-highlight');
                        if (result) {
                            this.render();
                        } else {
                            this.trigger('toggle-Lot');
                            this.props.serial.isSelected = !this.props.serial.isSelected;
                            return;
                        }
                    }
                    return;
                }
                this.props.serial.isSelected = !this.props.serial.isSelected;
                this.trigger('toggle-button-highlight');
                this.render();

            }

        }

    Registries.Component.extend(SinglePackLotLine, SinglePackLotLineInh);

    return SinglePackLotLine;

});
