import fs from 'fs';
import path from 'path';

import { ItemsGroupByKey } from './models/ItemsGroupByDate';
import { convertDateToDDmmYYYY } from './utils/date-utils';
import { ReaderFolder } from './reader';

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
          const filePath = folder + '\\'+ arq;
          let rf: ReaderFolder = new ReaderFolder();
          const fileContent = await rf.readFile(filePath);
          keyFormated = this.defineSubjectIA(fileContent);
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

  defineSubjectIA(fileContent: string): string {
    const values = ["Work", 
                    "Studies", 
                    "Finances", 
                    "Health And Wellness", 
                    "Travel", 
                    "Family And Home", 
                    "Entertainment",
                    "Personal Projects",
                    "Professional Resources",
                    "Hobbies"];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
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