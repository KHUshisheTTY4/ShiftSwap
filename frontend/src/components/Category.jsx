import React from "react";
import "./Category.css";

function Category({ setFilters }) {
  // Declare the chooseCategory function properly
  const chooseCategory = (category) => {
    setFilters({ category }); // Set the filter with the selected category
  };
  return (
    <section className="job-categories">
      <h2>Job Categories</h2>
      <div className="categories-grid">
        {[
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
        ].map((category) => (
          <div
            key={category}
            className="category-card"
            onClick={() => chooseCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;
