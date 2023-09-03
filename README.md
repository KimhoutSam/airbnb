# Adonis Rapid ( preview )
> an redundent free auth/database/user-management configuration for adonisjs

> ## Motivate: WHY SPEND A HOUR/DAY TRY TO SETUP AUTHENTICATION
> ## Motivate: WHY SETUP A TEMPLATE WASTE OF TIME TO MAKE IT TO PRODUCTION

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

A package for auto add authenticated pre-config plus if you using inertia from `eidellev/inertiajs-adonisjs`, i'm handle for you

## Installation

```bash
yarn add adonis-rapid

node ace configure adonis-rapid

# choose between template you want

"what client stack you wanted use?"

> static?

"do you want to copy default rapid views?"

> yes?

# and you good to go copy what in your base folder
# to rapid resources app

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

> want to override the route? no problem

```ts
// providers/AppProvider
export default class AppProvider {
    public async boot() {
        const Features = this.app.container.use('SH8GH/Rapid/Features')

        Features.LoginRenderer(async ({ view }, data) => {
            return view.render('welcome', data)
        })
    }
}


```
## How To

##### With Disable
![with disable](https://raw.githubusercontent.com/SH8GH/adonis-rapid/dev-cjs/image/disable-something.png)

##### With fully enable
![with fully enable](https://raw.githubusercontent.com/SH8GH/adonis-rapid/dev-cjs/image/fully-enable.png)

## Todo
- &check; Upload Package To Npm For Test With Real World Adonis App
- &cross; Login View Route
- &cross; Register View Route
- &cross; Forgot Password View Route
- &cross; Reset Password View Route
- &cross; Two Factor Challenge View Route
- &cross; Verify Email View Route
- &cross; All Of View Functionality
- &cross; Add All Of Top With Inertia
- &cross; Manipulated User Model
- &cross; Maximize `Configurator` Namespace With Ease
- &cross; Write Document

## Specials Thank to

- [Laravel Jetstream](https://jetstream.laravel.com/) for idea.
- [Adonisjs Teams](https://adonisjs.com/) for best package develpment

# Note: 
- this is my first project so i do not know to manage project.
- this is my frustrated when create a app and always need authentication.
- this is my problem so make sure don't break your stuff so don't install for now.


[npm-image]: https://img.shields.io/npm/v/adonis-rapid.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-rapid "npm"

[license-image]: https://img.shields.io/npm/l/adonis-rapid?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
