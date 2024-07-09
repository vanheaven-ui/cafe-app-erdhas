import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { getItems } from "./services/api";
import Menu from "./components/Menu";
import Item from "./components/Item";
import ItemForm from "./components/ItemForm";
import "./App.css";

function App() {
  // State to store items and manage loading state
  const [items, setItems] = useState({
    drinks: [],
    snacks: [],
  });

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // State for displaying notices
  const [notice, setNotice] = useState("");

  // Effect to clear notice after 1 second when notice state changes
  useEffect(() => {
    setTimeout(() => {
      setNotice("");
    }, 1000);
  }, [notice.length]); // Only re-run effect if notice length changes

  // Effect to fetch items from API on component mount
  useEffect(() => {
    async function fetchData() {
      // Fetch drinks and snacks items from API
      const drinks = await getItems("drinks");
      const snacks = await getItems("snacks");

      // Update loading state
      setIsLoading(false);

      // Update items state with fetched data
      setItems((prevState) => ({
        ...prevState,
        drinks: drinks,
        snacks: snacks,
      }));
    }

    // Call fetchData function when component mounts
    fetchData();
  }, []); // Empty dependency array ensures effect runs only once on mount

  // Render loading message while fetching data
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render application content after data is fetched
  return (
    <>
      <BrowserRouter>
        {/* Navbar component */}
        <Navbar />
        
        {/* Display notice if notice state is not empty */}
        {notice.length > 0 && <p className="notice">{notice}</p>}
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home items={items} />} />
          <Route
            path="/snacks"
            element={<Menu title="Snacks" items={items.snacks} type="snacks" />}
          />
          <Route
            path="/drinks"
            element={<Menu title="Drinks" items={items.drinks} type="drinks" />}
          />
          <Route path="/snacks/:id" element={<Item items={items.snacks} />} />
          <Route path="/drinks/:id" element={<Item items={items.drinks} />} />
          <Route
            path="/new"
            element={<ItemForm setItems={setItems} setNotice={setNotice} />}
          />
          <Route
            path="*"
            element={<h2>404: The page does not exist: try again</h2>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
