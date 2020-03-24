// @desc     Get all buildinga
// @route    GET /buildings
// @access   Public
exports.getBuildings = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM BUILDING_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
};

// @desc     Get a building
// @route    GET /buildings/:id
// @access   Public
exports.getBuilding = async (req, res, next) => {
  var BUILDING_ID = req.params.id;

  req._oracledb.execute(
    "SELECT * FROM BUILDING_TB WHERE BUILDING_ID = :BUILDING_ID",
    [BUILDING_ID],
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

// @desc     Delete a building
// @route    DELETE /buildings/:id
// @access   Public
exports.deleteBuilding = async (req, res, next) => {
  var BUILDING_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM BUILDING_TB WHERE BUILDING_ID = :BUILDING_ID",
    [BUILDING_ID],
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

function getBuildingFromRec(req) {
  const building = {
    BUILDING_ID: req.body.BUILDING_ID,
    BUILDING_NAME: req.body.BUILDING_NAME,
    BUILDING_ADDRESS: req.body.BUILDING_ADDRESS,
    B_LAT: req.body.B_LAT,
    B_LONG: req.body.B_LONG,
    CONTACT_NUMBER: req.body.CONTACT_NUMBER,
    ROOMS: req.body.ROOMS,
    FLOORS: req.body.FLOORS,
    PARKING: req.body.PARKING,
    CATERING: req.body.CATERING,
    CATERING_ID: req.body.CATERING_ID
  };

  return building;
}

// @desc     Create a building
// @route    POST /buildings
// @access   Private
exports.postBuilding = async (req, res, next) => {
  try {
    let Building = getBuildingFromRec(req);

    const createSql = `INSERT INTO BUILDING_TB VALUES ( 
        :BUILDING_ID, 
        :BUILDING_NAME, 
        :BUILDING_ADDRESS, 
        :B_LAT, 
        :B_LONG, 
        :CONTACT_NUMBER, 
        :ROOMS, 
        :FLOORS, 
        :PARKING, 
        :CATERING, 
        :CATERING_ID)`;

    const result = await req._oracledb.execute(createSql, Building, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Update a building
// @route    PUT /building
// @access   Private
exports.putBuilding = async (req, res, next) => {
  try {
    let building = getBuildingFromRec(req);

    /*Notes for database, create trigger to increment rooms value when adding a room to rooms table with building_id foreign key*/
    const updateSql = `UPDATE BUILDING_TB
      SET BUILDING_NAME = :BUILDING_NAME, 
      BUILDING_ADDRESS = :BUILDING_ADDRESS, 
      B_LAT = :B_LAT, 
      B_LONG = :B_LONG, 
      CONTACT_NUMBER = :CONTACT_NUMBER, 
      ROOMS = :ROOMS, 
      FLOORS = :FLOORS, 
      PARKING = :PARKING, 
      CATERING = :CATERING, 
      CATERING_ID = :CATERING_ID
      WHERE BUILDING_ID = :BUILDING_ID`;

    const result = await req._oracledb.execute(updateSql, building, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
