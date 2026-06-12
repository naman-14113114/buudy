/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const fs = require('fs');

const urls = [
  'https://img.shopbase.com/10650/10650730/themes/1766920053fb68c245be.jpeg',
  'https://img.shopbase.com/10650/10650730/themes/1766920808cb02e8fccb.jpeg',
  'https://img.shopbase.com/10650/10650730/themes/1766921087bd9c58a1a2.jpeg',
  'https://img.shopbase.com/10650/10650730/themes/176692126005ac4783ce.jpeg'
];

const names = [
  'tab-1-compact.jpeg',
  'tab-2-clinical.jpeg',
  'tab-3-precision.jpeg',
  'tab-4-rapid.jpeg'
];

const basePath = 'e:/1st YEAR DTU/New folder/uk.Buudy Vercel Deployment/public/images/products/buudy-red-torch/';

urls.forEach((url, i) => {
  const file = fs.createWriteStream(basePath + names[i]);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(() => console.log('Downloaded', names[i]));
    });
  });
});
