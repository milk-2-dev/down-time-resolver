import express from 'express';

const router = express.Router();

let interval = null;

//MAKE A REFRESH
router.route('/refresh').get(async (req, res) => {
  console.group('Request data:');
  console.log('Request for refresh was at ', new Date().toISOString());


  try {
    interval = setTimeout(async () => {
      await fetch('https://fuel-price-r6f2.onrender.com/api/v1/refresh');

      console.log('Request back was at ', new Date().toISOString());

      console.groupEnd();
    }, 1000*60*5);

    res.status(201).json({success: true, message: 'Success! fuel-price-r6f2.onrender.com will be updated after 5 min'});
  } catch (error) {
    clearTimeout(interval);
    res.status(500).json({success: false, message: error});
  }
});

export default router;