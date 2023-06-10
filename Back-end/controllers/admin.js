const jwt = require('jsonwebtoken');
const Sight = require('../models/sights');
const { s3Client } = require('../db/spaces');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const LogIn = async (req, res) => {
  const { nume, parola } = req.body;
  if (!nume || !parola) {
    res.status(404).json({
      error: 'Itroduceti numele si parola!',
    });
    return;
  }
  if (nume !== process.env.NUME || parola !== process.env.PAROLA) {
    res.status(404).json({
      error: 'Numele sau parola sunt gresite!',
    });
    return;
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({
    token,
  });
};

const VerifyAdminMain = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'No token provided',
    });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).end();
  } catch (error) {
    res.status(401).json({
      error: 'Token is not valid!',
    });
  }
};

const CreateSight = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'No token provided',
    });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { titluRo, titluEn, descpRo, descpEn, type, lat, lng, cover, extra } =
      req.body;
    if (
      !titluRo ||
      !titluEn ||
      !descpRo ||
      !descpEn ||
      !type ||
      !lat ||
      !lng ||
      !cover ||
      !extra
    ) {
      res.status(401).json({
        error: 'Fields are not provided!',
      });
      return;
    }
    const sight = await Sight.create({
      titleRo: titluRo,
      titleEn: titluEn,
      descpRo: descpRo,
      descpEn: descpEn,
      type: type,
      lat: lat,
      lng: lng,
    });
    const uploadPromises = [];
    console.log(cover);
    uploadPromises.push(uploadImageToSpaces(cover, sight._id, 'cover'));

    // Upload the images from the vector with different filenames
    for (const [index, image] of extra.entries()) {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${index}`;
      uploadPromises.push(uploadImageToSpaces(image, sight._id, fileName));
    }

    // Wait for all upload promises to resolve
    await Promise.all(uploadPromises);
    console.log('All images uploaded successfully.');

    // Send the response or perform other actions here
    res.end('All images uploaded successfully.');
  } catch (error) {
    res.status(401).json({
      error: 'Token is not valid!',
    });
  }
};

async function uploadImageToSpaces(base64Image, folderName, fileName) {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // Set the desired file extension (e.g., jpg)
  const fileExtension = 'jpg';

  // Set the file path in Spaces
  const filePath = `${folderName}/${fileName}.${fileExtension}`;

  const params = {
    Bucket: 'visitvaslui',
    Key: filePath,
    Body: buffer,
    ContentType: `image/${fileExtension}`,
    ACL: 'public-read', // Set ACL to public-read for making the file public
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    console.log(`Image uploaded successfully.`);
  } catch (error) {
    console.error(`Error uploading image.:`);
  }
}

const GetDef = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    res.status(401).json({
      error: 'oopsi',
    });
  }
  try {
    const sight = await Sight.find({ _id: id });

    const params = {
      Bucket: 'visitvaslui',
      Prefix: id,
    };
    const command = new ListObjectsV2Command(params);
    const response = await s3Client.send(command);
    const files = response.Contents.map((object) => object.Key);
    res.status(201).json({
      files,
      sight,
    });
  } catch (error) {
    res.status(401).json({
      error,
    });
    console.error('Error listing files in the folder:', error);
  }
};

module.exports = {
  LogIn,
  VerifyAdminMain,
  CreateSight,
  GetDef,
};
