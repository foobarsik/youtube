fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android build

```sh
[bundle exec] fastlane android build
```

Build the Android application.

### android appcenter

```sh
[bundle exec] fastlane android appcenter
```

Build and upload to App Center.

### android store

```sh
[bundle exec] fastlane android store
```

Upload build to Google Play.

----


## iOS

### ios devices

```sh
[bundle exec] fastlane ios devices
```

Fetch and setup devices

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Get certificates

### ios generate_new_certificates

```sh
[bundle exec] fastlane ios generate_new_certificates
```

Generate new certificates

### ios build

```sh
[bundle exec] fastlane ios build
```

Fetch devices, certificates and build the iOS application.

### ios appcenter

```sh
[bundle exec] fastlane ios appcenter
```

Build and upload to App Center.

### ios store

```sh
[bundle exec] fastlane ios store
```

Build and upload to App Store Connect.

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
