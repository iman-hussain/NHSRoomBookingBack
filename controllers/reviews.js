// @desc     Get all reviews
// @route    GET /reviewss
// @access   Public
exports.getReviews = async (req, res, next) => {
    req._oracledb.execute("SELECT * FROM REVIEWS_TB", function(err, rows) {
        req._oracledb.close();
        if (!err) {
          res.status(200).json({ success: true, rows});
        } else {
          console.log("Error while performing Query.");
        }
      });
  };

  function getReviewFromRec(req) {
    const review = {
      REVIEW_ID: req.body.REVIEW_ID,
      RANKING: req.body.RANKING,
      REASON: req.body.REASON,
    };
  
    return review;
  }
  
  // @desc     Create a review
  // @route    POST /Review
  // @access   Private
  exports.postReview = async (req, res, next) => {
    try {
      let Review = getReviewFromRec(req);
  
      const createSql = 
      "INSERT INTO REVIEW_TB VALUES ( :REVIEW_ID, :RANKING, :REASON )";
      const result = await req._oracledb.execute(createSql, Review, {autoCommit: true})
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };