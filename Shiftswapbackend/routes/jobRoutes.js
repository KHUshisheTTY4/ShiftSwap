const express = require("express");
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  getApplicationDetails,
  downloadResume,
  getAllApplicants,
} = require("../controllers/jobcontroller");
const verifyJWT = require("../middleware/verifyJwt");
const router = express.Router();

router.get("", getJobs); //to get all jobs
router.get("/get/:jobid", getJobById); //gets jobs by jobid

router.use(verifyJWT);
router.post("/create/:userid", createJob);
router.patch("/update/:jobid", updateJob);
router.delete("/delete/:jobid", deleteJob);

router.post("/apply/:jobid", applyJob);
router.get("/applicants/:applicationId", getApplicationDetails); //to get all jobs
router.get("/resume/:applicationId", downloadResume); //to get all jobs
router.get("/allapplicants/:jobid", getAllApplicants); //to get all jobs

module.exports = router;
