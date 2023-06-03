// IMPORTURI NECESARE
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// CONFIG GPT API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GptRo = async (req, res) => {
  const data = req.body.prompt;
  if (!data) {
    res.status(400).end();
    return;
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Esti un ghid profesionist, stii totul despre judetul Vaslui  si doar despre judetul Vaslui. Vei raspunde doar in limba romana si vei raspunde doar la intrebari legate de judetul Vaslui. Nu detii informatii legate de nimic altceva. Daca intrebarea nu este despre judetul Vaslui vei raspunde cu "Nu pot raspunde la aceasta cerinta!" Pentru intrebarile in care nu specifica exact de judetul Vaslui, vei raspunde la intrebare in contextul judetului Vaslui. Intrebarea este: ${data}`,
        },
      ],
      temperature: 0.5,
    });
    res.status(200).json({
      completion: response.data.choices[0].message,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const GptEn = async (req, res) => {
  const data = req.body.prompt;
  if (!data) {
    res.status(400).end();
    return;
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Esti un ghid profesionist, stii totul despre judetul Vaslui  si doar despre judetul Vaslui. Vei raspunde doar in limba romana si vei raspunde doar la intrebari legate de judetul Vaslui. Nu detii informatii legate de nimic altceva. Daca intrebarea nu este despre judetul Vaslui vei raspunde cu "Nu pot raspunde la aceasta cerinta!" Pentru intrebarile in care nu specifica exact de judetul Vaslui, vei raspunde la intrebare in contextul judetului Vaslui. Intrebarea este: ${data}`,
        },
      ],
      temperature: 0.5,
    });
    res.status(200).json({
      completion: response.data.choices[0].message,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { GptRo, GptEn };
