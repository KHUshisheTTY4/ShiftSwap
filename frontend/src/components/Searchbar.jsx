// import React, { useState } from "react";
// import { toast } from "react-toastify"; // Import the toast function for notifications
// import { getJobs } from "../services/api"; // Import the getJobs function from api.js
// import "./Searchbar.css";

// function Searchbar({ setFilteredJobs, setNoJobsFound }) {
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const [location, setLocation] = useState(""); // State for location filter
//   const [category, setCategory] = useState(""); // State for category filter
//   const [loading, setLoading] = useState(false); // State to handle loading state

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value); // Update search query state
//   };

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value); // Update location state
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value); // Update category state
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent form submission
//     setLoading(true); // Set loading to true

//     // Prepare the filters object to send to the API
//     const filters = {
//       search: searchQuery,
//       location: location,
//       category: category,
//     };

//     // Check if searchQuery is empty or filters are empty, and do not submit if true
//     if (!searchQuery && !location && !category) {
//       toast.info("Please enter a search term or apply a filter.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await getJobs(filters); // Call getJobs with filters
//       if (result.data.length === 0) {
//         toast.info(result.message || "No jobs found based on your search.");
//         setNoJobsFound(true); // Set no jobs found state
//         setFilteredJobs([]); // Clear filtered jobs state
//       } else {
//         setFilteredJobs(result.data); // Update filtered jobs state with fetched data
//         toast.success("Jobs fetched successfully!");
//         setNoJobsFound(false); // Reset no jobs found state
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       toast.error(error.message || "Error fetching jobs.");
//       setNoJobsFound(true); // Show no jobs found on error
//       setFilteredJobs([]); // Clear filtered jobs state on error
//     } finally {
//       setLoading(false); // Set loading to false after fetching data
//     }
//   };

//   return (
//     <div className="searchbar-container">
//       <header className="searchbar-header">
//         <h1 className="searchbar-title">
//           Find part-time jobs with flexible hours
//         </h1>
//         <form className="searchbar-form" onSubmit={handleSubmit}>
//           <div className="searchbar-input-container">
//             <input
//               type="text"
//               className="searchbar-input"
//               placeholder="Search for jobs..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <input
//               type="text"
//               className="searchbar-input"
//               placeholder="Location"
//               value={location}
//               onChange={handleLocationChange}
//             />
//             <input
//               type="text"
//               className="searchbar-input"
//               placeholder="Category"
//               value={category}
//               onChange={handleCategoryChange}
//             />
//             <button
//               type="submit"
//               className="searchbar-button"
//               disabled={loading}
//             >
//               {loading ? "Searching..." : "Search"}
//             </button>
//           </div>
//         </form>
//       </header>
//     </div>
//   );
// }

// export default Searchbar;


import React, { useState } from "react";
import { toast } from "react-toastify"; // Import the toast function for notifications
import { getJobs } from "../services/api"; // Import the getJobs function from api.js
import "./Searchbar.css";

function Searchbar({ setFilteredJobs, setNoJobsFound }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [location, setLocation] = useState(""); // State for location filter
  const [category, setCategory] = useState(""); // State for category filter
  const [loading, setLoading] = useState(false); // State to handle loading state

  // List of job categories
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value); // Update location state
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update category state
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading to true

    // Prepare the filters object to send to the API
    const filters = {
      search: searchQuery,
      location: location,
      category: category,
    };

    // Check if searchQuery is empty or filters are empty, and do not submit if true
    if (!searchQuery && !location && !category) {
      toast.info("Please enter a search term or apply a filter.");
      setLoading(false);
      return;
    }

    try {
      const result = await getJobs(filters); // Call getJobs with filters
      if (result.data.length === 0) {
        toast.info(result.message || "No jobs found based on your search.");
        setNoJobsFound(true); // Set no jobs found state
        setFilteredJobs([]); // Clear filtered jobs state
      } else {
        setFilteredJobs(result.data); // Update filtered jobs state with fetched data
        toast.success("Jobs fetched successfully!");
        setNoJobsFound(false); // Reset no jobs found state
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error(error.message || "Error fetching jobs.");
      setNoJobsFound(true); // Show no jobs found on error
      setFilteredJobs([]); // Clear filtered jobs state on error
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <div className="searchbar-container">
      <header className="searchbar-header">
        <h1 className="searchbar-title">
          Find part-time jobs with flexible hours
        </h1>
        <form className="searchbar-form" onSubmit={handleSubmit}>
          <div className="searchbar-input-container">
            <input
              type="text"
              className="searchbar-input"
              placeholder="Search for jobs..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              className="searchbar-input"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
            />
            <select
              className="searchbar-input"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((categoryOption, index) => (
                <option key={index} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="searchbar-button"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Searchbar;
