import React from 'react';
import BookGrid from "../BookGrid/BookGrid";
import BookCounter from "../BookCounter/BookCounter";
import {DropTarget} from 'react-dnd'
import './Bookshelf.css'

//The function defined on this object will be called when you drop the book on a different shelf
const bookShelfTarget = {
	drop(props, monitor) {
		const {bookId, onShelfChange, shelf} = monitor.getItem();
		const newShelf = props.shelf.value;
		if (newShelf !== shelf)
			onShelfChange(newShelf, bookId);
	}
};

//This is used by the DropTarget HOC of react-dnd to add extra properties
const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		bookDroped: monitor.getItem()
	}
};

const BookShelf = (props) => {
	const {shelf, books, isOver, bookDroped, connectDropTarget} = props;
	const notThisShelf = bookDroped ? shelf.value !== bookDroped.shelf : false;

	return connectDropTarget(
		<div className="bookshelf" style={isOver && notThisShelf ? {borderStyle: 'dashed'} : {}}>
			<h2 className="bookshelf-title">
				{shelf.title}<BookCounter counter={books.length}/>
			</h2>
			<div className="bookshelf-books">
				<BookGrid books={books}/>
			</div>
		</div>)
};

export default DropTarget('book', bookShelfTarget, collect)(BookShelf);