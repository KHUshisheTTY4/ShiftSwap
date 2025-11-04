const express = require("express");
const mySqlPool = require("./config/db");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

dotenv.config();

app.use(express.json());
app.use(cors(corsOptions));

//Routing
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/jobs", require("./routes/jobRoutes"));

// app.get("/test", (req, res) => {
//   res.status(200).send("<h1>Nodejd </h1>");
// });
const PORT = process.env.PORT || 8080;
mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MySql Connected");
    app.listen(PORT, () => {
      console.log("Server Running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
