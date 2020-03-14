// @desc     Get all users
// @route    GET /users
// @access   Public
exports.getUsers = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM USERS_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
  };