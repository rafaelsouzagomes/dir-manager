# Dir-Manager
Organize your directories by theme and other properties using AI

# Operation
This project is a Node.js application that allows organizing directories based on themes and creation dates. When running the program with npm run start, the user will be prompted to provide a source directory for organization. The system will then:

1. Organize the directory by theme, using the ChatGPT API to determine the theme of each file.
2. Create subfolders based on the identified themes.
3. Sort the files into their respective subfolders based on the theme.

It is important to note that to use the theme identification feature with the ChatGPT API, users need to provide their own API key in process.env.CHATGPT_API_KEY.

# Technologies Used
Node.js: The application is developed in Node.js, a JavaScript runtime platform that allows building server-side applications.

ChatGPT API: We use the ChatGPT API to identify the themes of files based on their content. Make sure to set up your own API key in the process.env.CHATGPT_API_KEY configuration file.

# Prerequisites
Before running the project, make sure you have the following installed:

Node.js: [Node.js Installation](https://nodejs.org/en)

Este é um trecho de código `npm install`.
# Installation
1. Install the dependencies:
   
`npm install`.

# Usage
1. Configure your ChatGPT API key in process.env.CHATGPT_API_KEY.

2. Run the program:

`npm run start`

# Contribution
It's just the begining, contributions are welcome! Feel free to open issues or submit pull requests with improvements.
