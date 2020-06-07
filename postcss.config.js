module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-url'),
        require('postcss-preset-env')({
            browsers: 'last 2 versions',
            stage: 0,
            autoprefixer: {
                grid: true,
            },
            features: {
                'custom-properties': {
                    preserve: false,
                },
                'custom-media-queries': {
                    preserve: false,
                },
            },
            importFrom: ['./src/libs/css/customProperties.css', './src/libs/css/customMedia.css'],
        }),
    ],
};
