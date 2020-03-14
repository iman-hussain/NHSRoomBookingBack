// @desc     Get all reviews
// @route    GET /reviewss
// @access   Public
exports.getReviews = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM REVIEWS_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
  };