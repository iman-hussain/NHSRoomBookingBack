// @desc     Get all bookings
// @route    GET /bookings
// @access   Public
exports.getBookings = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM BOOKINGS_TB", function(err, rows) {
      req._oracledb.close();
      if (!err) {
        res.status(200).json({ success: true, rows});
      } else {
        console.log("Error while performing Query.");
      }
    });
};

// @desc     Get a booking
// @route    GET /bookings/:id
// @access   Public
exports.getBooking = async (req, res, next) => {
  var BOOKING_ID = req.params.id;

  req._oracledb.execute("SELECT * FROM BOOKINGS_TB WHERE BOOKING_ID = :BOOKING_ID", [BOOKING_ID], function(err, rows) {
      req._oracledb.close();
      if (!err) {
        res.status(200).json({ success: true, rows});
      } else {
        console.log("Error while performing Query.");
      }
    });
};

// @desc     Get a booking
// @route    DELETE /bookings/:id
// @access   Public
exports.deleteBooking = async (req, res, next) => {
  var BOOKING_ID = req.params.id;

  req._oracledb.execute("DELETE FROM BOOKINGS_TB WHERE BOOKING_ID = :BOOKING_ID", [BOOKING_ID], {autoCommit: true}, function(err, rows) {
      req._oracledb.close();
      if (!err) {
        res.status(200).json({ success: true, rows});
      } else {
        console.log("Error while performing Query.");
      }
    });
};

function getBookingFromRec(req) {
  const booking = {
    BOOKING_ID: req.body.BOOKING_ID,
    BOOKING_DATE: req.body.BOOKING_DATE,
    BOOKING_TIME: req.body.BOOKING_TIME,
    GUESTS: req.body.GUESTS,
    USER_ID: req.body.USER_ID,
    ROOM_ID: req.body.ROOM_ID,
    REVIEW_ID: null
  };

  return booking;
}

// @desc     Create a booking
// @route    POST /booking
// @access   Private
exports.postBooking = async (req, res, next) => {
  try {
    let booking = getBookingFromRec(req);

    const createSql = 
    "INSERT INTO BOOKINGS_TB VALUES ( :BOOKING_ID, :BOOKING_DATE, :BOOKING_TIME, :GUESTS, :USER_ID, :ROOM_ID, :REVIEW_ID)";

    const result = await req._oracledb.execute(createSql, booking, {autoCommit: true})
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};