import { test } from '@japa/runner'

const property: () => PropertyDecorator = () => {
  return (target, propertyKey) => {
    console.log(target.constructor.name, propertyKey)
    return
  }
}

function ReturnClass() {
  class Foo {
    @property()
    public bar: number
  }

  return Foo
}

test('return class', async () => {
  const Returning = ReturnClass()

  const returning = new Returning()

  returning.bar
})
