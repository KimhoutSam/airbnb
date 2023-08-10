# Adonis Rapid
> an redundent free auth/database configuration for adonisjs

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

A package for auto add authenticated pre-config plus if you using inertia from `eidellev/inertiajs-adonisjs`, i'm handle for you

## Installation

```bash
yarn add @sh8gh/adonis-rapid

node ace configure @sh8gh/adonis-rapid

# for inertia
node ace rapid:install inertia

# for template
node ace rapid:install template
```

## Usage

> (easy) just **`enable/disable`** what you using

```ts
// config/rapid.ts
export default {
    // ....

    features: [
        // > enable what you need
    ]
}
```

## Todo
- [] Upload Package To Npm For Test With Real World Adonis App
- [] Login View
- [] Register View
- [] Forgot Password View
- [] Reset Password View
- [] Two Factor Challenge View
- [] Verify Email View
- [] All Of View Functionality
- [] Add All Of Top With Inertia
- [] Manipulated User Model
- [] Write Document

## Thank to

- Laravel Jetstream For Idea
- Adonisjs Teams

[npm-image]: https://img.shields.io/npm/v/adonis-rapid.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-rapid "npm"

[license-image]: https://img.shields.io/npm/l/adonis-rapid?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
