import * as dotenv from 'dotenv'

import { ReaderFolder } from './reader';
import { Organizer } from './organizer/organizer';
import { MoveFiles } from './moveFiles';
import { ItemsGroupByKey } from './models/Items-group-by-key';

main();

async function main(){
  loadDotEnv();
  const folder: string = await askWhatDirWillBeOrganized();
  const newFolders = await groupFilesByContent(folder);
  await groupFilesByDateBirth(newFolders);
}



async function  groupFilesByContent(folder:string):Promise<string[]>{
  let org: Organizer = new Organizer();
  const itemsAgrupados: ItemsGroupByKey = await org.oranizeFolderByContent(folder);
  
  console.log(itemsAgrupados);
  const mov: MoveFiles = new MoveFiles();
   return await mov.move(itemsAgrupados, folder);
}

async function askWhatDirWillBeOrganized(): Promise<string> {
  let rf: ReaderFolder = new ReaderFolder();
  const folder: string = await rf.readerFolder();
  return folder;
}
async function groupFilesByDateBirth(newFolders: string[]) {
  let org: Organizer = new Organizer();
  const mov: MoveFiles = new MoveFiles();

  for (const newFolder of newFolders) {
    const itemsAgrupados: ItemsGroupByKey = await org.organizeFolderByLastChangeDate(newFolder);
    mov.move(itemsAgrupados, newFolder);
  }
}
function loadDotEnv(){
  dotenv.config(); 
}



