const {VueLoaderPlugin} = require('vue-loader')
module.exports={
    entry:__dirname+'/app/index.js',
    output:{
        path:__dirname + '/public',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }
            
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}