const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/api", async (req, res) => {
  const { url, questionParam, answerParam } = req.body;

// customScrape(req, res);

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('https://www.simplilearn.com/tutorials/javascript-tutorial/javascript-interview-questions');

//     const questions = await page.evaluate(() => {
//       console.log("starting scrape");
//       return Array.from(
//         document.querySelectorAll('article h3'),
//         (e) => e.innerText
//       );
//     });

//     const answers = await page.evaluate(() => {
//       return Array.from(
//         document.querySelectorAll('article *'),
//         (e) => ({nodeType: e.nodeName, text: e.innerText})
//       );
//     });

//     const newAnswers = [];

//     // let questionIndex;
//     let questionStart = false;
//     for(let i = 0; i < answers.length; i++){
        
//         if(answers[i].nodeType === 'H3'){
//             newAnswers.push('Qeustion');
//         }else{
//             newAnswers.push('NOT Question');
//         }
//     }

//     console.log(newAnswers);

//     // console.log('answers: ', answers);

//     await browser.close();
//     res.status(200).json({ message: 'yeah'});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "failure" });
//   }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const questions = await page.evaluate((questionParam) => {
      console.log("starting scrape");
      return Array.from(
        document.querySelectorAll(questionParam),
        (e) => e.innerText
      );
    }, questionParam);

    const answers = await page.evaluate((answerParam) => {
      return Array.from(
        document.querySelectorAll(answerParam),
        (e) => e.innerText
      );
    }, answerParam);

    await browser.close();
    res.status(200).json({questions: questions, answers: answers});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failure" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
