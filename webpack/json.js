/**
 * Created by pusti on 29.07.2017.
 */
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(json)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    },
                },
            ],
        },
    };
};