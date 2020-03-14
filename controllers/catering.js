// @desc     Get all catering
// @route    GET /caterings
// @access   Public
exports.getCaterings = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM CATERING_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
  };