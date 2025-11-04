// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./JobList.css";

// const JobList = ({ job }) => {
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);

  

//   if (!job || job.length === 0) {
//     return <p>No jobs available</p>;
//   }

//   return (
//     <div className="job-card">
//       <h4>Jobrole: {job.jobrole}</h4>
//       <p>Company: {job.company}</p>
//       <p>Location: {job.location}</p>

//       {/* Link updated to pass jobid as a URL parameter */}
//       <Link to={`/ApplyPage/${job.jobid}`} className="view-details">
//         Apply now
//       </Link>
//       <br />

//       <button
        
     
//         className="view-details"
//       >
//         View Details
//       </button>

//       {isHovered && (
//         <div
//           className="job-details"
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: "0",
//             backgroundColor: "#000000",
//             color: "#ffffff",
//             padding: "10px",
//             borderRadius: "4px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             zIndex: "10",
//           }}
//         >
//           <p>Description: {job.description}</p>
//           <p>Salary: {job.salary}</p>
//           <p>Schedule: {job.schedule}</p>
//           <p>Category: {job.category}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobList;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./JobList.css";

const JobList = ({ job }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State to track visibility of job details

  if (!job || job.length === 0) {
    return <p>No jobs available</p>;
  }

  const handleViewDetailsClick = () => {
    setIsDetailsVisible((prevState) => !prevState); // Toggle visibility of job details
  };

  return (
    <div className={`job-card ${isDetailsVisible ? "expanded" : ""}`}>
      <h4>Jobrole: {job.jobrole}</h4>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>

      {/* Link to apply for the job */}
      <Link to={`/ApplyPage/${job.jobid}`} className="apply-details">
        Apply now
      </Link>
      <br />

      <button
        onClick={handleViewDetailsClick} // Toggle details visibility
        className="view-details"
      >
        {isDetailsVisible ? "Hide Details" : "View Details"}
      </button>

      {/* Job Details that will expand and contract */}
      <div className="job-details">
        
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Schedule:</strong> {job.schedule}</p>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Description:</strong> {job.description}</p>
      </div>
    </div>
  );
};

export default JobList;
