const oracledb = require('oracledb');
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
    let building = getBuildingFromRec(req);

    building = await building.create(building);

    res.status(201).json(building);
  } catch (error) {
    next(error);
  }

  const createSql = 
    'insert into BUILDING_TB' (
      
    )

};


  
