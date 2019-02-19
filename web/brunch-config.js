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
    postcss: {}
};
