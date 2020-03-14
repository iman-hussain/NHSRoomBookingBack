// @desc     Get all rooms
// @route    GET /rooms
// @access   Public
exports.getRooms = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM ROOM_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
  };