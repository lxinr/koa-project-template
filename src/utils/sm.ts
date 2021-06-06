import path from 'path'
import fs from 'fs-extra'
import Sourcemap from 'source-map'

interface SourcemapParseOptions {
  smPath: string;
}

function fixPath(filepath: string) {
  return filepath.replace(/\.[\.\/]+/g, "");
}

export default class SourcemapParse {
  smPath: string;
  constructor(options: SourcemapParseOptions) {
    this.smPath = options.smPath
  }

  isExistPath() {
    return !!fs.existsSync(this.smPath)
  }
  /**
   * 获取真实行列及文件名信息
   *
   * @author liux
   * @date 2021-05-14
   * @param {{ column: number; line: number; url: string }} params
   * @returns 
   * @memberof SourcemapParse
   */
  getOriginalPosition(params: { column: number; line: number; url: string }) {
    return new Promise(async (resolve, reject) => {
      const { column, line, url } = params || {}
      const filename = path.basename(url as string)
      if(!this.isExistPath()) return reject(new Error(`目录 ${this.smPath} 不存在`))

      const sourceFile = fs.readdirSync(this.smPath).filter(v => v.includes('.map')).find(v => v.indexOf(filename as string) === 0) || ''
      if(!sourceFile) return reject(new Error(`根据url=${url} 未找到对应的map文件`))

      try {
        const sourcemapContent = fs.readFileSync(path.join(this.smPath, sourceFile), 'utf8') || ''  
        const smc = await new Sourcemap.SourceMapConsumer(sourcemapContent)
        const originalSource = smc.originalPositionFor({ line: Number(line), column: Number(column) })
        resolve(originalSource)
      } catch(e) {
        console.error(e)
        reject(e)
      }

    })
  }
  /**
   * 获取原始内容
   *
   * @author liux
   * @date 2021-05-14
   * @param {{ source: string; url: string }} params
   * @returns 
   * @memberof SourcemapParse
   */
  getSourceContent(params: { source: string; url: string }) {
    return new Promise(async (resolve, reject) => {
      const { source, url } = params || {}
      if(!this.isExistPath()) return reject(new Error(`目录 ${this.smPath} 不存在`))

      const filename = path.basename(url as string)
      const sourceFile = fs.readdirSync(this.smPath).filter(v => v.includes('.map')).find(v => v.indexOf(filename as string) === 0) || ''
      if(!sourceFile) return reject(new Error(`根据source=${source} 未找到对应的map文件`))

      try {
        const sourcemapContent = fs.readFileSync(path.join(this.smPath, sourceFile), 'utf8') || ''
        const { sources } = JSON.parse(sourcemapContent)
        const matchOriginalPathIndex = sources.findIndex((v: string) => path.basename(v) === path.basename(source as string))
  
        const smc = await new Sourcemap.SourceMapConsumer(sourcemapContent)
        resolve(smc.sourceContentFor(fixPath(sources[matchOriginalPathIndex])) || '')
      } catch(e) {
        console.error(e)
        reject(e)
      }
    })
  }
}