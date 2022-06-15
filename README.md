## Install

```
asdf install
yarn
bundle install
cd ios && bundle exec pod install
```

Duplicate `.env.example` and save it as `.env.alpha` and fill values there.


Create release.keystore for android and put in in android/app folder

```
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

## Key features

* Modern Javascript (like [hooks](https://reactjs.org/docs/hooks-intro.html), [functional component](https://blog.logrocket.com/react-functional-components-3-advantages-and-why-you-should-use-them-a570c83adb5e/), etc)
* Typescript support, check this [cheatsheet](https://github.com/typescript-cheatsheets/react-native) and [typescript pros and cons](https://medium.com/@BuildMySite1/what-is-typescript-pros-and-cons-8dc5cdc3e78d) to learn more about it
* State is managed using global [Mobx](https://mobx.js.org/getting-started) stores. [This awesome collection](https://nicedoc.io/mobxjs/awesome-mobx) may help you to learn it
* Css-in-Js approach
* [Feature based structure ](https://reactjs.org/docs/faq-structure.html)
* [Fasline](https://docs.fastlane.tools/getting-started/cross-platform/react-native/) - the easiest way to automate beta deployments and releases for your iOS and Android apps. It handles all tedious tasks like generating screenshots, dealing with code signing and releasing your application.

## Key dependencies

* [React Native](https://facebook.github.io/react-native/)
* [Mobx](https://mobx.js.org/getting-started) to help manage state
* [React Navigation](https://reactnavigation.org/docs/getting-started) to handle routing and navigation in the app
* [Apisauce](https://github.com/infinitered/apisauce) to make API calls (Axios + standardized errors + request/response transforms)
* [Emotion](https://amanhimself.dev/blog/use-emotion-js-with-react-native/) - a flexible CSS-in-JS library
* [react-i18next](https://react.i18next.com/) which can help you localize your apps with ease
* [prettier](https://prettier.io/) and [eslint](https://eslint.org/) preconfigured for React Native
* [Bugsnag](https://docs.bugsnag.com/platforms/react-native/react-native/) - an error-monitoring tool that allows your developers to identify, prioritize and replicate bugs in a time-efficient and enjoyable manner
* [React-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) for adding splash screen to an app
* [Jest](https://jestjs.io/docs/tutorial-react-native) for testing
* [Husky](https://typicode.github.io/husky) allows us to easily wrangle Git hooks and run the scripts we want at those stages. You can use it to lint your commit messages, run tests, lint code, etc when you commit or push

## Directory layout

* src/assets: assets (image, audio files, ...) used by the application
* src/i18n: localization strings and utils, you can add languages files and be able to translate your app strings
* src/modules: components folder
* src/services: application services, e.g. API clients
* src/theme: base styles for the application
* src/types: contains types for Typescript support

