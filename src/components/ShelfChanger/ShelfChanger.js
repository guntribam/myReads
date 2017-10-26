import React from 'react';

const ShelfChanger = ({id, onShelfChange}) =>
    <div className="book-shelf-changer">
        <select onChange={(e) => onShelfChange(e.target.value, id)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>

export default ShelfChanger;