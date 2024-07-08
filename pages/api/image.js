// pages/api/image.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const imagePath = path.join(process.cwd(), 'public', 'image.png');
  const imageBuffer = fs.readFileSync(imagePath);
  res.status(200).send(imageBuffer.toString('base64'));
}