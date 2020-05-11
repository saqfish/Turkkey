![Logo](https://github.com/saqfish/turkkey/blob/master/misc/logo.png)

Open-source Amazon Mechanical Turk scraper for mobile.

<a href="https://play.google.com/store/apps/details?id=com.turkkey">
  <img alt="Get it on Google Play"
       src="../../../images/brand/en_generic_rgb_wo_45.png" />
</a>

<div style="display: grid; width: 100%; grid-gap: 50px; justify-content: space-evenly;grid-template-columns: auto auto auto auto;">
  
<img style="display: block;" src="https://github.com/saqfish/turkkey/blob/master/screenshots/screen.png?raw=true" width="200px">
<img style="display: block;" src="https://github.com/saqfish/turkkey/blob/master/screenshots/screen2.png?raw=true" width="200px">
<img style="display: block;" src="https://github.com/saqfish/turkkey/blob/master/screenshots/screen3.png?raw=true" width="200px">
<img style="display: block;" src="https://github.com/saqfish/turkkey/blob/master/screenshots/screen4.png?raw=true" width="200px">

</div>

## Prerequisites
- [NodeJS](https://nodejs.org/en/download/)
- [JDK > 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Android Studio and Android SDK](https://developer.android.com/studio/index.html)


## Extra dependencies
  - [axios](https://github.com/axios/axios) 
  - [React-Navigation](https://reactnavigation.org/) 
  - [React-Paper](https://github.com/callstack/react-native-paper) 

## Project structure
This template follows a very simple project structure:
- `src`: This folder is the main container of all the code inside your application.
  - `styles`: This folder contains all seperated styles.
  - `styles.js`: The styles export file.
  - `utils`: This folder contains functional code seperated.
  - `utils.js`: The utils export file.
  - `components`: This folder contains all the components.
    - `Context.js`: Shared component context.
    - `Component`: Each component is stored in its own folder with seperate code. 
  - `App.js`: Main component.
- `index.js`: Main entry point to application.
- `misc`: Extra independent files, such as privacy policy, etc.
- `screenshots`: App screenshots. These should comply with Play Store guidelines.
- And all the other root react-native folders.

## Building for Google Play Store

- To build for the Play Store, follow this [guide](https://reactnative.dev/docs/signed-apk-android).

## What about iOS?

As soon as I get a Mac.


