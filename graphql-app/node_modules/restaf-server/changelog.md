# Changes

## Version 6.0.0

  - Fixed issues with depedencies
  - Fixed issues with /appenv not being processed properly
  - Removed includes for hot-module since it does not work yet.

## Verson 5.0.0

  - Changes to the cli version are **breaking changes**. Stay with pre 5.* version if you want the previous behavior.
  - Upgraded the packages and in particular Babel and Webpack.
      - Using Babel to build the code in this release but the webpack config is left intact for reference.
  - Added new entry point of app to accept named parameters just as the new cli version does
  - Recommendations:
    - The growing trend is to install packages locally and use npx to execute them.
  -  Under-development:
    - Support for Hot-Module Replacement

## Version 4.4.0

  - Support specifing VIYA_SERVER with protocol

  This simplifies the set up of applications.


