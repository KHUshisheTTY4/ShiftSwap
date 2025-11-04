// // pages/PostJobPage.js
// import React, { useState } from "react";
// import { postJob } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import "./PostJobPage.css";
// const PostJobPage = () => {
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [salary, setSalary] = useState("");
//   const [location, setLocation] = useState("");
//   const [agelimit, setAgelimit] = useState("");
//   const [schedule, setSchedule] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();

//   const categories = [
//     "Retail and Customer Service",
//     "Food and Beverage",
//     "Education and Tutoring",
//     "Freelancing and Remote Work",
//     "Healthcare",
//     "Acting Lessons",
//     "Events and Hospitality",
//     "Technology and IT",
//     "Delivery and Logistics",
//     "Creative and Arts",
//     "Sports and Recreation",
//     "Childcare",
//     "Agriculture and Outdoor Work",
//   ];
//   const handlePostJob = async () => {
//     try {
//       await postJob({
//         jobrole: title,
//         company,
//         salary,
//         description,
//         location,
//         schedule,
//         agelimit,
//         category,
//       });
//       navigate("/"); // Redirect to homepage after posting
//     } catch (error) {
//       alert("Failed to post job: " + error.message);
//     }
//   };

//   return (
//     <div className="post-page">
//       <h1>Post a Job</h1>
//       <div className="post-form">
//         <label htmlFor="title">Job title:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Job Title"
//         />
//         <label htmlFor="company">Company:</label>
//         <input
//           type="text"
//           value={company}
//           onChange={(e) => setCompany(e.target.value)}
//           placeholder="Company Name"
//         />

//         <label htmlFor="salary">Salary:</label>
//         <input
//           type="text"
//           value={salary}
//           onChange={(e) => setSalary(e.target.value)}
//           placeholder="Salary (e.g., ₹200/hour, ₹300/shift)"
//         />

//         <label htmlFor="location">Location:</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           placeholder="Location (e.g., City, Address, or Remote)"
//         />

//         <label htmlFor="schedule">Schedule:</label>
//         <input
//           type="text"
//           value={schedule}
//           onChange={(e) => setSchedule(e.target.value)}
//           placeholder="Schedule (e.g., Monday to Friday, 9 AM to 5 PM)"
//         />

//         <label htmlFor="agelimit">Age Limit:</label>
//         <input
//           type="number"
//           value={agelimit}
//           onChange={(e) => setAgelimit(e.target.value)}
//           placeholder="Age Limit (e.g., 18)"
//         />
        

//         <label htmlFor="category">Category:</label>
//         <select
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">Select a category</option>
//           {categories.map((cat, index) => (
//             <option key={index} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//         <p>Selected Category: {category}</p>

//         <label htmlFor="description">Description:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Job Description"
//         />
//         <button onClick={handlePostJob}>Post Job</button>
//       </div>
//     </div>
//   );
// };

// export default PostJobPage;


import React, { useState } from "react";
import { postJob } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./PostJobPage.css";

const PostJobPage = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [agelimit, setAgelimit] = useState("");
  const [schedule, setSchedule] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Retail and Customer Service",
    "Food and Beverage",
    "Education and Tutoring",
    "Freelancing and Remote Work",
    "Healthcare",
    "Acting Lessons",
    "Events and Hospitality",
    "Technology and IT",
    "Delivery and Logistics",
    "Creative and Arts",
    "Sports and Recreation",
    "Childcare",
    "Agriculture and Outdoor Work",
  ];

  const handlePostJob = async () => {
    try {
      await postJob({
        jobrole: title,
        company,
        salary,
        description,
        location,
        schedule,
        agelimit,
        category,
      });
      navigate("/"); // Redirect to homepage after posting
    } catch (error) {
      alert("Failed to post job: " + error.message);
    }
  };

  return (
    <div className="post-job-container">
      <h1>Post a Job</h1>
      <div className="post-job-form">
        <label htmlFor="title">Job title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
        />
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary (e.g., ₹200/hour, ₹300/shift)"
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., City, Address, or Remote)"
        />

        <label htmlFor="schedule">Schedule:</label>
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="Schedule (e.g., Monday to Friday, 9 AM to 5 PM)"
        />

        <label htmlFor="agelimit">Age Limit:</label>
        <input
          type="number"
          value={agelimit}
          onChange={(e) => setAgelimit(e.target.value)}
          placeholder="Age Limit (e.g., 18)"
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
        />
        <button onClick={handlePostJob}>Post Job</button>
      </div>
    </div>
  );
};

export default PostJobPage;
