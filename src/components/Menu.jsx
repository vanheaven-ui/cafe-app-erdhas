import React from "react";
import { Link } from "react-router-dom";

function Menu({ title, items, type }) {
  return (
    <main>
      <div className="card">
        <h1>{title} Menu</h1>
        <hr />
        <ul>
          {/* Mapping over items array to render each item as a list */}
          {items.map((item) => (
            <li key={item.id}>
              {/* Link to each item's detail page */}
              <Link to={`/${type}/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Menu;
