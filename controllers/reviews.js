/*
  Developed by Liam Penn - 1415065
  Controls the get, put, post and delete request to the reviews table
*/

// @desc     Get all reviews
// @route    GET /reviews
// @access   Public
exports.getReviews = async (req, res, next) => {
  req._oracledb.execute("SELECT * FROM REVIEWS_TB", function(err, rows) {
    req._oracledb.close();
    if (!err) {
      res.status(200).json({ success: true, rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
};

// @desc     Get a review
// @route    GET /reviews/:id
// @access   Public
exports.getReview = async (req, res, next) => {
  var REVIEW_ID = req.params.id;

  req._oracledb.execute(
    "SELECT * FROM REVIEW_TB WHERE REVIEW_ID = :REVIEW_ID",
    [REVIEW_ID],
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

// @desc     Delete a review
// @route    DELETE /reviews/:id
// @access   Public
exports.deleteReview = async (req, res, next) => {
  var REVIEW_ID = req.params.id;

  req._oracledb.execute(
    "DELETE FROM REVIEW_TB WHERE REVIEW_ID = :REVIEW_ID",
    [REVIEW_ID],
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

function getReviewFromRec(req) {
  const review = {
    REVIEW_ID: req.body.REVIEW_ID,
    RANKING: req.body.RANKING,
    REASON: req.body.REASON
  };

  return review;
}

// @desc     Create a review
// @route    POST /Review
// @access   Private
exports.postReview = async (req, res, next) => {
  try {
    let Review = getReviewFromRec(req);

    const createSql = `INSERT INTO REVIEW_TB VALUES ( 
        :REVIEW_ID, 
        :RANKING, 
        :REASON )`;

    const result = await req._oracledb.execute(createSql, Review, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc     Update a review
// @route    PUT /review
// @access   Private
exports.putReview = async (req, res, next) => {
  try {
    let review = getReviewFromRec(req);

    const updateSql = `UPDATE REVIEW_TB 
     SET RANKING = :RANKING, 
     REASON = :REASON
     WHERE REVIEW_ID = :REVIEW_ID`;

    const result = await req._oracledb.execute(updateSql, review, {
      autoCommit: true
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
