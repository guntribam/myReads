import React from 'react';
import ShelfChanger from "../ShelfChanger/ShelfChanger";
import {DragSource} from 'react-dnd'
import './Book.css'

//This object specified by this method will return when drop occurs
const bookSource = {
	beginDrag(props) {
		return {
			bookId: props.id,
			onShelfChange: props.onShelfChange,
			shelf: props.shelf
		}
	}
};

//HOC to show/hide loading animation
const withLoading = (Component) =>
	({loading, ...others}) =>
		loading
			? <div className="book">
				<div className="loader"></div>
			</div>
			: <Component {...others} />

//This is used by the DragSource HOC of react-dnd to add extra properties
const collect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
};

const Book = (props) => {
	const {id, title, authors, imageLinks, shelf, onShelfChange, isDraggable} = props;
	const {isDragging, connectDragSource} = props;

	return connectDragSource(
		<div className="book" style={{opacity: isDragging ? 0.25 : 1}}>
			<div className="book-top" style={{cursor: isDraggable ? 'move' : 'default'}}>
				<img className="book-cover" src={imageLinks.thumbnail} alt="Book cover" />
				{isDraggable || <ShelfChanger onShelfChange={onShelfChange} shelf={shelf} bookId={id}/>}
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">{authors ? authors.join() : ''}</div>
		</div>)
};

//DragSource HOC of react-dnd
export default DragSource('book', bookSource, collect)(withLoading(Book));