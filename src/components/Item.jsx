import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

function Item({ items }) {
  // Extracting id parameter from URL using useParams hook
  const { id } = useParams();

  // Finding the item in the items array based on the id parameter
  const item = items.find(item => item.id === id);

  // If item with specified id is not found, navigate user to the home page
  if (!item) {
    return <Navigate to="/" replace />
  }

  // Rendering the item details if found
  return (
    <main>
      <div className="card">
        {/* Displaying item name */}
        <h2>{item.name}</h2>
        <hr />
        {/* Displaying item description */}
        <p><strong>Description</strong><br />{item.description}</p>
        {/* Displaying item serve instructions */}
        <p><strong>Serve:</strong><br />{item.serve}</p>
      </div>
    </main>
  )
}

export default Item
