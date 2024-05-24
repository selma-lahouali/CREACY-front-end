import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Update the URL with the search term
    navigate(`?search=${searchTerm}`);
  };

  return (
    <form className="searchBar" onSubmit={handleSearchSubmit}>
      <input
        type="search"
        name="searchBar"
        id="searchBar"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <IoMdSearch className="searchIcon" />
    </form>
  );
};

export default SearchBar;
