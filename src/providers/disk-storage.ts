import fs from "node:fs"
import path from "node:path"

import uploadConfig from "@/configs/upload"

class DiskStorage{
  async saveFile(file: string){
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file)
    const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      
    } catch (error) {
      console.log(error)
      throw new Error("Arquivo não encontrato: " + tmpPath)
    }
  }
}

export {DiskStorage}