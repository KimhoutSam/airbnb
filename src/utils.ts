import fs from 'fs-extra'
import * as utils from '@poppinss/utils/build/helpers'
import * as sink from '@adonisjs/sink'

interface CopyOptions {
  root: string
  source: string
  destination: string
  extension: {
    from: string
    to: string
    exception?: boolean
  }
  accept?(value: string): boolean
  logger?(
    logger: typeof sink.logger,
    argument: {
      extension: {
        from: string
        to: string
      }
      root: string
      source: string
      destination: string
    }
  ): void
}

export const packageDotJson = () => {
  return fs.readJSONSync(`${__dirname}/../package.json`, { encoding: 'utf-8' })
}

export const copy = async ({
  source,
  accept,
  extension,
  destination,
  root,
  logger,
}: CopyOptions) => {
  if (await fs.pathExists(destination)) {
    logger?.(sink.logger, {
      extension,
      destination,
      root,
      source,
    })
    await fs.move(destination, destination)
  }

  // copy
  await fs.copy(`${root}/${source}`, destination, {
    recursive: true,
  })

  // rename
  const dest = await Promise.resolve(utils.fsReadAll(destination, () => true))
  const filterDest = await Promise.resolve(
    dest.filter((value) => {
      if (accept) {
        return accept(value)
      }
      return true
    })
  )
  const replaceDest = await Promise.resolve(
    filterDest.map((item) => {
      if (extension.exception) {
        return {
          oldPath: item,
          replace: item.replace(new RegExp(`${extension.from}`), extension.to),
        }
      }

      let from = ''
      let to = ''
      if (extension.from.startsWith('.')) {
        from = extension.from
      }
      if (!extension.from.startsWith('.')) {
        from = `.${extension.from}`
      }
      if (extension.to.startsWith('.')) {
        to = extension.to
      }
      if (!extension.from.startsWith('.')) {
        to = `.${extension.to}`
      }
      return {
        oldPath: item,
        replace: item.replace(new RegExp(`${from}`), to),
      }
    })
  )

  await Promise.resolve(
    replaceDest.forEach((item) => {
      fs.renameSync(
        `${root}/${destination}/${item.oldPath}`,
        `${root}/${destination}/${item.replace}`
      )
    })
  )
}
