// import React, { useState, useEffect } from "react";
// import { getJobs } from "../services/api"; // Fetch job data from API
// import "./GetJobPage.css";
// import JobList from "../components/JobList";
// import "./GetJobPage.css";
// import Searchbar from "../components/Searchbar";
// const GetJobPage = () => {
//   const [jobData, setJobData] = useState([]);

//   useEffect(() => {
//     // Fetch job data from the API
//     const getJobData = async () => {
//       try {
//         const response = await getJobs(); // Assuming getJobs is a function that fetches jobs
//         setJobData(response.data); // Now we pass only the 'data' array
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       }
//     };
//     getJobData();
//   }, []);

//   return (
//     <div>
//       <Searchbar />
//       {/* Pass jobData to JobList as a prop */}
//       <div className="getjobs">
//      {jobData.map((job, index) => (
//         <div key={`${job.id}-${index}`} className="get-job-item">
//       <JobList job={job} />
//     </div>))}</div></div>
//   );
// };

// export default GetJobPage;


import React, { useState, useEffect } from "react";
import { getJobs } from "../services/api"; // Fetch job data from API
import "./GetJobPage.css";
import JobList from "../components/JobList";
import Searchbar from "../components/Searchbar";

const GetJobPage = () => {
  const [jobData, setJobData] = useState([]); // State to hold fetched jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered search results
  const [noJobsFound, setNoJobsFound] = useState(false); // Flag for no jobs found
  const [searchPerformed, setSearchPerformed] = useState(false); // Flag to track if search is performed

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs(); // Fetch job data
        if (response.data && response.data.length > 0) {
          setJobData(response.data); // Set fetched job data
          setNoJobsFound(false); // Reset no jobs found flag
        } else {
          setJobData([]); // No jobs found
          setNoJobsFound(true); // Set no jobs found flag
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        setJobData([]); // Reset job data on error
        setNoJobsFound(true); // Show no jobs found message
      }
    };
    fetchJobs();
  }, []); // Run this once when the component is mounted

  // Handle search results and update the filtered jobs state
  const handleSearchResults = (searchResults) => {
    setSearchPerformed(true); // Set search flag
    if (searchResults.length > 0) {
      setFilteredJobs(searchResults); // Set filtered search results
      setNoJobsFound(false); // Reset no jobs found flag
    } else {
      setFilteredJobs([]); // Clear filtered jobs
      setNoJobsFound(true); // Display no jobs found message
    }
  };

  return (
    <div>
      {/* Searchbar Component */}
      <Searchbar setFilteredJobs={handleSearchResults} setNoJobsFound={setNoJobsFound} />

      {/* Display Search Results or Job Cards */}
      <div className="getjobs">
        {searchPerformed ? (
          // Display filtered search results
          filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div key={`${job.id}-${index}`} className="get-job-item">
                <JobList job={job} />
              </div>
            ))
          ) : (
            // Display "No jobs found" message if no search results
            <p>No jobs found based on your search.</p>
          )
        ) : (
          // Display all job cards by default
          jobData.map((job, index) => (
            <div key={`${job.id}-${index}`} className="get-job-item">
              <JobList job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetJobPage;
