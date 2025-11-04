// // // export default ApplyJob;
// // import React, { useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { applyJob } from "../services/api";
// // import { ToastContainer, toast } from 'react-toastify';
// // import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
// // import "./ApplyJob.css";

// // const ApplyJob = () => {

// //   const { jobid } = useParams();
// //   const [resume, setResume] = useState(null);
// //   const [coverLetter, setCoverLetter] = useState("");
// //   const [isApplied, setIsApplied] = useState(false); // Track if user has applied
// //   const [loading, setLoading] = useState(false); // Track loading state for the button

// //   const handleFileChange = (event) => {
// //     setResume(event.target.files[0]);
// //   };

// //   const handleCoverLetterChange = (event) => {
// //     setCoverLetter(event.target.value);
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     if (!resume || !coverLetter) {
// //       toast("Please upload a resume and provide a cover letter.");

// //       return;
// //     }

// //     // Prepare form data
// //     const formData = new FormData();
// //     formData.append("resume", resume);
// //     formData.append("cover_letter", coverLetter);
// //     formData.append("jobid", jobid);
// //     formData.append("userid", localStorage.getItem("userid"));

// //     try {
// //       setLoading(true); // Disable the button while loading

// //       const response = await applyJob(formData, jobid);

// //       if (response.success) {
// //         toast.success("Successfully applied for the job!");
// //         setIsApplied(true); // Set the applied state to true
// //       } else {
// //         toast.error("You have already applied for this job.");
// //       }
// //     } catch (error) {
// //       console.error("Error applying for the job:", error);
// //       toast.error("Error applying for the job.");
// //     } finally {
// //       setLoading(false); // Enable the button after the operation
// //     }
// //   };

// //   return (
// //     <div className="apply-job-container">
// //       <h2>Apply for Job</h2>

// //       <form onSubmit={handleSubmit} encType="multipart/form-data">
// //         <div className="form-group">
// //           <label htmlFor="coverLetter">Cover Letter:</label>
// //           <textarea
// //             id="coverLetter"
// //             value={coverLetter}
// //             onChange={handleCoverLetterChange}
// //             placeholder="Write your cover letter here..."
// //             required
// //           ></textarea>
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="resume">Resume (PDF only):</label>
// //           <input
// //             type="file"
// //             id="resume"
// //             accept=".pdf"
// //             onChange={handleFileChange}
// //             required
// //           />
// //         </div>

// //         <div className="form-group">
// //           <button className="apply-button"
// //             type="submit"
// //             disabled={isApplied || loading} // Disable if already applied or loading
// //           >
// //             {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply"}
// //           </button>
// //           <ToastContainer/>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ApplyJob;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { applyJob, getUserProfile, updateUserProfile } from "../services/api";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ApplyJob.css";

// const ApplyJob = () => {
//   const { jobid } = useParams();
//   const [resume, setResume] = useState(null);
//   const [coverLetter, setCoverLetter] = useState("");
//   const [userDetails, setUserDetails] = useState({});
//   const [isApplied, setIsApplied] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await getUserProfile();
//         const profileData = response.userDetails[0];
//         setUserDetails(profileData);
//         setCoverLetter(profileData.coverLetter || ""); // Autofill cover letter if available
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         toast.error("Failed to load user profile.");
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume || !coverLetter) {
//       toast.error("Please upload a resume and provide a cover letter.");
//       return;
//     }

//     // Prepare form data for the job application
//     const formData = new FormData();
//     formData.append("resume", resume);
//     formData.append("cover_letter", coverLetter);
//     formData.append("jobid", jobid);
//     formData.append("userid", localStorage.getItem("userid"));

//     try {
//       setLoading(true);

//       // Update user profile in the database
//       await updateUserProfile(userDetails);

//       // Submit the job application
//       const response = await applyJob(formData, jobid);

//       if (response.success) {
//         toast.success("Successfully applied for the job!");
//         setIsApplied(true);
//       } else {
//         toast.error("You have already applied for this job.");
//       }
//     } catch (error) {
//       console.error("Error applying for the job:", error);
//       toast.error("Error applying for the job.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="apply-job-container">
//       <h2>Apply for Job</h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label htmlFor="fullname">Full Name:</label>
//           <input
//             type="text"
//             id="fullname"
//             name="fullname"
//             value={userDetails.fullname || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userDetails.email || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="phoneno">Phone Number:</label>
//           <input
//             type="text"
//             id="phoneno"
//             name="phoneno"
//             value={userDetails.phoneno || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="gender">Gender:</label>
//           <input
//             type="text"
//             id="gender"
//             name="gender"
//             value={userDetails.gender || ""}
//             onChange={handleInputChange}
//             required
//           />
//           <div className="form-group">
//             <label htmlFor="skills">Skills:</label>
//             <input
//               type="text"
//               id="skills"
//               name="skills"
//               value={userDetails.skills || ""}
//               onChange={handleInputChange}
//               required
//             />
//             <div className="form-group">
//               <label htmlFor="education">Education:</label>
//               <input
//                 type="text"
//                 id="education"
//                 name="education"
//                 value={userDetails.education || ""}
//                 onChange={handleInputChange}
//                 required
//               />
//               <div className="form-group">
//                 <label htmlFor="languagesspoken">Languages spoken:</label>
//                 <input
//                   type="text"
//                   id="languagesspoken"
//                   name="languagesspoken"
//                   value={userDetails.languagesspoken || ""}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="coverLetter">Cover Letter:</label>
//           <textarea
//             id="coverLetter"
//             name="coverLetter"
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//             placeholder="Write your cover letter here..."
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="resume">Resume (PDF only):</label>
//           <input
//             type="file"
//             id="resume"
//             accept=".pdf"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <button
//             type="submit"
//             disabled={isApplied || loading}
//             className="apply-button"
//           >
//             {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply"}
//           </button>
//           <ToastContainer />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplyJob;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { applyJob, getUserProfile, updateUserProfile } from "../services/api";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ApplyJob.css";

// const ApplyJob = () => {
//   const { jobid } = useParams();
//   const [resume, setResume] = useState(null);
//   const [coverLetter, setCoverLetter] = useState("");
//   const [userDetails, setUserDetails] = useState({});
//   const [isApplied, setIsApplied] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await getUserProfile();
//         const profileData = response.userDetails[0];
//         setUserDetails(profileData);
//         setCoverLetter(profileData.coverLetter || "");
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         toast.error("Failed to load user profile.");
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume || !coverLetter) {
//       toast.error("Please upload a resume and provide a cover letter.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", resume);
//     formData.append("cover_letter", coverLetter);
//     formData.append("jobid", jobid);
//     formData.append("userid", localStorage.getItem("userid"));

//     try {
//       setLoading(true);

//       await updateUserProfile(userDetails);

//       const response = await applyJob(formData, jobid);

//       if (response.success) {
//         toast.success("Successfully applied for the job!");
//         setIsApplied(true);
//       } else {
//         toast.error("You have already applied for this job.");
//       }
//     } catch (error) {
//       console.error("Error applying for the job:", error);
//       toast.error("Error applying for the job.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="apply-job-container">
//       <h2>Apply for Job</h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label htmlFor="fullname">Full Name:</label>
//           <input
//             type="text"
//             id="fullname"
//             name="fullname"
//             value={userDetails.fullname || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userDetails.email || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="phoneno">Phone Number:</label>
//           <input
//             type="text"
//             id="phoneno"
//             name="phoneno"
//             value={userDetails.phoneno || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="gender">Gender:</label>
//           <input
//             type="text"
//             id="gender"
//             name="gender"
//             value={userDetails.gender || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="skills">Skills:</label>
//           <input
//             type="text"
//             id="skills"
//             name="skills"
//             value={userDetails.skills || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="education">Education:</label>
//           <input
//             type="text"
//             id="education"
//             name="education"
//             value={userDetails.education || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="languagesspoken">Languages Spoken:</label>
//           <input
//             type="text"
//             id="languagesspoken"
//             name="languagesspoken"
//             value={userDetails.languagesspoken || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="coverLetter">Cover Letter:</label>
//           <textarea
//             id="coverLetter"
//             name="coverLetter"
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//             placeholder="Write your cover letter here..."
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="resume">Resume (PDF only):</label>
//           <input
//             type="file"
//             id="resume"
//             accept=".pdf"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <button
//             type="submit"
//             disabled={isApplied || loading}
//             className="apply-button"
//           >
//             {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply"}
//           </button>
//           <ToastContainer />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplyJob;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { applyJob, getUserProfile, updateUserProfile } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ApplyJob.css";

const ApplyJob = () => {
  const { jobid } = useParams();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        const profileData = response.userDetails[0];
        setUserDetails(profileData);
        setCoverLetter(profileData.coverLetter || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !coverLetter) {
      toast.error("Please upload a resume and provide a cover letter.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("cover_letter", coverLetter);
    formData.append("jobid", jobid);
    formData.append("userid", localStorage.getItem("userid"));

    try {
      setLoading(true);

      await updateUserProfile(userDetails);

      const response = await applyJob(formData, jobid);

      if (response.success) {
        toast.success("Successfully applied for the job!");
        setIsApplied(true);
      } else {
        toast.error("You have already applied for this job.");
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      toast.error("Error applying for the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-job-container">
      <h2 className="apply-job-header">Apply for Job</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="apply-job-form">
        <div className="apply-job-group">
          <label htmlFor="fullname" className="apply-job-label">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={userDetails.fullname || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="email" className="appy-job-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="phoneno" className="appy-job-label">Phone Number:</label>
          <input
            type="text"
            id="phoneno"
            name="phoneno"
            value={userDetails.phoneno || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="gender" className="appy-job-label">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={userDetails.gender || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="skills" className="appy-job-label">Skills:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={userDetails.skills || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="education" className="appy-job-label">Education:</label>
          <input
            type="text"
            id="education"
            name="education"
            value={userDetails.education || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="languagesspoken" className="appy-job-label">Languages Spoken:</label>
          <input
            type="text"
            id="languagesspoken"
            name="languagesspoken"
            value={userDetails.languagesspoken || ""}
            onChange={handleInputChange}
            className="appy-job-input"
            required
          />
        </div>

        <div className="appy-job-group">
          <label htmlFor="coverLetter" className="appy-job-label">Cover Letter:</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="appy-job-textarea"
            placeholder="Write your cover letter here..."
            required
          ></textarea>
        </div>

        <div className="appy-job-group">
          <label htmlFor="resume" className="appy-job-label">Resume (PDF only):</label>
          <input
            type="file"
            id="resume"
            accept=".pdf"
            onChange={handleFileChange}
            className="appy-job-input-file"
            required
          />
        </div>

        <div className="appy-job-group">
          <button
            type="submit"
            disabled={isApplied || loading}
            className="apply-button"
          >
            {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply"}
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;
