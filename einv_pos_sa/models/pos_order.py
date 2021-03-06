# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import base64

from odoo import fields, api, models


class POSOrder(models.Model):
    _inherit = 'pos.order'

    def _prepare_invoice_vals(self):
        vals = super()._prepare_invoice_vals()
        if self.company_id.country_id.code == 'SA':
            vals.update({'einv_sa_confirmation_datetime': self.date_order})
        return vals

class AccountMove(models.Model):
    _inherit = 'account.move'

    einv_sa_confirmation_datetime = fields.Datetime(string="Confirmation Datetime ")


