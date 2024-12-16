import express from 'express';

const router = express.Router();

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
      await Promise.all([
        fetch('https://fuel-price-r6f2.onrender.com/api/v1/refresh'),
        fetch('https://cfm-fuelprices.onrender.com/api/v1/refresh')
      ]);

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