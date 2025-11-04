import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationDetails,
  downloadResume,
  getJobApplicants,
} from "../services/api";
import "./GetApplicantsDetails.css"; // Optional for styling

const GetApplicantsDetails = () => {
  const { jobid } = useParams(); // Get jobid from the URL params
  const [applicants, setApplicants] = useState([]); // Store applicants data
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const [jobRole, setJobRole] = useState(""); // Store job role (title)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch all applicants for the job
        const applications = await getJobApplicants(jobid);

     

        // Fetch the application details for each applicant
        const applicantsWithDetails = await Promise.all(
          applications.map(async (application) => {
            const applicantDets = await getApplicationDetails(application.id); // assuming application.id as applicationId

            // Log applicant details to see the structure
      setJobRole(applicantDets.job.jobrole)

            return { ...application, applicantDets }; // Combine application with its details
          })
        );

        // Set the applicants with detailed information
        setApplicants(applicantsWithDetails);

        // Set the job role (title) from the first application if available
        if (applications.length > 0 && applications[0].job && applications[0].job.jobrole) {
          setJobRole(applications[0].job.jobrole); // Set the job role from the first application (assuming all applicants apply for the same job)
        } else {
          setError("Job role data is missing or incorrect.");
        }

        setError(null); // Clear error state if data is fetched successfully
      } catch (err) {
        setError(err.message || "Failed to fetch application details");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchDetails(); // Call the fetch function
  }, [jobid]); // Depend on jobid to re-fetch when the job changes

  const handleDownloadResume = async (applicationId) => {
    try {
      // Handle resume download for a specific application
      await downloadResume(applicationId);
    } catch (err) {
      setError(err.message || "Failed to download resume");
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">Loading application details...</div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (applicants.length === 0) {
    return <div>No applicants for this job.</div>;
  }

  return (
    <div className="applicant-details-container">
      <h2 className="applicant-heading">
        {jobRole ? `Applicants for Job: ${jobRole}` : "Loading job role..."}
      </h2>
      <div className="applicant-list">
        {applicants.map((application) => {
          const { applicantDets, cover_letter } = application;
          const user = applicantDets.user; // Extract user details from applicantDets
          const job = applicantDets.job; // Extract job details from applicantDets

          return (
            <div key={application.id} className="applicant-card">
              {/* Applicant Info */}
              <div className="applicant-info">
                <h3 className="section-heading">Applicant Information</h3>
                <p>
                  <strong>Name:</strong> {user.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phoneno}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
                <p>
                  <strong>Skills:</strong> {user.skills}
                </p>
                <p>
                  <strong>Education:</strong> {user.education}
                </p>
                <p>
                  <strong>Languages Spoken:</strong> {user.languagesspoken}
                </p>
              </div>

              {/* Application Info */}
              <div className="application-info">
                <h3 className="section-heading">Application Details</h3>
                <p>
                  <strong>Cover Letter:</strong>
                </p>
                <p className="cover-letter">{cover_letter}</p>
              </div>

              {/* Resume Download Button */}
              <div className="actions">
                <button
                  onClick={() => handleDownloadResume(application.id)} // Pass the application ID for downloading resume
                  className="download-resume-button"
                >
                  Download Resume
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetApplicantsDetails;
