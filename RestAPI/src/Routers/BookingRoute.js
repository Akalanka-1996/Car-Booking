const router = require("express").Router();
let Booking = require("./../models/Booking");

router.route("/book").post((req, res) => {
  const name = req.body.name;
  const contact_no = req.body.contact_no;
  const email = req.body.email;
  const handover_location = req.body.handover_location;
  const handover_date = req.body.handover_date;
  const handover_time = req.body.handover_time;
  const return_date = req.body.return_date;

  const NewBooking = new Booking({
    name,
    contact_no,
    email,
    handover_location,
    handover_date,
    handover_time,
    return_date,
  });

  NewBooking.save()
    .then(() => {
      res.json("Booking Added");
    })
    .catch(() => {
      console.log(err);
    });
});

router.route("/displaybook").get((req, res) => {
  Booking.find()
    .then((booking) => {
      res.json(booking);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/updatebook/:id").put(async (req, res) => {
  let bookingId = req.params.id;
  const { username, nic, email, password } = req.body;

  const updateBooking = {
    username,
    nic,
    email,
    password,
  };
  const update = await Booking.findByIdAndUpdate(bookingId, updateBooking)
    .then(() => {
      res.status(200).send({ status: "Booking updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error in updating booking data" });
    });
});

module.exports = router;
