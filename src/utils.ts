import fs from 'fs'

export const packageDotJson = () => {
  const json = fs.readFileSync(`${__dirname}/../package.json`, 'utf-8')

  return JSON.parse(json)
}
