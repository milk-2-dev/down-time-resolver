import express from 'express';
import * as dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

let timer = null;

//MAKE A REFRESH
router.route('/refresh').get(async (req, res) => {
  if (timer) {
    clearTimeout(timer);
  }

  console.group('Request data:');
  console.log('Request from api - ', new Date().toISOString());

  try {
    timer = setTimeout(async () => {
      const apiUrls = JSON.parse(process.env.API_URLS);

      await Promise.all(apiUrls.map(url => fetch(url)));

      console.log('Request to api - ', new Date().toISOString());
    }, 1000 * 60 * 5);

    res.status(201).json({success: true, message: 'Success! API will be updated after 5 min'});
  } catch (error) {
    console.log('Something went wrong: ', error);
    clearTimeout(timer);
    res.status(500).json({success: false, message: error});
  }

  console.groupEnd();
});

export default router;