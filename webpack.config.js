const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDev = true;

module.exports = {
    mode: isDev ? "development" : "production",

    entry: path.resolve(__dirname, "src", "index.tsx"),

    output: {
        // filename: "[name].[contenthash:8].js",
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true,
        publicPath: "/",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: path.resolve(__dirname, "public", "favicon.ico"),
        }),
        isDev && new ReactRefreshWebpackPlugin(),
        new Dotenv(),
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,

                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]_[hash:base64:8]",
                            },
                        },
                    },
                    "sass-loader",
                ],
            },

            {
                test: /\.tsx?$/,

                use: {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({
                            before: [isDev && ReactRefreshTypeScript()].filter(
                                Boolean
                            ),
                        }),

                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },

            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            icon: true,
                            // svgoConfig: {
                            //   plugins: [
                            //     { name: "convertColors", params: { currentColor: true } },
                            //   ],
                            // },
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    devServer: {
        port: 5000,
        open: true,
        historyApiFallback: true,
        hot: true,
    },
};
