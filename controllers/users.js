/*
  Developed by Liam Penn - 1415065
  Controls the get, put, post and delete request to the users table
*/

// @desc     Get all users
// @route    GET /users
// @access   Public
exports.getUsers = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM USERS_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
};

// @desc     Get a user
// @route    GET /users/:id
// @access   Public
exports.getUser = async (req, res, next) => {
  var USER_ID = req.params.id;

  req._oracledb.execute(
    "SELECT * FROM USERS_TB WHERE USER_ID = :USER_ID",
    [USER_ID],
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

// @desc     Delete a user
// @route    DELETE /users/:id
// @access   Public
exports.deleteUser = async (req, res, next) => {
  var USER_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM USERS_TB WHERE USER_ID = :USER_ID",
    [USER_ID],
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

function getUserFromRec(req) {
  const User = {
    USER_ID: req.body.USER_ID,
    USER_TYPE: req.body.USER_TYPE,
    PASSWORD: req.body.PASSWORD,
    USERNAME: req.body.USERNAME,
    FIRST_NAME: req.body.FIRST_NAME,
    SURNAME: req.body.SURNAME,
    EMAIL: req.body.EMAIL,
    ADDRESS: req.body.ADDRESS,
    PHONE_NUMBER: req.body.PHONE_NUMBER,
    EXPENSE_CODE: req.body.EXPENSE_CODE
  };

  return User;
}

function createUserFromRec(req) {
  const User = {
    USER_ID: null,
    USER_TYPE: req.body.USER_TYPE,
    PASSWORD: req.body.PASSWORD,
    USERNAME: req.body.USERNAME,
    FIRST_NAME: req.body.FIRST_NAME,
    SURNAME: req.body.SURNAME,
    EMAIL: req.body.EMAIL,
    ADDRESS: req.body.ADDRESS,
    PHONE_NUMBER: req.body.PHONE_NUMBER,
    EXPENSE_CODE: req.body.EXPENSE_CODE
  };

  return User;
}


// @desc     Create a user
// @route    POST /User
// @access   Private
exports.postUser = async (req, res, next) => {
  try {
    let User = createUserFromRec(req);
    console.log(User)
    // Get all from user table by email
    const emailResult = User.EMAIL;

    req._oracledb.execute(
      "SELECT * FROM USERS_TB WHERE EMAIL = :emailResult",
      [emailResult],
      async function(err, rows) {
        if (!err) {
          if(rows.rows.length == 0) {
            try {
              const createSql = `INSERT INTO USERS_TB VALUES ( 
                :USER_ID,
                :USER_TYPE, 
                :PASSWORD,
                :USERNAME, 
                :FIRST_NAME, 
                :SURNAME, 
                :EMAIL, 
                :ADDRESS, 
                :PHONE_NUMBER, 
                :EXPENSE_CODE)`;
          
              const result = await req._oracledb.execute(createSql, User, {
                autoCommit: true
              });
              res.status(201).json(result);
            } catch (error) {
              console.log(error);
              next(error);
            }
          }
        } else {
          console.log("Error while performing Query.");
        }
      }
    );
    } catch (error) {
      console.log(error);
      next(error);
    }
};

// @desc     Update a user
// @route    PUT /user
// @access   Private
exports.putUser = async (req, res, next) => {
  try {
    let user = getUserFromRec(req);

    const updateSql = `UPDATE USER_TB 
      SET USER_TYPE = :USER_TYPE,
      USER_TYPE = :USER_TYPE,
      USERNAME = :USERNAME,
      PASSWORD = :PASSWORD,
      FIRST_NAME = :FIRST_NAME,
      SURNAME = :SURNAME,
      EMAIL = :EMAIL,
      ADDRESS = :ADDRESS,
      PHONE_NUMBER = :PHONE_NUMBER,
      EXPENSE_CODE = :EXPENSE_CODE
      WHERE USER_ID = :USER_ID`;

    const result = await req._oracledb.execute(updateSql, user, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Login user
// @route    POST /user/login
// @access   Public

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  req._oracledb.execute(
    "SELECT * FROM USERS_TB WHERE (username = :email AND password = :password) OR  (email = :email AND password = :password)",
    [email, password],
    function(err, rows) {
      req._oracledb.close();
      if (!err) {
        if(rows.rows.length > 0) {
          console.log("Valid Credentials")
          res.status(200).json({ success: true, rows });
        } else {
          console.log("Invalid Credentials")
          res.status(400).json({ success: false });
        }
      } else {
        console.log("Error while performing Login Query.");
      }
    }
  );
};