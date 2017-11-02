import React from 'react';
import ShelfChanger from "../ShelfChanger/ShelfChanger";
import './Book.css'

const withLoading = (Component) =>
	({loading, ...others}) =>
		loading
			? <div className="loader"></div>
			: <Component { ...others } />

const Book = ({id, title, authors, imageLinks, shelf, loading, onShelfChange}) =>
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
			<div className="book-authors">{authors ? authors.join() : ''}</div>
		</div>

export default withLoading(Book)