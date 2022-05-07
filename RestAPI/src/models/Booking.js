const number = require('@hapi/joi/lib/types/number');
const mongoose =require('mongoose');

const bookingSchema = new mongoose.Schema({

    brand:{
        type:String,
        min:6,
        max:100,
        required:true
    },
    vehicle:{
        type:String,
        min:6,
        max:100,
        required:true
    },
    user:{
        type:String,
        min:6,
        max:30,
        required:true
    },
    contact:{
     type:String,
     min:10,
     max:10,
     required:true
    },
    handoverDate:{
       type:String,
       required:true
    },
    returnDate:{
        type:String,
        required:true
    },
    bookingDate:{
        type:Date,
        default:Date.now()
    },
   
})

module.exports = mongoose.model('Booking',bookingSchema);