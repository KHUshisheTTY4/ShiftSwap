const express = require("express");
const {
  createUser,
  loginUser,
  getUserAppliedJobs,
  getUserPostedJobs,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJwt");
const router = express.Router();

//router.get("/getall", getJobs); //to get all users
//gets users by id
router.post("/register", createUser);

router.post("/login", loginUser);
router.use(verifyJWT);
router.get("/:userid", getUserById);
router.get("/appliedjobs/:userid", getUserAppliedJobs);
router.get("/postedjobs/:userid", getUserPostedJobs);
router.put("/update/:userid", updateUser);

module.exports = router;
