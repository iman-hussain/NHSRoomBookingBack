/*
  Developed by Liam Penn - 1415065
  Controls the get, put, post and delete request to the catering table
*/

// @desc     Get all catering
// @route    GET /caterings
// @access   Public
exports.getCaterings = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM CATERING_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
};

// @desc     Get a catering
// @route    GET /caterings/:id
// @access   Public
exports.getCatering = async (req, res, next) => {
  var CATERING_ID = req.params.id;

  req._oracledb.execute(
    "SELECT * FROM CATERING_TB WHERE CATERING_ID = :CATERING_ID",
    [CATERING_ID],
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

// @desc     Delete a catering
// @route    DELETE /caterings/:id
// @access   Public
exports.deleteCatering = async (req, res, next) => {
  var CATERING_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM CATERING_TB WHERE CATERING_ID = :CATERING_ID",
    [CATERING_ID],
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

function getCateringFromRec(req) {
  const Catering = [
    {
      CATERING_ID: req.body.CATERING_ID,
      CATERING_NAME: req.body.CATERING_NAME,
      CADDRESS: req.body.CADDRESS,
      FULFILMENT: req.body.FULFILMENT,
      HALAL: req.body.HALAL,
      KOSHER: req.body.KOSHER,
      VEGAN: req.body.VEGAN,
      VEGETARIAN: req.body.VEGETARIAN,
      GLUTEN: req.body.GLUTEN,
      EXTERNAL: req.body.EXTERNAL,
      VENDING_MACHINE: req.body.VENDING_MACHINE,
      WATER_FOUNTAIN: req.body.WATER_FOUNTAIN
    }
  ];

  return Catering;
}

// @desc     Create a Catering
// @route    POST /Catering
// @access   Private
exports.postCatering = async (req, res, next) => {
  try {
    let Catering = getCateringFromRec(req);

    const createSql = `INSERT INTO CATERING_TB VALUES ( 
        :CATERING_ID, 
        :CATERING_NAME, 
        :CADDRESS, 
        :FULFILMENT, 
        :HALAL, 
        :KOSHER, 
        :VEGAN, 
        :VEGETARIAN, 
        :GLUTEN, 
        :EXTERNAL, 
        :VENDING_MACHINE, 
        :WATER_FOUNTAIN)`;

    const result = await req._oracledb.executeMany(createSql, Catering, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Update a catering
// @route    PUT /catering
// @access   Private
exports.putCatering = async (req, res, next) => {
  try {
    let catering = getCateringFromRec(req);

    const updateSql = `UPDATE CATERING_TB
      SET CATERING_NAME = :CATERING_NAME, 
      CADDRESS = :CADDRESS, 
      FULFILMENT = :FULFILMENT, 
      HALAL = :HALAL, 
      KOSHER = :KOSHER,
      VEGAN = :VEGAN, 
      VEGETARIAN = :VEGETARIAN, 
      GLUTEN = :GLUTEN, 
      EXTERNAL = :EXTERNAL, 
      VENDING_MACHINE = :VENDING_MACHINE, 
      WATER_FOUNTAIN = :WATER_FOUNTAIN
      WHERE CATERING_ID = :CATERING_ID`;

    const result = await req._oracledb.execute(updateSql, catering, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
