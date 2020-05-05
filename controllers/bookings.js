// @desc     Get all bookings
// @route    GET /bookings
// @access   Public
exports.getBookings = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM BOOKINGS_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
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

  req._oracledb.execute(
    "SELECT * FROM BOOKINGS_TB WHERE BOOKING_ID = :BOOKING_ID",
    [BOOKING_ID],
    function(err, rows) {
      req._oracledb.close();
      if (!err) {
        res.status(200).json({ success: true, rows });
      } else {
        console.log("Error while performing Query.");
      }
    }
  );
};

// @desc     Get all bookings matching user ID
// @route    GET /bookings/user/:id
// @access   Public
exports.getUserBookings = async (req, res, next) => {
  var USER_ID = req.params.id;
  console.log(USER_ID);
  console.log(req.params);
  req._oracledb.execute(
    "SELECT * FROM BOOKINGS_TB WHERE USER_ID = :USER_ID",
    [USER_ID],
    function(err, rows) {
      req._oracledb.close();
      if (!err) {
        console.log(rows)
        res.status(200).json({ success: true, rows });
      } else {
        console.log("Error while performing Query on UserBookings.");
      }
    }
  );
};


// @desc     Get a booking
// @route    DELETE /bookings/:id
// @access   Public
exports.deleteBooking = async (req, res, next) => {
  var BOOKING_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM BOOKINGS_TB WHERE BOOKING_ID = :BOOKING_ID",
    [BOOKING_ID],
    { autoCommit: true },
    function(err, rows) {
      req._oracledb.close();
      if (!err) {
        res.status(200).json({ success: true, rows });
      } else {
        console.log("Error while performing Query.");
      }
    }
  );
};

function getBookingFromRec(req) {
  const booking = {
    BOOKING_ID: null,
    BOOKING_DATE: req.body.BOOKING_DATE,
    BOOKING_TIME: req.body.BOOKING_TIME,
    DURATION: req.body.DURATION,
    GUESTS: req.body.GUESTS,
    COLOUR: req.body.COLOUR,
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

    const createSql = `INSERT INTO BOOKINGS_TB VALUES ( 
        :BOOKING_ID, 
        :BOOKING_DATE, 
        :BOOKING_TIME,
        :DURATION,
        :GUESTS, 
        :COLOUR,
        :USER_ID, 
        :ROOM_ID, 
        :REVIEW_ID)`;

    const result = await req._oracledb.execute(createSql, booking, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Update a booking
// @route    PUT /booking
// @access   Private
exports.putBooking = async (req, res, next) => {
  try {
    let booking = getBookingFromRec(req);

    const updateSql = `UPDATE BOOKINGS_TB
      SET BOOKING_DATE = :BOOKING_DATE, 
      BOOKING_TIME = :BOOKING_TIME, 
      GUESTS = :GUESTS, 
      USER_ID = :USER_ID, 
      ROOM_ID = :ROOM_ID, 
      REVIEW_ID = :REVIEW_ID
      WHERE BOOKING_ID = :BOOKING_ID`;

    const result = await req._oracledb.execute(updateSql, booking, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};