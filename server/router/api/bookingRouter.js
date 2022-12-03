const router = require('express').Router();
// const { attachments } = require('../../config/takeConfig');/
// const AuthController = require('../../controllers/AuthController');
const bookingController = require('../../controllers/BookingController');
const auth = require('../../utils/auth');
const { upload } = require('../../utils/multerUtil');

router.post("/",auth.isAuthunticated,bookingController,bookingController.createBooking);
router.get("/slot/cn=:counsoler/st=:start_time/et=:end_time",auth.isAuthunticated, bookingController.getBookings);
router.put("/",auth.isAuthunticated, bookingController.reviewBooking);
router.delete("/",auth.isAuthunticated,bookingController.cancelBooking);

module.exports = router;
