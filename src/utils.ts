import fs from 'fs-extra'

export const copy = async (src: string, dest: string, replace: Record<string, string>) => {
  let code = await fs.readFile(src, 'utf-8')

  Object.entries(replace).forEach(([key, value]) => {
    code = code.replace(new RegExp(`{{ ${key} }}`), value)
  })

  await fs.writeFile(dest, code)
}
