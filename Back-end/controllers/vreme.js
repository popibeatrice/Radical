require('dotenv').config();
const axios = require('axios');

const GetVreme = async (req, res) => {
  try {
    const rawVremeRes = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.VREME_KEY}&q=Vaslui`
    );
    const vremeRes = {
      temp: rawVremeRes.data.current.temp_c,
      text: rawVremeRes.data.current.condition.text,
    };
    res.status(200).json(vremeRes);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  GetVreme,
};
