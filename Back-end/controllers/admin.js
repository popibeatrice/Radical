const jwt = require('jsonwebtoken');
const Sight = require('../models/sights');
const { s3Client } = require('../db/spaces');
const { isValidObjectId } = require('mongoose');
const {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require('@aws-sdk/client-s3');
const sights = require('../models/sights');
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
    res.status(200).end('All images uploaded successfully.');
  } catch (error) {
    res.status(401).json({
      error: 'Token is not valid!',
    });
  }
};

const GetDef = async (req, res) => {
  const { id } = req.params;
  if (!id || !isValidObjectId(id)) {
    res.status(401).json({
      error: 'Invalid ID',
    });
    return;
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

const EditSight = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'No token provided',
    });
    return;
  }
  const { id } = req.params;
  if (!id || !isValidObjectId(id)) {
    res.status(401).json({
      error: 'Invalid ID',
    });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const info = req.body;
    if (
      (info.newCover !== true && info.newCover !== false) ||
      (info.newExtra !== true && info.newExtra !== false)
    ) {
      res.status(401).end('ops');
      return;
    }
    if (info.newCover === false && info.newExtra === false) {
      await updateDocumentById(id, {
        titleRo: info.titluRo,
        titleEn: info.titluEn,
        descpRo: info.descpRo,
        descpEn: info.descpEn,
        type: info.type,
        lat: info.lat,
        lng: info.lng,
      }).catch((error) => {
        console.log(error);
      });
      if (info.toRemove.length !== 0) {
        const deletePromises = [];
        // Upload the images from the vector with different filenames
        for (const [image] of info.toRemove.entries()) {
          deletePromises.push(deleteFile('visitvaslui', image));
        }
        await Promise.all(deletePromises).catch((error) => {
          console.log(error);
        });
      }
      res.status(201).end('yey');
      return;
    }
    if (info.newCover === true && info.newExtra === true) {
      await updateDocumentById(id, {
        titleRo: info.titluRo,
        titleEn: info.titluEn,
        descpRo: info.descpRo,
        descpEn: info.descpEn,
        type: info.type,
        lat: info.lat,
        lng: info.lng,
      });

      await deleteFile('visitvaslui', `${id}/cover.jpg`);
      const uploadPromises = [];
      console.log(info.cover);
      uploadPromises.push(uploadImageToSpaces(info.cover, id, 'cover'));

      // Upload the images from the vector with different filenames
      for (const [index, image] of info.extra.entries()) {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${index}`;
        uploadPromises.push(uploadImageToSpaces(image, id, fileName));
      }
      // Wait for all upload promises to resolve
      await Promise.all(uploadPromises);

      if (info.toRemove.length !== 0) {
        const deletePromises = [];
        // Upload the images from the vector with different filenames
        for (const [index, image] of info.toRemove.entries()) {
          console.log(image);
          deletePromises.push(deleteFile('visitvaslui', image));
        }
        await Promise.all(deletePromises);
      }

      console.log('All images uploaded successfully.');
      res.status(201).end('yey');
    }
    if (info.newCover === true && info.newExtra === false) {
      await updateDocumentById(id, {
        titleRo: info.titluRo,
        titleEn: info.titluEn,
        descpRo: info.descpRo,
        descpEn: info.descpEn,
        type: info.type,
        lat: info.lat,
        lng: info.lng,
      });

      await deleteFile('visitvaslui', `${id}/cover.jpg`);
      console.log(info.cover);
      await uploadImageToSpaces(info.cover, id, 'cover');

      if (info.toRemove.length !== 0) {
        const deletePromises = [];
        // Upload the images from the vector with different filenames
        for (const [index, image] of info.toRemove.entries()) {
          console.log(image);
          deletePromises.push(deleteFile('visitvaslui', image));
        }
        await Promise.all(deletePromises);
      }

      console.log('All images uploaded successfully.');
      res.status(201).end('yey');
    }
    if (info.newCover === false && info.newExtra === true) {
      await updateDocumentById(id, {
        titleRo: info.titluRo,
        titleEn: info.titluEn,
        descpRo: info.descpRo,
        descpEn: info.descpEn,
        type: info.type,
        lat: info.lat,
        lng: info.lng,
      });

      const uploadPromises = [];

      // Upload the images from the vector with different filenames
      for (const [index, image] of info.extra.entries()) {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${index}`;
        uploadPromises.push(uploadImageToSpaces(image, id, fileName));
      }
      // Wait for all upload promises to resolve
      await Promise.all(uploadPromises);

      if (info.toRemove.length !== 0) {
        const deletePromises = [];
        // Upload the images from the vector with different filenames
        for (const [index, image] of info.toRemove.entries()) {
          console.log(image);
          deletePromises.push(deleteFile('visitvaslui', image));
        }
        await Promise.all(deletePromises);
      }
      console.log('All images uploaded successfully.');
      res.status(201).end('yey');
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 'Token is not valid!',
    });
  }
};

const DeleteSight = async (req, res) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'No token provided',
    });
    return;
  }
  const { id } = req.params;
  if (!id || !isValidObjectId(id)) {
    res.status(401).json({
      error: 'Invalid ID',
    });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await deleteDocumentById(id);
    await deleteFolder(id);
    res.status(200).end('yey');
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 'Token is not valid!',
    });
  }
};

async function updateDocumentById(id, updatedData) {
  try {
    const updatedDocument = await Sight.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the modified document after update
      useFindAndModify: false, // To disable deprecated method
    });
    if (!updatedDocument) {
      // Document with the provided id was not found
      throw new Error('Document not found');
    }
    return updatedDocument;
  } catch (error) {
    console.error(error);
    // Handle the error
  }
}

async function deleteFile(bucketName, key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);
    console.log('File deleted successfully:', response);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

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
    CacheControl: 'no-cache', // Disable caching for the image
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    console.log(`Image uploaded successfully.`);
  } catch (error) {
    throw error;
  }
}

async function deleteDocumentById(documentId) {
  try {
    await Sight.findByIdAndDelete(documentId);
    console.log('Document deleted successfully');
  } catch (err) {
    throw err;
  }
}

async function deleteFolder(folderKey) {
  try {
    // List all objects in the folder
    const listResponse = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: 'visitvaslui',
        Prefix: folderKey,
      })
    );

    // Extract the object keys
    const objectKeys = listResponse.Contents.map((object) => ({
      Key: object.Key,
    }));

    // Delete all objects in the folder
    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: 'visitvaslui',
        Delete: {
          Objects: objectKeys,
        },
      })
    );

    console.log('Folder deleted successfully');
  } catch (err) {
    console.error('Error deleting folder:', err);
    throw err;
  }
}

module.exports = {
  LogIn,
  VerifyAdminMain,
  CreateSight,
  GetDef,
  EditSight,
  DeleteSight,
};
