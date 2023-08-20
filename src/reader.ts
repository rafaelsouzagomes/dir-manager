import * as readline from 'readline';
import path from 'path';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export class ReaderFolder {

  async readerFolder(): Promise<string>{
    return new Promise<string>((resolve) => {
      const promptFolder = async () => {
        rl.question('What is the folder you want to organize?', async (folder) => {
          try {
            this.validateFolder(folder);
            rl.close();
            resolve(this.ajustarFolder(folder));
          } catch (error) {
            console.error(`${error}`);
            await promptFolder(); 
          }
        });
      };
  
      promptFolder();
    });
  }

  async readFile(filePath:string): Promise<string>{
    return new Promise<string>((resolve) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Ocorreu um erro ao ler o arquivo:', err);
          return;
        }
        resolve(data);
      });
    });
  }

  ajustarFolder(folder:string):string{
    return folder + "\\";
  }

  validateFolder(folder: string): void{
      if (!path.isAbsolute(folder)) {
        throw new Error('The URI is not a valid absolute path.');
      }
  
      if (!path.parse(folder).dir) {
        throw new Error('The URI does not represent a valid directory.');
      }
  }
}
