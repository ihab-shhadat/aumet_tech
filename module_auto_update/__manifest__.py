{
    "name": "Module Auto Update",
    "summary": "Automatically update Odoo modules",
    "version": "14.0.1.0.1",
    "category": "Extra Tools",
    "website": "https://github.com/OCA/server-tools",
    "author": "LasLabs/Itqan, ",
    "license": "LGPL-3",
    "installable": True,
    'post_init_hook': 'test_post_init_hook',
    "uninstall_hook": "uninstall_hook",
    "depends": ["base"],
    "data": ["views/ir_module_module.xml"],
    "development_status": "Production/Stable",
}
