import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';


interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './ts/app.ts'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', 'less', '.svg'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, '.babelrc'),
                    },
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: "assets", to: "assets" },
        //     ],
        // }),
        new ESLintPlugin({ extensions: ['ts'], failOnWarning: false, emitError: true }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, "./tsconfig.json"),

            }
        }
        )
    ],
    devServer: {
        static: path.join(__dirname, 'src'),
        historyApiFallback: true,
        port: 3000,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        // open: {
        // 	app: {
        // 		name: 'google-chrome',
        // 	},
        // },
        hot: true,
    },
}

export default config;