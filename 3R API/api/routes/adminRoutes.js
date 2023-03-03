const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const reuseHttpHandler = require("../controllers/reuseController");
const reduceHttpHandler = require("../controllers/reduceController");
const archieveHttpHandler = require("../controllers/archievementsController");
const recicleHttpHandler = require("../controllers/recicleController");
const dictionaryHttpHandler = require("../controllers/dictionaryController");
const multer = require("multer");

/* Creating a route for the login page. */
const upload = multer({ dest: "uploads/" });

/** reuse routes */
router
  .route("/reuses/create")
  .post(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    reuseHttpHandler.createReuse
  );

router
  .route("/reuses/getAllReuses")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    reuseHttpHandler.getAllReuse
  );

router
  .route("/reuses/:id")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    reuseHttpHandler.getReuseById
  );

router
  .route("/reuses/deleteReuse/:id")
  .delete(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    reuseHttpHandler.deleteReuse
  );

router
  .route("/reuses/updateReuse/:id")
  .put(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    reuseHttpHandler.updateReuse
  );

/*  reduce routes */
router
  .route("/reduces/create")
  .post(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    reduceHttpHandler.createReduce
  );

router
  .route("/reduces/getAllReduces")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    reduceHttpHandler.getAllReduce
  );

router
  .route("/reduces/:id")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    reduceHttpHandler.getReduceById
  );

router
  .route("/reduces/deleteReduce/:id")
  .delete(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    reduceHttpHandler.deleteReduce
  );

router
  .route("/reduces/updateReduce/:id")
  .put(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    reduceHttpHandler.updateReduce
  );

/*  archieve routes */
router
  .route("/archieves/create")
  .post(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    archieveHttpHandler.createAchievement
  );

router
  .route("/archieves/getAllAchievements")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    archieveHttpHandler.getAllAchievements
  );

router
  .route("/archieves/:id")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    archieveHttpHandler.getAchievementById
  );

router
  .route("/archieves/getAchievementByUserId/:id")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    archieveHttpHandler.getAchievementByUserId
  );

/** recicle routes */

router
  .route("/recycles/create")
  .post(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    recicleHttpHandler.createRecicle
  );

router
  .route("/recycles/getAllRecycles")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    recicleHttpHandler.getAllRecicles
  );

router
  .route("/recycles/getAllRecyclesByUserId/:id")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    recicleHttpHandler.getAllReciclesByUserId
  );

router
  .route("/recycles/deleteRecycle/:id")
  .delete(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    recicleHttpHandler.deleteRecicleById
  );

/** dictionary routes */
router
  .route("/dictionary/getAllDictionary")
  .post(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    dictionaryHttpHandler.getAllDictionary
  );

router
  .route("/dictionary/create")
  .post(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    upload.single("file"),
    dictionaryHttpHandler.createDictionary
  );
router
  .route("/dictionary/:id")
  .get(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    dictionaryHttpHandler.getDictionaryById
  );

router
  .route("/dictionary/deleteDictionary/:id")
  .delete(
    middlewares.protectWithJwt,
    middlewares.isAdmin,
    dictionaryHttpHandler.deleteDictionaryById
  );

exports.router = router;
