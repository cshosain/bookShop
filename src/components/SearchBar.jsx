import { useState } from "react";
import styles from "../styles_modules/Nav.module.css";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        className={styles.navSearch}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button>Seacrh</button>
    </div>
  );
}

export default SearchBar;
