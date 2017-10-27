import React from 'react';
import ShelfChanger from "../ShelfChanger/ShelfChanger";

const Book = ({id, name, author, imageLinks, onShelfChange, shelf}) =>
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks.smallThumbnail})`
            }}>
            </div>
            <ShelfChanger onShelfChange={onShelfChange} shelf={shelf} bookId={id}/>
        </div>
        <div className="book-title">{name}</div>
        <div className="book-authors">{author}</div>
    </div>

export default Book;