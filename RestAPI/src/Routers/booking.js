const router = require("express").Router();
const Booking = require("../models/Booking");
const { addBookingValidation} = require('../validation')
//Add bokking route

router.post('/add-booking',async(req,res)=>{
    //Validate data must be a save
  const { error } = addBookingValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   //Add new booking details
   const booking = new Booking({
    brand:req.body.brand,
    vehicle:req.body.vehicle,
    user:req.body.user,
    contact:req.body.contact,
    handoverDate:req.body.handoverDate,
    returnDate:req.body.returnDate,
    
    
  });

  try {
    const savedBooking = await booking.save();
    console.log(savedBooking);
    // res.json(savedBooking);
    res.send('Your booking sucessfully saved!')
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;