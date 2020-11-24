const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
    return {
        mode: 'none',
        entry: path.resolve(__dirname, './src/index.ts'),
        output: {
            path: path.resolve(__dirname, './dist'),
            libraryTarget: 'amd',
            filename: 'index.js',
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
        devtool: 'none',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    include: path.resolve(__dirname, './src'),
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                    include: [
                        path.resolve(__dirname, '../adaptive-expressions'),
                        path.resolve(
                            __dirname,
                            '../../node_modules/@microsoft/recognizers-text-data-types-timex-expression'
                        ),
                        path.resolve(__dirname, '../../node_modules/antlr4ts'),
                        path.resolve(__dirname, '../../node_modules/lru-cache'),
                        path.resolve(__dirname, '../../node_modules/yallist'),
                    ],
                },
            ],
        },
    };
};
