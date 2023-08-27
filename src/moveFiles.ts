import * as fs from 'fs';
import * as path from 'path';

import { isObjectEmpty } from './utils/object-utils';
import { ItemsGroupByKey } from './models/Items-group-by-key';

export class MoveFiles {

  move( itensAgrupados: ItemsGroupByKey, folder: string): string[]{

    if(isObjectEmpty(itensAgrupados)){
      throw new Error("no files found");
    }
    let newFolders = [];

    for(const key in itensAgrupados){
      const newFolderPath = this.createFolder(folder, key);
      if(newFolderPath){
        newFolders.push(newFolderPath + '\\');
        const filesPath = itensAgrupados[key];
        for(const filePath of filesPath){
          const fileName = path.basename(filePath);
          const newFilePath = path.join(newFolderPath, fileName);
          fs.renameSync(filePath, newFilePath);
          console.log(`File moved to ${newFilePath}`);
        }
      }
    }
    return newFolders;
  }

  private createFolder(folder:string, key: string): string | undefined {
    const nameFolder = folder + `${key}`;
    if (fs.existsSync(nameFolder)) {
        return nameFolder;
    }
    return fs.mkdirSync(nameFolder, { recursive: true });
  }



  test(folder: string){
    const x = 'xxxx'
    const test = fs.mkdirSync(folder+`/teste202${x}`, { recursive: true });
    console.log(test);
  }
}