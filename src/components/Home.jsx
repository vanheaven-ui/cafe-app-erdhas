import React from "react";

function Home({ items }) {
  // Destructure items object to extract drinks and snacks arrays
  const { drinks, snacks } = items;

  return (
    <main>
      <div className="card">
        {/* Main heading */}
        <h2>Welcome to cafe app where taste is indeed taste</h2>
        {/* Horizontal line */}
        <hr />
        {/* Display number of drinks if drinks array exists and has items */}
        {drinks?.length > 0 && <p>We have {drinks.length} drinks</p>}
        {/* Display number of snacks if snacks array exists and has items */}
        {snacks?.length > 0 && (
          <>
            {/* Display conjunction "and" */}
            <span>and</span> <br />
            {/* Display number of snacks */}
            <p>{snacks?.length} snacks</p>
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
