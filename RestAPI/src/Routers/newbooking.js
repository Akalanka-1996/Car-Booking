const router = require("express").Router()
const {getBookingById, getBookings, createBooking, updateBooking, getCancelledBookings, getConfirmededBookings, updateConfirmedBooking, deleteBooking} = require('../controllers/bookingController')


const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getBookings)
router.route('/cancelled-bookings').get(getCancelledBookings)
router.route('/confirmed-bookings').get(getConfirmededBookings)
router.route('/create').post(createBooking)
router.route('/:id').get(getBookingById).put(updateBooking).delete(deleteBooking)
router.route('/update-confirmed-booking/:id').put(updateConfirmedBooking)

module.exports = router