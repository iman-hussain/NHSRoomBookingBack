// @desc     Get all toilets
// @route    GET /toilets
// @access   Public
exports.getToilets = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM TOILET_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
  };