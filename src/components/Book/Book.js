import React from 'react';
import ShelfChanger from "../ShelfChanger/ShelfChanger";


const Book = ({id, title, authors, imageLinks, onShelfChange, shelf}) =>
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks.thumbnail})`
            }}>
            </div>
            <ShelfChanger onShelfChange={onShelfChange} shelf={shelf} bookId={id}/>

        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join()}</div>
    </div>

export default Book;
