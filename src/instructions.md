# Adonis Rapid

just a little touch you good go

1. you need install the invoke just setup pre-config, 
 this will setup base on pre-config and if your app
 has `resources` folder or `vite.config.(ts|js)` or `webpack.config.(ts|js)`
 that not replace but just move with prefix name `old.{filename/dirname}`

  ```bash
    $ node ace rapid:install
 ```
2. go to your `database/migration` directory paste

```ts
//...
table.string('name').nonNullable()
//...
```

