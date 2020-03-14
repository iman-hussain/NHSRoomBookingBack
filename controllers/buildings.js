// @desc     Get all buildinga
// @route    GET /buildings
// @access   Public
exports.getBuildings = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM BUILDING_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
};