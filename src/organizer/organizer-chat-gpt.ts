import OpenAI from 'openai';

export class OrganizerApiChatGPT {

  openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY
   });


  subjectsOptionsAvailable = 
      [ "Work",
        "Studies",
        "Finances",
        "Health",
        "Travel",
        "Family",
        "Entertainment",
        "Personal",
        "Professional",
        "Hobbies"
      ];

                      
  async defineSubjectIA(fileContent: string): Promise < string > {
    let prompt =
    'From the content called: fileContent bellow, read it ' +
    'and choose in which of the categories, that I will write below, fits best. ' +
    'Only respond with a single category name( just one word), and it must always be one of the categories. ' +
    `These are the categories that we need to use: ${this.subjectsOptionsAvailable.join(', ')}. ` +
    '. You need to answer with just 1 word and this word needs to be a category.' +
    'And this is the fileContent that you are going to use to determine the answer: ' +
    fileContent ;
    
    let completion;
    try {
      completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }); 
    } catch(error) {
       console.log(error);
    }

    if(completion && completion.choices[0].message.content && completion.choices[0].message.content?.length < 15){
      return completion.choices[0].message.content;
    }
    return 'Others'
  }
}