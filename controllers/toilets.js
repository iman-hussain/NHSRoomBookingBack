// @desc     Get all toilets
// @route    GET /toilets
// @access   Public
exports.getToilets = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM TOILET_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
};

// @desc     Get a toilet
// @route    GET /toilets/:id
// @access   Public
exports.getToilet = async (req, res, next) => {
  var TOILET_ID = req.params.id;

  req._oracledb.execute(
    "SELECT * FROM TOILET_TB WHERE TOILET_ID = :TOILET_ID",
    [TOILET_ID],
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

// @desc     Delete a toilet
// @route    DELETE /toilets/:id
// @access   Public
exports.deleteToilet = async (req, res, next) => {
  var TOILET_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM TOILET_TB WHERE TOILET_ID = :TOILET_ID",
    [TOILET_ID],
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

    const createSql = `INSERT INTO TOILET_TB VALUES ( 
        :TOILET_ID, 
        :GENDERS, 
        :DISABILITY_ASSESSIBLE, 
        :BABY_CHANGING, 
        :LAST_CLEANED)`;

    const result = await req._oracledb.execute(createSql, Toilet, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Update a toilet
// @route    PUT /Toilet
// @access   Private
exports.putToilet = async (req, res, next) => {
  try {
    let Toilet = getToiletFromRec(req);

    const updateSql = `UPDATE TOILET_TB 
      SET GENDERS = :GENDERS,
      DISABILITY_ASSESSIBLE = :DISABILITY_ASSESSIBLE, 
      BABY_CHANGING = :BABY_CHANGING, 
      LAST_CLEANED = :LAST_CLEANED
      WHERE TOILET_ID = :TOILET_ID`;

    const result = await req._oracledb.execute(updateSql, Toilet, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
