const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const reuseHttpHandler = require("../controllers/reuseController");
const reduceHttpHandler = require("../controllers/reduceController");
const archieveHttpHandler = require("../controllers/archievementsController");
const recicleHttpHandler = require("../controllers/recicleController");
const dictionaryHttpHandler = require("../controllers/dictionaryController");
const userHandler = require("../controllers/info");

const multer = require("multer");

/* Creating a route for the login page. */
const upload = multer({ dest: "uploads/" });

router
  .route("/info/:id")
  .get(middlewares.protectWithJwt, userHandler.getInfoUser);

router
  .route("/info/updateInfo/:id")
  .post(
    middlewares.protectWithJwt,
    upload.single("file"),
    userHandler.updateInfoUser
  );

router
  .route("/getAll")
  .get(middlewares.protectWithJwt, userHandler.getAll);
/** reuse routes */
router
  .route("/reuses/create")
  .post(
    middlewares.protectWithJwt,
    upload.single("file"),
    reuseHttpHandler.createReuse
  );

router
  .route("/reuses/getAllReuses")
  .get(middlewares.protectWithJwt, reuseHttpHandler.getAllReuse);

router
  .route("/reuse/:id")
  .get(middlewares.protectWithJwt, reuseHttpHandler.getReuseById);

router
  .route("/reuses/deleteReuse/:id")
  .delete(middlewares.protectWithJwt, reuseHttpHandler.deleteReuse);

router
  .route("/reuses/updateReuse/:id")
  .put(
    middlewares.protectWithJwt,
    upload.single("file"),
    reuseHttpHandler.updateReuse
  );

/*  reduce routes */
router
  .route("/reduces/create")
  .post(
    middlewares.protectWithJwt,
    upload.single("file"),
    reduceHttpHandler.createReduce
  );

router
  .route("/reduces/getAllReduces")
  .get(middlewares.protectWithJwt, reduceHttpHandler.getAllReduce);

router
  .route("/reduces/:id")
  .get(middlewares.protectWithJwt, reduceHttpHandler.getReduceById);

router
  .route("/reduces/deleteReduce/:id")
  .delete(middlewares.protectWithJwt, reduceHttpHandler.deleteReduce);

router
  .route("/reduces/updateReduce/:id")
  .put(
    middlewares.protectWithJwt,
    upload.single("file"),
    reduceHttpHandler.updateReduce
  );

/*  archieve routes */
router
  .route("/archieves/create")
  .post(
    middlewares.protectWithJwt,
    upload.single("file"),
    archieveHttpHandler.createAchievement
  );

router
  .route("/archieves/getAllAchievements")
  .get(middlewares.protectWithJwt, archieveHttpHandler.getAllAchievements);

router
  .route("/archieves/:id")
  .get(middlewares.protectWithJwt, archieveHttpHandler.getAchievementById);

router
  .route("/archieves/getAchievementByUserId/:id")
  .get(middlewares.protectWithJwt, archieveHttpHandler.getAchievementByUserId);

/** recicle routes */

router
  .route("/recycles/create")
  .post(
    middlewares.protectWithJwt,
    upload.single("file"),
    recicleHttpHandler.createRecicle
  );

router
  .route("/recycles/getAllRecycles")
  .get(middlewares.protectWithJwt, recicleHttpHandler.getAllRecicles);

router
  .route("/recycles/getAllRecyclesByUserId/:id")
  .get(middlewares.protectWithJwt, recicleHttpHandler.getAllReciclesByUserId);

router
  .route("/recycles/deleteRecycle/:id")
  .delete(middlewares.protectWithJwt, recicleHttpHandler.deleteRecicleById);

/** dictionary routes */
router
  .route("/dictionary/getAllDictionary")
  .post(middlewares.protectWithJwt, dictionaryHttpHandler.getAllDictionary);

router
  .route("/dictionary/create")
  .post(
    middlewares.protectWithJwt,
    upload.single("file"),
    dictionaryHttpHandler.createDictionary
  );

router
  .route("/dictionary/:id")
  .get(middlewares.protectWithJwt, dictionaryHttpHandler.getDictionaryById);

router
  .route("/dictionary/deleteDictionary/:id")
  .delete(
    middlewares.protectWithJwt,
    dictionaryHttpHandler.deleteDictionaryById
  );

exports.router = router;
