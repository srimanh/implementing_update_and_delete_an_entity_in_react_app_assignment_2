import { useEffect, useState } from "react";
import ItemList from "./components/ItemList";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URI}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setItems(items.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return <ItemList items={items} onDelete={handleDelete} />;
}

export default App;