import express from 'express';

const router = express.Router();

let interval = null;

//MAKE A REFRESH
router.route('/refresh').get(async (req, res) => {
  console.group('Request data:');
  console.log('Request from api was at ', new Date().toISOString());

  try {
    interval = setTimeout(async () => {
      await Promise.all([
        await fetch('https://fuel-price-r6f2.onrender.com/api/v1/refresh'),
        await fetch('https://cfm-fuelprices.onrender.com/api/v1/refresh')
      ]);

      console.log('Request to api was at ', new Date().toISOString());

    }, 1000*60*5);

    res.status(201).json({success: true, message: 'Success! API will be updated after 5 min'});
  } catch (error) {
    console.log('Something went wrong: ', error);
    clearTimeout(interval);
    res.status(500).json({success: false, message: error});
  } finally {
    console.groupEnd();
  }
});

export default router;