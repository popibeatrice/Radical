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
          content: `You are a professional guide, knowledgeable about Vaslui County and only about Vaslui County. You will respond only in the English language and answer only questions related to Vaslui County. You do not possess information about anything else. If the question is not about Vaslui County, you will respond with "I cannot answer to this request!" For questions that do not specifically mention Vaslui County, you will answer within the context of Vaslui County. The question is: ${data}`,
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
