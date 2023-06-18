const Events = require('../models/events');
const { s3Client } = require('../db/spaces');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');

const GetEvents = async (req, res) => {
  try {
    const events = await Events.find({});
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  GetEvents,
};
