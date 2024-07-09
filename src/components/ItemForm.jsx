import React, { useState } from "react";
import "./itemForm.css"; // Importing CSS file for styling
import { addItem } from "../services/api"; // Importing API function to add items
import { useNavigate } from "react-router-dom"; // Importing hook for navigation

// Initial state for the form fields
const INITIAL_STATE = {
  type: "snacks",
  name: "",
  description: "",
  recipe: "",
  serve: "",
};

function ItemForm({ setItems, setNotice }) {
  const [formData, setFormData] = useState(INITIAL_STATE); // State to hold form data
  const navigate = useNavigate(); // Navigation hook from react-router-dom

  // Function to handle changes in form input fields
  function handleChange(event) {
    const { name, value } = event.target;

    // Updating formData state using functional update
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const { type, name, description, recipe, serve } = formData; // Destructuring formData
    const pathParameter = "/" + type; // Creating path parameter for navigation

    // Creating item object to be added
    const item = {
      id: (name.charAt(0).toLowerCase() + name.slice(1)).split(" ").join("-"), // Generating id from name
      name,
      description,
      recipe,
      serve,
    };

    // Calling addItem function from API service to add item
    const { message } = await addItem(item, type); // Await response from addItem function
    setNotice(message); // Setting notice message

    // Updating items state based on item type
    setItems((prevState) => ({
      ...prevState,
      drinks: type === "drinks" ? [...prevState.drinks, item] : prevState.drinks,
      snacks: type === "snacks" ? [...prevState.snacks, item] : prevState.snacks,
    }));

    // Resetting formData state to initial state
    setFormData(INITIAL_STATE);

    // Navigating to the path based on item type
    navigate(pathParameter);
  }

  return (
    <main>
      <div className="card">
        <h2>Create your item</h2>
        <form onSubmit={handleSubmit}>
          {/* Select input for item type */}
          <div className="form-field">
            <label htmlFor="type">Select type:</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="snacks">Snacks</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Input field for item name */}
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Eg. Samosa..."
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          {/* Textarea field for item description */}
          <div className="form-field">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              required
              onChange={handleChange}
              placeholder="Enter item description..."
              value={formData.description}
            ></textarea>
          </div>

          {/* Textarea field for item recipe */}
          <div className="form-field">
            <label htmlFor="recipe">Recipe:</label>
            <textarea
              name="recipe"
              id="recipe"
              required
              onChange={handleChange}
              placeholder="Enter recipe..."
              value={formData.recipe}
            ></textarea>
          </div>

          {/* Textarea field for item serve instructions */}
          <div className="form-field">
            <label htmlFor="serve">Serve Instructions:</label>
            <textarea
              name="serve"
              id="serve"
              placeholder="Enter serve instructions...."
              required
              onChange={handleChange}
              value={formData.serve}
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="submit-button">
            <input type="submit" value="Add Item" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default ItemForm;
