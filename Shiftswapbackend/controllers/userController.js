const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  //create user
  try {
    const { fullname, password, email, phoneno, confirmpassword } = req.body;
    if (!fullname || !password || !email || !phoneno) {
      return res.status(500).send({
        status: false,
        message: "Please provide all fields",
      });
    }
    const existingUser = await db.query("SELECT * FROM USERS WHERE email = ?", [
      email,
    ]);

    if (existingUser[0].length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    if (password != confirmpassword) {
      return res.status(500).send({
        status: false,
        message: "Password does not match confirm password",
      });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const data = await db.query(
      "INSERT INTO USERS(fullname,password,email,phoneno) VALUES (?,?,?,?)",
      [fullname, hashedPwd, email, phoneno]
    );

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in insert query",
      });
    }
    res.status(201).send({
      success: true,
      message: "New user created",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in creating User API",
      error,
    });
  }
};

//Login
//route /login
const loginUser = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  console.log(req);
  if (!email || !pass) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [data] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!data) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(pass, data[0].password);
  console.log(match);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        fullname: data[0].fullname,
        email: data[0].email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Send accessToken containing username and roles
  res.json({ accessToken: accessToken, userid: data[0].userid });
};

const getUserAppliedJobs = async (req, res) => {
  try {
    const userid = req.params.userid;

    if (!userid) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if the user exists
    const [userCheck] = await db.query("SELECT * FROM users WHERE userid = ?", [
      userid,
    ]);
    if (userCheck.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Fetch all jobs the user has applied to
    const [jobs] = await db.query(
      "SELECT j.* FROM job_applications ja JOIN jobs j ON ja.job_id = j.jobid WHERE ja.user_id = ?",
      [userid]
    );

    res.status(200).send({
      success: true,
      jobs,
      message: jobs.length > 0 ? null : "No applied jobs found for this user",
    });
  } catch (error) {
    console.error(`Error fetching applied jobs for user ${userid}:`, error);
    res.status(500).send({
      success: false,
      message: "Error fetching applied jobs",
      error: error.message || error,
    });
  }
};

const getUserPostedJobs = async (req, res) => {
  try {
    const userid = req.params.userid;

    if (!userid) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if the user exists
    const [userCheck] = await db.query("SELECT * FROM users WHERE userid = ?", [
      userid,
    ]);
    if (userCheck.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Fetch all jobs posted by the user
    const [jobs] = await db.query("SELECT * FROM jobs WHERE poster_id = ?", [
      userid,
    ]);

    res.status(200).send({
      success: true,
      jobs,
      message: jobs.length > 0 ? null : "No posted jobs found for this user",
    });
  } catch (error) {
    console.error(`Error fetching posted jobs for user ${userid}:`, error);
    res.status(500).send({
      success: false,
      message: "Error fetching posted jobs",
      error: error.message || error,
    });
  }
};

const getUserById = async (req, res) => {
  //get by id
  try {
    const userid = req.params.userid;
    console.log(userid);
    if (!userid) {
      return res.status(404).send({
        success: false,
        message: "Please provide user id",
      });
    }
    const data = await db.query("SELECT * FROM users WHERE userid=?", [userid]);
    console.log(data[0]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No record found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User",
      userDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user by id API",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    console.log(userid);
    if (!userid) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or provide an ID",
      });
    }

    // Fetch the current job data
    const [existingData] = await db.query(
      "SELECT * FROM users WHERE userid = ?",
      [userid]
    );

    if (!existingData.length) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const existingUser = existingData[0];

    // Destructure fields from the request body and fall back to existing values
    const {
      fullname = existingUser.fullname,
      email = existingUser.email,
      phoneno = existingUser.phoneno,
      age = existingUser.age,
      skills = existingUser.skills,
      languagesspoken = existingUser.languagesspoken,
      currentjob = existingUser.currentjob,
      education = existingUser.education,
      gender = existingUser.gender,
      address = existingUser.address,
    } = req.body;

    // Update the job in the database
    const [updateResult] = await db.query(
      "UPDATE users SET fullname = ?, email = ?, phoneno = ?, skills = ?, education = ?, languagesspoken = ?, age = ?, address = ?,currentjob = ?,gender = ? WHERE userid = ?",
      [
        fullname,
        email,
        phoneno,
        skills,
        education,
        languagesspoken,
        age,
        address,
        currentjob,
        gender,
        userid,
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
      message: "User successfully updated",
    });
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating users",
      error: error.message || error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserAppliedJobs,
  getUserPostedJobs,
  getUserById,
  updateUser,
};
