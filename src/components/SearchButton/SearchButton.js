import React from 'react';
import {Link} from "react-router-dom";
import './SearchButton.css'

const SearchButton = () =>
    <div className="open-search">
        <Link to="/search">Add a book</Link>
    </div>

export default SearchButton;