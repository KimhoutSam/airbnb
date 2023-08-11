# Adonis Rapid
> an redundent free auth/database/user-management configuration for adonisjs

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

A package for auto add authenticated pre-config plus if you using inertia from `eidellev/inertiajs-adonisjs`, i'm handle for you

## Installation

```bash
yarn add adonis-rapid

node ace configure adonis-rapid

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
- &check; Upload Package To Npm For Test With Real World Adonis App
- &check; Login View Route
- &cross; Register View Route
- &cross; Forgot Password View Route
- &cross; Reset Password View Route
- &cross; Two Factor Challenge View Route
- &cross; Verify Email View Route
- &cross; All Of View Functionality
- &cross; Add All Of Top With Inertia
- &cross; Manipulated User Model
- &cross; Write Document

## Specials Thank to

- [Laravel Jetstream](https://jetstream.laravel.com/)
- [Adonisjs Teams](https://adonisjs.com/)

[npm-image]: https://img.shields.io/npm/v/adonis-rapid.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-rapid "npm"

[license-image]: https://img.shields.io/npm/l/adonis-rapid?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
