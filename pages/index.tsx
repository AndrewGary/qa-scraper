import React, { useState } from "react";

const initialFormValues = {
  url: "",
  questionParameter: "",
  answerParameter: "",
};


export default function Home() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: formValues.url,
        questionParam: formValues.questionParameter,
        answerParam: formValues.answerParameter,
      }),
    };

    const resp = await fetch("http://localhost:3000/api", reqOptions);

    // console.log(resp);

    const parsedResp = await resp.json();

    setQuestions(parsedResp.questions);
    setAnswers(parsedResp.answers);

    console.log(parsedResp);
  };

  const pushToDatabase = async (e) => {

    const cards = questions.map((question, i) => {
      return {
        frontText: question,
        backText: answers[i],
      }
    })

    console.log(cards);
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cards: [...cards]
      }),
    };

    const resp = await fetch('/api/scrape', reqOptions);
    console.log('resp: ', resp);
    const parsedResp = await resp.json();
    console.log('parsedResp: ', parsedResp);
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-2">
      <div className="w-1/2 h-1/2 flex justify-center items-center border border-black rounded-md">
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-center items-center flex-col space-y-1"
        >
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Website URL</label>
            <input
              name="url"
              className="pl-1 border border-black"
              type="input"
              value={formValues.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="">Question Selector</label>
            <input
              name="questionParameter"
              className="pl-1 border border-black"
              type="input"
              value={formValues.questionParameter}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="">Answer Selector</label>
            <input
              name="answerParameter"
              className="pl-1 border border-black"
              type="input"
              value={formValues.answerParameter}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="border border-black rounded-md">
            Scrape
          </button>
        </form>
      </div>

      {answers.length > 0 || questions.length > 0 && (
        <div className="w-[80%] flex flex-col">
          <div className="w-full flex">
            <span className="w-1/2 text-center">Question</span>
            <span className="w-1/2 text-center">Answer</span>
          </div>
          <div className="flex">
            <div className="w-1/2 flex flex-col">
              {questions.map((question) => {
                return (
                  <div className=" pl-1 h-20 border border-black overflow-auto">
                    {question}
                  </div>
                );
              })}
            </div>

            <div className="w-1/2 flex flex-col">
              {answers.map((answer) => {
                return (
                  <div className="pl-1 h-20 border border-black overflow-auto">
                    {answer}
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={pushToDatabase} className="border border-black my-4">Push To Database</button>
        </div>
      )}
    </div>
  );
}
