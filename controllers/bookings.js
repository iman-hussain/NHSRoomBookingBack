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
