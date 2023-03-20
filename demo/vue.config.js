const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            debugger;
            args[0].title = "Your program";
            return args;
        });
    },
    pluginOptions: {
        electronBuilder: {
            name: "your product",
            appId: "com.organization.program",
            productName: "Your program",
            preload: "src/preload.js",
            chainWebpackMainProcess: (_) => {},
        },
    },
});
