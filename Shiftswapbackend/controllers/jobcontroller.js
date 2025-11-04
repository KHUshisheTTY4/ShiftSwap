const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/"); // Save resumes to the 'uploads/resumes/' directory
  },
  filename: (req, file, cb) => {
    // Use the original file name with a timestamp to avoid naming conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1625161763584.pdf
  },
});

// Create the multer upload instance for handling single file upload (resume)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
}).single("resume"); // 'resume' is the field name for the file

const getJobs = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { search, location, company, schedule, category } = req.query;

    // Build the base SQL query
    let query = "SELECT * FROM jobs WHERE 1=1";
    const params = [];

    // Dynamically append filters to the SQL query
    if (search) {
      query += `
        AND (
          LOWER(jobrole) LIKE ? OR 
          LOWER(company) LIKE ? OR 
          LOWER(description) LIKE ? OR 
          LOWER(location) LIKE ? OR 
          LOWER(schedule) LIKE ? OR 
          LOWER(agelimit) LIKE ?
        )`;
      const searchPattern = `%${search.toLowerCase()}%`;
      params.push(
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern
      );
    }

    if (location) {
      query += " AND LOWER(location) LIKE ?";
      params.push(`%${location.toLowerCase()}%`); // Partial match for location
    }

    if (company) {
      query += " AND LOWER(company) LIKE ?";
      params.push(`%${company.toLowerCase()}%`); // Partial match for company
    }

    if (schedule) {
      query += " AND LOWER(schedule) = ?";
      params.push(schedule.toLowerCase()); // Exact match for schedule
    }

    if (category) {
      query += " AND LOWER(category) = ?";
      params.push(category.toLowerCase()); // Exact match for category
    }

    // Execute the query with parameters
    const [data] = await db.query(query, params);

    // Send response
    res.status(200).send({
      success: true,
      message: data.length ? "Filtered job records" : "No jobs found",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get jobs API with filters",
      error,
    });
  }
};

const getJobById = async (req, res) => {
  //get by id
  try {
    const jobid = req.params.jobid;
    if (!jobid) {
      return res.status(404).send({
        success: false,
        message: "Please provide job id",
      });
    }
    const data = await db.query("SELECT * FROM jobs WHERE jobid=?", [jobid]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No record found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Job",
      jobDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get job by id API",
      error,
    });
  }
};

const createJob = async (req, res) => {
  //create job
  try {
    const {
      jobrole,
      company,
      salary,
      description,
      location,
      schedule,
      agelimit,
      category,
    } = req.body;

    const { userid } = req.params;
    console.log(userid);
    if (
      !jobrole ||
      !company ||
      !salary ||
      !description ||
      !location ||
      !schedule ||
      !agelimit ||
      !category
    ) {
      return res.status(500).send({
        status: false,
        message: "Please provide all fields",
      });
    }

    const data = await db.query(
      "INSERT INTO JOBS(jobrole,company,salary,description,location,schedule,agelimit,poster_id,category) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        jobrole,
        company,
        salary,
        description,
        location,
        schedule,
        agelimit,
        userid,
        category,
      ]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in insert query",
      });
    }
    res.status(201).send({
      success: true,
      message: "New job created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Job API",
      error,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobid = req.params.jobid;

    if (!jobid) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or provide an ID",
      });
    }

    // Fetch the current job data
    const [existingData] = await db.query(
      "SELECT * FROM jobs WHERE jobid = ?",
      [jobid]
    );

    if (!existingData.length) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    const existingJob = existingData[0];

    // Destructure fields from the request body and fall back to existing values
    const {
      jobrole = existingJob.jobrole,
      company = existingJob.company,
      salary = existingJob.salary,
      description = existingJob.description,
      location = existingJob.location,
      schedule = existingJob.schedule,
      agelimit = existingJob.agelimit,
      category = existingJob.category,
    } = req.body;

    // Update the job in the database
    const [updateResult] = await db.query(
      "UPDATE jobs SET jobrole = ?, company = ?, salary = ?, description = ?, location = ?, schedule = ?, agelimit = ?, category = ? WHERE jobid = ?",
      [
        jobrole,
        company,
        salary,
        description,
        location,
        schedule,
        agelimit,
        category,
        jobid,
      ]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(500).send({
        success: false,
        message: "Error in updating data",
      });
    }

    res.status(200).send({
      success: true,
      message: "Job successfully updated",
    });
  } catch (error) {
    console.error("Error in updating job:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating jobs",
      error: error.message || error,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    if (!jobid) {
      return res.status(404).send({
        success: false,
        message: "Invalid id or provide id",
      });
    }

    const [jobCheck] = await db.query("SELECT * FROM jobs WHERE jobid = ?", [
      jobid,
    ]);
    if (jobCheck.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    await db.query("DELETE FROM JOBS WHERE jobid = ? ", [jobid]);
    res.status(200).send({
      success: true,
      message: "Job Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      message: "Error in deleting",
    });
  }
};

// Apply Job endpoint
// Backend - Apply Job endpoint
const applyJob = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }

    try {
      const jobid = req.params.jobid;
      const { userid, cover_letter } = req.body;

      if (!jobid || !userid || !cover_letter) {
        return res.status(400).send({
          success: false,
          message: "Job ID, User ID, and Cover Letter are required",
        });
      }

      // Check if the user has already applied to the job
      const [applicationCheck] = await db.query(
        "SELECT * FROM job_applications WHERE job_id = ? AND user_id = ?",
        [jobid, userid]
      );
      if (applicationCheck.length > 0) {
        return res.status(200).send({
          success: false,
          message: "You have already applied to this job", // Ensure the message is sent here
        });
      }

      // Process file upload and other data
      const resume_link = req.file ? req.file.path : null;
      if (!resume_link) {
        return res.status(400).send({
          success: false,
          message: "Resume file is required",
        });
      }

      // Insert the job application into the database
      await db.query(
        "INSERT INTO job_applications (job_id, user_id, resume_link, cover_letter) VALUES (?, ?, ?, ?)",
        [jobid, userid, resume_link, cover_letter]
      );

      res.status(201).send({
        success: true,
        message: "Successfully applied for the job",
      });
    } catch (error) {
      console.error("Error applying for job:", error);
      res.status(500).send({
        success: false,
        message: "Error applying for the job",
        error: error.message || error,
      });
    }
  });
};

//to get applicants details of particular job
// Fetch the job application details
const getApplicationDetails = async (req, res) => {
  try {
    const { applicationId } = req.params;
    console.log(applicationId);

    // Check if the application exists
    const [applicationCheck] = await db.query(
      "SELECT * FROM job_applications WHERE id = ?",
      [applicationId]
    );

    if (applicationCheck.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    const application = applicationCheck[0];

    // Fetch the job details
    const [jobDetails] = await db.query("SELECT * FROM jobs WHERE jobid = ?", [
      application.job_id,
    ]);

    // Fetch the user details
    const [userDetails] = await db.query(
      "SELECT * FROM users WHERE userid = ?",
      [application.user_id]
    );

    if (jobDetails.length === 0 || userDetails.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Job or User not found",
      });
    }

    // Combine the data and send it
    const applicationData = {
      job: jobDetails[0],
      user: userDetails[0],
      cover_letter: application.cover_letter,
      resume_link: application.resume_link,
    };

    res.status(200).send({
      success: true,
      application: applicationData,
    });
  } catch (error) {
    console.error("Error fetching application details:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching application details",
      error: error.message || error,
    });
  }
};

// Serve the resume file for download
const downloadResume = async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Check if the application exists
    const [applicationCheck] = await db.query(
      "SELECT * FROM job_applications WHERE id = ?",
      [applicationId]
    );

    if (applicationCheck.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    const application = applicationCheck[0];

    // Get the resume path
    const resumePath = application.resume_link;

    if (!resumePath) {
      return res.status(404).send({
        success: false,
        message: "No resume found for this application",
      });
    }

    const fileName = path.basename(resumePath);

    // Check if the file exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).send({
        success: false,
        message: "Resume file not found",
      });
    }

    // Set headers to trigger file download
    res.download(resumePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send({
          success: false,
          message: "Error downloading resume",
        });
      }
    });
  } catch (error) {
    console.error("Error downloading resume:", error);
    res.status(500).send({
      success: false,
      message: "Error downloading resume",
      error: error.message || error,
    });
  }
};

const getAllApplicants = async (req, res) => {
  try {
    const jobid = req.params.jobid;

    // Ensure that job ID is provided
    if (!jobid) {
      return res.status(400).send({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check if the job exists
    const [jobCheck] = await db.query("SELECT * FROM jobs WHERE jobid = ?", [
      jobid,
    ]);
    if (jobCheck.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    // Fetch all applicants for the specific job
    const [applicants] = await db.query(
      `SELECT ja.id, ja.user_id, ja.cover_letter, ja.resume_link
      FROM job_applications ja
      JOIN users u ON ja.user_id = u.userid
      WHERE ja.job_id = ?`,
      [jobid]
    );

    // Send response with applicant details
    res.status(200).send({
      success: true,

      applicants,
      applicantsCount: applicants.length,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching applicants",
      error: error.message || error,
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  getApplicationDetails,
  downloadResume,
  getAllApplicants,
};
