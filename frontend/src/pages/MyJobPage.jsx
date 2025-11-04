// import React, { useEffect, useState } from "react";
// import {
//   getUserPostedJobs,
//   getJobApplicantsCount,
//   getUserAppliedJobs,
// } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import "./MyJobPage.css";

// const MyJobPage = () => {
//   const [jobs, setJobs] = useState([]); // Store posted jobs
//   const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(false); // Track loading for applied jobs
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyJobs = async () => {
//       try {
//         const userid = localStorage.getItem("userid");
//         if (!userid) {
//           setError("User is not logged in.");
//           return;
//         }

//         // Fetch the posted jobs
//         const fetchedJobs = await getUserPostedJobs(userid);

//         // Fetch the applicant count for each job
//         const jobsWithApplicantCount = await Promise.all(
//           fetchedJobs.map(async (job) => {
//             const applicantCount = await getJobApplicantsCount(job.jobid);
//             return { ...job, applicantCount };
//           })
//         );

//         setJobs(jobsWithApplicantCount);

//         // Fetch the applied jobs
//         setLoadingAppliedJobs(true);
//         const appliedJobs = await getUserAppliedJobs(userid);
//         setAppliedJobs(appliedJobs);

//         setError(null);
//       } catch (err) {
//         setError(err.message || "Failed to fetch jobs");
//       } finally {
//         setLoading(false);
//         setLoadingAppliedJobs(false);
//       }
//     };

//     fetchMyJobs();
//   }, []);

//   const handleViewApplicants = (jobid) => {
//     navigate(`/applicants/${jobid}`);
//   };

//   if (loading || loadingAppliedJobs) {
//     return <div className="my-jobs-loading">Loading your jobs...</div>;
//   }

//   if (error) {
//     return <div className="my-jobs-error">{error}</div>;
//   }

//   return (
//     <div className="my-jobs-container">
//       {/* Show posted jobs if available */}
//       {jobs.length > 0 && (
//         <div>
//           <h2 className="my-jobs-title">Your Posted Jobs</h2>
//           <ul className="my-jobs-list">
//             {jobs.map((job) => (
//               <li key={job.jobid} className="my-jobs-item">
//                 <h3 className="my-jobs-item-role">{job.jobrole}</h3>
//                 <p className="my-jobs-item-description">
//                   <strong>Description:</strong> {job.description}
//                 </p>
//                 <p className="my-jobs-item-category">
//                   <strong>Category:</strong> {job.category}
//                 </p>
//                 <p className="my-jobs-item-location">
//                   <strong>Location:</strong> {job.location}
//                 </p>
//                 <p className="my-jobs-item-schedule">
//                   <strong>Schedule:</strong> {job.schedule}
//                 </p>
//                 <p className="my-jobs-item-salary">
//                   <strong>Salary:</strong> {job.salary}
//                 </p>
//                 <p className="my-jobs-item-age-limit">
//                   <strong>Age Limit:</strong> {job.agelimit}
//                 </p>
//                 <p className="my-jobs-item-company">
//                   <strong>Company:</strong> {job.company}
//                 </p>
//                 <p className="my-jobs-item-date">
//                   <strong>Updated On:</strong>{" "}
//                   {new Date(job.updated_at).toLocaleDateString()}
//                 </p>

//                 {/* Display application count and button */}
//                 <div className="my-jobs-item-applicant-info">
//                   <p className="my-jobs-item-applicant-count">
//                     <strong>Applications:</strong> {job.applicantCount}
//                   </p>
//                   {job.applicantCount > 0 && (
//                     <button
//                       className="my-jobs-item-view-applicants-btn"
//                       onClick={() => handleViewApplicants(job.jobid)}
//                     >
//                       View Applicants
//                     </button>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Show applied jobs if available */}
//       {appliedJobs.length > 0 && (
//         <div>
//           <h2 className="my-jobs-title">Your Applied Jobs</h2>
//           <ul className="my-jobs-list">
//             {appliedJobs.map((job) => (
//               <li key={job.jobid} className="my-jobs-item">
//                 <h3 className="my-jobs-item-role">{job.jobrole}</h3>
//                 <p className="my-jobs-item-description">
//                   <strong>Description:</strong> {job.description}
//                 </p>
//                 <p className="my-jobs-item-location">
//                   <strong>Location:</strong> {job.location}
//                 </p>
//                 <p className="my-jobs-item-date">
//                   <strong>Applied On:</strong>{" "}
//                   {new Date(job.applied_at).toLocaleDateString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* If no jobs found */}
//       {jobs.length === 0 && appliedJobs.length === 0 && (
//         <div className="my-jobs-no-jobs">
//           You have neither posted nor applied to any jobs yet.
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyJobPage;




import React, { useEffect, useState } from "react";
import {
  getUserPostedJobs,
  getJobApplicantsCount,
  getUserAppliedJobs,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import "./MyJobPage.css";

const MyJobPage = () => {
  const [jobs, setJobs] = useState([]); // Store posted jobs
  const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(false); // Track loading for applied jobs
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const userid = localStorage.getItem("userid");
        if (!userid) {
          setError("User is not logged in.");
          return;
        }

        // Fetch the posted jobs
        const fetchedJobs = await getUserPostedJobs(userid);

        // Fetch the applicant count for each job
        const jobsWithApplicantCount = await Promise.all(
          fetchedJobs.map(async (job) => {
            const applicantCount = await getJobApplicantsCount(job.jobid);
            return { ...job, applicantCount };
          })
        );

        setJobs(jobsWithApplicantCount);

        // Fetch the applied jobs
        setLoadingAppliedJobs(true);
        const appliedJobs = await getUserAppliedJobs(userid);
        setAppliedJobs(appliedJobs);

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
        setLoadingAppliedJobs(false);
      }
    };

    fetchMyJobs();
  }, []);

  // Sort posted jobs by 'updated_at' in descending order
  const sortPostedJobsByDate = (jobsArray) => {
    return jobsArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  };

  // Sort applied jobs by 'applied_at' in descending order
  const sortAppliedJobsByDate = (appliedJobsArray) => {
    return appliedJobsArray.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));
  };

  const handleViewApplicants = (jobid) => {
    navigate(`/applicants/${jobid}`);
  };

  if (loading || loadingAppliedJobs) {
    return <div className="my-jobs-loading">Loading your jobs...</div>;
  }

  if (error) {
    return <div className="my-jobs-error">{error}</div>;
  }

  return (
    <div className="my-jobs-container">
      {/* Show posted jobs if available */}
      {jobs.length > 0 && (
        <div>
          <h2 className="my-jobs-title">Your Posted Jobs</h2>
          <ul className="my-jobs-list">
            {sortPostedJobsByDate(jobs).map((job) => (
              <li key={job.jobid} className="my-jobs-item">
                <h3 className="my-jobs-item-role">{job.jobrole}</h3>
                <p className="my-jobs-item-description">
                  <strong>Description:</strong> {job.description}
                </p>
                <p className="my-jobs-item-category">
                  <strong>Category:</strong> {job.category}
                </p>
                <p className="my-jobs-item-location">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="my-jobs-item-schedule">
                  <strong>Schedule:</strong> {job.schedule}
                </p>
                <p className="my-jobs-item-salary">
                  <strong>Salary:</strong> {job.salary}
                </p>
                <p className="my-jobs-item-age-limit">
                  <strong>Age Limit:</strong> {job.agelimit}
                </p>
                <p className="my-jobs-item-company">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="my-jobs-item-date">
                  <strong>Updated On:</strong>{" "}
                  {new Date(job.updated_at).toLocaleDateString()}
                </p>

                {/* Display application count and button */}
                <div className="my-jobs-item-applicant-info">
                  <p className="my-jobs-item-applicant-count">
                    <strong>Applications:</strong> {job.applicantCount}
                  </p>
                  {job.applicantCount > 0 && (
                    <button
                      className="my-jobs-item-view-applicants-btn"
                      onClick={() => handleViewApplicants(job.jobid)}
                    >
                      View Applicants
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show applied jobs if available */}
      {appliedJobs.length > 0 && (
        <div>
          <h2 className="my-jobs-title">Your Applied Jobs</h2>
          <ul className="my-jobs-list">
            {sortAppliedJobsByDate(appliedJobs).map((job) => (
              <li key={job.jobid} className="my-jobs-item">
                <h3 className="my-jobs-item-role">{job.jobrole}</h3>
                <p className="my-jobs-item-description">
                  <strong>Description:</strong> {job.description}
                </p>
                <p className="my-jobs-item-location">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="my-jobs-item-date">
                  <strong>Applied On:</strong>{" "}
                  {new Date(job.applied_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If no jobs found */}
      {jobs.length === 0 && appliedJobs.length === 0 && (
        <div className="my-jobs-no-jobs">
          You have neither posted nor applied to any jobs yet.
        </div>
      )}
    </div>
  );
};

export default MyJobPage;
