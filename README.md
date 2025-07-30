# Solito Example Monorepo 🕴

This is the solito blank template from Fernando Rojo (nandorojo) plus other libraries. To use this template, you only need to clone this repo locally, check out the branch most adapts to your needs, and start modifying the configuration, changing names and write the rest of your app.

Many thanks to Fernando, for its great work on making solito and the blank template.

👾 [View the original solito website](https://example.solito.dev)

## 🔦 About

This monorepo is a blank(ish) starter for an Expo + Next.js app.

It is organized in different branches, containing each one a set of libraries for adding features.

-   The `main` branch contains the blank template, plus the expo-router, expo-dev-client libraries and the file-based routing folder structure.
-   The `firebase` branch contains all in the main branch plus the official js `firebase` library for using in web; and the `@react-native-firebase` library for using in mobile (expo). It also contains the config files, components, hooks, auth screens and an auth guard for protecting routes.

## 📦 Base template includes the following packages

-   `solito` for cross-platform navigation
-   `moti` for animations
-   Expo SDK 52
-   Next.js 15
-   React Navigation 7
-   React 19 (read more below)
-   React Compiler

## Components / Libraries

-   Firebase / react-native-firebase
-   Firebase Auth with Providers in NATIVE
-   Expo SecureStore for storing auth tokens in native
-   date-fns
-   @shopify/flash-list
-   expo-blur
-   expo-device
-   expo-font
-   expo-haptics
-   expo-symbols

For more, see the [compatibility docs](https://solito.dev/compatibility).

# Tailwind + shadcn

https://matinkhani.medium.com/create-a-turborepo-with-nextjs-tailwindcss-shadcn-6e6ecfd52aea

## 🗂 Folder layout

-   `apps` entry points for each app

    -   `expo`
    -   `next`

-   `packages` shared packages across apps
    -   `app` you'll be importing most files from `app/`
        -   `features` (don't use a `screens` folder. organize by feature.)
        -   `provider` (all the providers that wrap the app, and some no-ops for Web.)

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🗂 Navigation

Expo is configured to use expo-router's file based navigation in the `apps/expo/app` folder.
Next.js uses the next-router's `apps/next/app` folder for navigation.

## 🏁 Start the app

-   Install dependencies: `yarn`

-   Next.js local dev: `yarn web`
    -   Runs `yarn next`
-   Expo local dev:
    -   First, build a dev client onto your device or simulator
        -   `cd apps/expo`
        -   Then, either `expo run:ios`, or `eas build`
    -   After building the dev client, from the root of the monorepo...
        -   `yarn native` (This runs `expo start --dev-client`)

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

## 🎙 About the creator

Follow Fernando Rojo on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

## 🧐 Why use Expo + Next.js?

See my talk about this topic at Next.js Conf 2021:

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>
