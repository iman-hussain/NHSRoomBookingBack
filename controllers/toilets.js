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

  function getToiletFromRec(req) {
    const toilet = {
      TOILET_ID: req.body.TOILET_ID,
      GENDERS: req.body.GENDERS,
      DISABILITY_ASSESSIBLE: req.body.DISABILITY_ASSESSIBLE,
      BABY_CHANGING: req.body.BABY_CHANGING,
      LAST_CLEANED: req.body.LAST_CLEANED
    };
  
    return toilet;
  }
  
  // @desc     Create a toilet
  // @route    POST /Toilet
  // @access   Private
  exports.postToilet = async (req, res, next) => {
    try {
      let Toilet = getToiletFromRec(req);
  
      const createSql = 
      "INSERT INTO TOILET_TB VALUES ( :TOILET_ID, :GENDERS, :DISABILITY_ASSESSIBLE, :BABY_CHANGING, :LAST_CLEANED)";
      const result = await req._oracledb.execute(createSql, Toilet, {autoCommit: true})
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };