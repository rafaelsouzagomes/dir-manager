import fs from 'fs';
import path from 'path';

import { convertDateToDDmmYYYY } from '../utils/date-utils';
import { ReaderFolder } from '../reader';
import { OrganizerApiChatGPT } from './organizer-chat-gpt';
import { ItemsGroupByKey } from '../models/Items-group-by-key';

export class Organizer {

  async organizeFolderByBirthDate(folder: string): Promise<ItemsGroupByKey>{
    const propertyStatsToGroup = 'birthtime';
    return await this.groupByProperty(folder, propertyStatsToGroup);
  }

  async organizeFolderByLastChangeDate(folder: string): Promise<ItemsGroupByKey>{
    const propertyStatsToGroup = 'mtime';
    return await this.groupByProperty(folder, propertyStatsToGroup);
  }

  async oranizeFolderByContent(folder: string): Promise<ItemsGroupByKey>{
    const propertyStatsToGroup = 'subject';
    return await this.groupByProperty(folder, propertyStatsToGroup);
  }

  private async groupByProperty(folder:string, propertyToGroup: 'birthtime' | 'mtime' | 'subject' ) {
    let itensByDate: ItemsGroupByKey = {};
    const files = await fs.readdirSync(folder);

    for (const arq of files) {
      const pathAbsolute = path.join(folder, arq);
      const stats = fs.statSync(pathAbsolute);
      if (stats.isFile()) {

        let keyFormated = '';
        if(propertyToGroup === 'birthtime' || propertyToGroup === 'mtime'){
           keyFormated = convertDateToDDmmYYYY(stats[propertyToGroup]);
        }
        if(propertyToGroup == 'subject'){
          keyFormated = await this.getKeyBySubjectOfContent(folder,arq);
        }
        if (!itensByDate[keyFormated]) {
          itensByDate[keyFormated] = [pathAbsolute];
          continue;
        }
        itensByDate[keyFormated].push(pathAbsolute);
      }
    }
    return itensByDate;
  }

  private async getKeyBySubjectOfContent(folder: string, 
                                         arq: string) {
    const filePath = folder + '\\' + arq;
    let rf: ReaderFolder = new ReaderFolder();
    const fileContent:string = await rf.readFile(filePath);
    const fileContentCut = fileContent.slice(0,50);
    
    const orgOpenAi: OrganizerApiChatGPT = new OrganizerApiChatGPT();
    return await orgOpenAi.defineSubjectIA(fileContentCut);

  }

   private testHashMapEmTS() {
    let itensPerDate: ItemsGroupByKey = {};
    itensPerDate['12/02/2022'] = ['hi', 'hello'];
    itensPerDate['12/02/2022'].push('bye');
    itensPerDate['13/02/2022'] = ['new'];
    itensPerDate['13/02/2022'].push('novo');
    for (const key in itensPerDate) {
      console.log(itensPerDate[key]);
    }
  }
}