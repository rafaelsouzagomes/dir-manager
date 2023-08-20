import { ReaderFolder } from './reader';
import { Organizer } from './organizer';
import { ItemsGroupByKey } from './models/ItemsGroupByDate';
import { MoveFiles } from './moveFiles';

activate();

async function activate(){

  let rf: ReaderFolder = new ReaderFolder();
  const folder: string = await rf.readerFolder();
 
  let org: Organizer = new Organizer();
  const itemsAgrupados: ItemsGroupByKey = await org.oranizeFolderByContent(folder);
  
  const mov: MoveFiles = new MoveFiles();
  const newFolders =mov.move(itemsAgrupados, folder);
  
  for(const newFolder  of newFolders ){
    const itemsAgrupados: ItemsGroupByKey = await org.organizeFolderByBirthDate(newFolder);
    mov.move(itemsAgrupados, newFolder);
  }
}



