// See http://brunch.io for documentation.
exports.paths = {
    public: '../public'
};

exports.files = {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'}
};

exports.modules = {
    autoRequire: {
        'app.js': ['main']
    }
};

exports.plugins = {
    postcss: {},
    replacement: {
        replacements: [{
            match: { find: 'pk_test_pIsbCWi9hua5DAc1GcPxlxPc', replace: process.env.STRIPE_PUBLISHED_KEY }
        }]
    }
};
