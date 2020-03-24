// @desc     Get all rooms
// @route    GET /rooms
// @access   Public
exports.getRooms = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM ROOM_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
};

// @desc     Get a rooms
// @route    GET /rooms/:id
// @access   Public
exports.getRoom = async (req, res, next) => {
  var ROOM_ID = req.params.id;

  req._oracledb.execute(
    "SELECT * FROM ROOM_TB WHERE ROOM_ID = :ROOM_ID",
    [ROOM_ID],
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

// @desc     Delete a rooms
// @route    DELETE /rooms/:id
// @access   Public
exports.deleteRoom = async (req, res, next) => {
  var ROOM_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM ROOM_TB WHERE ROOM_ID = :ROOM_ID",
    [ROOM_ID],
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

function getRoomFromRec(req) {
  const room = {
    ROOM_ID: req.body.ROOM_ID,
    ROOM_NUMBER: req.body.ROOM_NUMBER,
    FLOOR: req.body.FLOOR,
    CAPACITY: req.body.CAPACITY,
    FACILITIES: req.body.FACILITIES,
    ACCESSIBILITY: req.body.ACCESSIBILITY,
    BUILDING_ID: req.body.BUILDING_ID,
    TOILET_ID: req.body.TOILET_ID,
    CATERING_ID: req.body.CATERING_ID
  };

  return room;
}

// @desc     Create a room
// @route    POST /Room
// @access   Private
exports.postRoom = async (req, res, next) => {
  try {
    let Room = getRoomFromRec(req);

    const createSql = `INSERT INTO ROOM_TB VALUES ( 
        :ROOM_ID, 
        :ROOM_NUMBER, 
        :FLOOR, 
        :CAPACITY, 
        :FACILITIES, 
        :ACCESSIBILITY, 
        :BUILDING_ID, 
        :TOILET_ID, 
        :CATERING_ID )`;

    const result = await req._oracledb.execute(createSql, Room, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Update a room
// @route    PUT /room
// @access   Private
exports.putRoom = async (req, res, next) => {
  try {
    let room = getRoomFromRec(req);

    const updateSql = `UPDATE ROOM_TB
     SET ROOM_NUMBER = :ROOM_NUMBER, 
     FLOOR = :FLOOR,
     CAPACITY = :CAPACITY,
     FACILITIES = :FACILITIES,
     ACCESSIBILITY = :ACCESSIBILITY, 
     BUILDING_ID = :BUILDING_ID, 
     TOILET_ID = :TOILET_ID,
     CATERING_ID = :CATERING_ID
     WHERE ROOM_ID = :ROOM_ID`;

    const result = await req._oracledb.execute(updateSql, room, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
