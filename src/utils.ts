import fs from 'fs-extra'
import path from 'path'
import * as utils from '@poppinss/utils/build/helpers'
import * as sink from '@adonisjs/sink'

interface Packaging {
  name: string
  version: string
  dev: boolean
}

/**
 *
 * copy file with ease
 *
 * @param src a stub file
 * @param dest write stubs as
 * @param replace replace with current state
 */
export const copy = async (src: string, dest: string, replace?: Record<string, string>) => {
  if (fs.existsSync(dest)) {
    sink.logger.info(`seem the "${dest}" already there so [skip].`)
    return
  }
  let code = await fs.readFile(src, 'utf-8')

  if (replace) {
    Object.entries(replace).forEach(([key, value]) => {
      code = code.replace(new RegExp(`{{ ${key} }}`), value)
    })
  }

  if (fs.existsSync(dest)) {
    const baseName = path.basename(`${dest}`)
    const baseNameExt = path.extname(baseName)
    const name = baseName.replace(baseNameExt, '')

    await fs.move(dest, dest.replace(baseName, `${name}-${Date.now()}${baseNameExt}`))
  }

  await fs.writeFile(dest, code, 'utf-8')
}

export const move = async (src: string, dest: string, ext: Record<string, string>) => {
  if (fs.existsSync(dest)) {
    const destSpliting = dest.split('/')
    const destName = destSpliting.pop()
    const nextDestName = `/${path.join(...destSpliting, `${destName}-${Date.now()}`)}`

    await fs.move(dest, nextDestName)
  }

  await fs.copy(src, dest, {
    recursive: true,
  })

  const destFileList = await Promise.resolve(utils.fsReadAll(dest, () => true))

  destFileList.forEach(async (name) => {
    await fs.rename(
      `${dest}/${name}`,
      `${dest}/${name.replace(`${path.extname(name)}`, ext[path.extname(name).replace(/^\./, '')])}`
    )
  })
}

export const install = async (packageRoot: string, ...packages: Packaging[]) => {
  const npm = new sink.files.PackageJsonFile(packageRoot)

  packages.forEach(($package) => {
    sink.logger.info(
      `install "${$package.name}@${$package.version}" as ${
        $package.dev === false ? 'deps' : 'devDeps'
      }`
    )
    npm.install($package.name, $package.version, $package.dev).commit()
  })
}
