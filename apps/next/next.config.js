/**
 * @type {import('next').NextConfig}
 */
const withWebpack = {
    webpack(config) {
        if (!config.resolve) {
            config.resolve = {}
        }

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'react-native': 'react-native-web',
            'react-native$': 'react-native-web',
            'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
                'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
            'react-native/Libraries/vendor/emitter/EventEmitter$':
                'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
            'react-native/Libraries/EventEmitter/NativeEventEmitter$':
                'react-native-web/dist/vendor/react-native/NativeEventEmitter',
        }

        config.resolve.extensions = [
            '.web.js',
            '.web.jsx',
            '.web.ts',
            '.web.tsx',
            ...(config.resolve?.extensions ?? []),
        ]

        return config
    },
}

/**
 * @type {import('next').NextConfig}
 */
const withTurpopack = {
    turbopack: {
        resolveAlias: {
            'react-native': 'react-native-web',
            'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
                'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
            'react-native/Libraries/vendor/emitter/EventEmitter$':
                'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
            'react-native/Libraries/EventEmitter/NativeEventEmitter$':
                'react-native-web/dist/vendor/react-native/NativeEventEmitter',
        },
        resolveExtensions: [
            '.web.js',
            '.web.jsx',
            '.web.ts',
            '.web.tsx',

            '.js',
            '.mjs',
            '.tsx',
            '.ts',
            '.jsx',
            '.json',
            '.wasm',
        ],
    },
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    // devIndicators: false,
    images: {},
    transpilePackages: [
        'react-native',
        'react-native-web',
        'solito',
        'react-native-reanimated',
        'moti',
        'app',
        'react-native-css-interop',
        'react-native-gesture-handler',
    ],

    compiler: {
        define: {
            __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        },
    },
    // reanimated (and thus, Moti) doesn't work with strict mode currently...
    // https://github.com/nandorojo/moti/issues/224
    // https://github.com/necolas/react-native-web/pull/2330
    // https://github.com/nandorojo/moti/issues/224
    // once that gets fixed, set this back to true
    reactStrictMode: false,

    ...withWebpack,
    ...withTurpopack,
    typescript: {
        ignoreBuildErrors: true,
    },
}
