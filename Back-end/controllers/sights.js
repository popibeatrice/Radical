const Sights = require('../models/sights');
const { s3Client } = require('../db/spaces');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');

const GetSightsCard = async (req, res) => {
  try {
    const sights = await Sights.find({});
    res.status(200).json({ sights });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const GetSightsExtra = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(401).json({
      error: 'oops!',
    });
    return;
  }
  try {
    const params = {
      Bucket: 'visitvaslui',
      Prefix: id,
    };
    const command = new ListObjectsV2Command(params);
    const response = await s3Client.send(command);
    const files = response.Contents.map((object) => object.Key);
    res.status(201).json({
      files,
    });
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};

module.exports = {
  GetSightsCard,
  GetSightsExtra,
};
