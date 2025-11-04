import React, { useState, useEffect } from "react";
import { getJobs } from "../services/api";
import JobList from "../components/JobList";
import "./HomePage.css";
import Searchbar from "../components/Searchbar";
import Category from "../components/Category";

const HomePage = () => {
  const [jobs, setJobs] = useState([]); // State to store all jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs based on search
  const [filters, setFilters] = useState({}); // State for filters (search, category)
  const [noJobsFound, setNoJobsFound] = useState(false); // State to handle empty job list
  const [searchPerformed, setSearchPerformed] = useState(false); // To track if search was performed

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs(filters);
        if (data.data && data.data.length > 0) {
          setJobs(data.data); // Update jobs list with fetched data
          setNoJobsFound(false); // Reset no jobs found state
        } else {
          setJobs([]); // Clear jobs list
          setNoJobsFound(true); // Set to show no jobs found
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Clear job list on error
        setNoJobsFound(true); // Show no jobs found in case of error
      }
    };

    fetchJobs();
  }, [filters]); // Re-fetch jobs when filters change

  // Handle search functionality and pass results to the Searchbar component
  const handleSearchResults = (searchResults) => {
    setSearchPerformed(true); // Set that a search was performed

    if (searchResults.length > 0) {
      setFilteredJobs(searchResults); // Set filtered jobs based on search results
      setNoJobsFound(false); // Reset "no jobs found" state
    } else {
      setFilteredJobs([]); // Clear filtered jobs
      setNoJobsFound(true); // Display message if no jobs are found
    }
  };

  // Sort jobs by the 'updated_at' field in descending order
  const sortJobsByDate = (jobsArray) => {
    return jobsArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  };

  return (
    <div className="body-container">
      {/* Pass filteredJobs to Searchbar */}
      <Searchbar setFilteredJobs={handleSearchResults} setNoJobsFound={setNoJobsFound} />

      {/* Search Results Section */}
      {searchPerformed && (
        <div className="search-results">
          <h2>Search Results</h2>
          {noJobsFound ? (
            <p>No jobs found based on your search or filters.</p>
          ) : (
            <div className="job-cards">
              {filteredJobs.length > 0 ? (
                sortJobsByDate(filteredJobs).map((job, index) => (
                  <div key={`${job.id}-${index}`} className="job-item">
                    <JobList job={job} />
                  </div>
                ))
              ) : (
                sortJobsByDate(jobs).map((job, index) => (
                  <div key={`${job.id}-${index}`} className="job-item">
                    <JobList job={job} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Intro Section */}
      <div className="intro-section">
        <p>
          Explore our platform to discover a diverse and extensive range of
          part-time job opportunities that seamlessly fit your schedule,
          allowing you to work flexibly, maintain a healthy work-life balance,
          and achieve your personal and professional goals with ease and
          convenience.
        </p>
      </div>

      {/* Job Category Section */}
      <Category setFilters={setFilters} />

      {/* Latest Job Postings Section */}
      <div className="recentjobs">
        <h1>Latest Job Postings</h1>
        <div className="jobPostings">
          {/* Display a message if no jobs are found */}
          {noJobsFound ? (
            <p>No jobs found for this category. Please try another category.</p>
          ) : (
            <div className="job-slider">
              {sortJobsByDate(jobs).map((job, index) => (
                <div key={`${job.id}-${index}`} className="job-item">
                  <JobList job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
