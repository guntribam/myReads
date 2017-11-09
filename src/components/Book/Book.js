import React from 'react';
import ShelfChanger from "../ShelfChanger/ShelfChanger";
import {DragSource} from 'react-dnd'
import './Book.css'
import BookDragger from "../BookDragger/BookDragger";

//This object specified by this method is return when drop occurs
const bookSource = {
	beginDrag(props) {
		return {
			bookId: props.id,
			onShelfChange: props.onShelfChange,
			shelf: props.shelf
		}
	}
}

//HOC to show/hide loading animation
const withLoading = (Component) =>
	({loading, ...others}) =>
		loading
			? <div className="book">
				<div className="loader"></div>
			</div>
			: <Component {...others} />

//This is used by the DropTarget HOC of react-dnd to add extra properties
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

const Book = (props) => {
	const {id, title, authors, imageLinks, shelf, onShelfChange, dragButton} = props
	const {isDragging, connectDragSource} = props

	return <div className="book" style={{opacity: isDragging ? 0.4 : 1}}>
		<div className="book-top">
			<div className="book-cover" style={{
				width: 128,
				height: 193,
				backgroundImage: `url(${imageLinks.thumbnail})`
			}}>
			</div>
			{connectDragSource(<div>
				{dragButton
					? <BookDragger/>
					: <ShelfChanger onShelfChange={onShelfChange} shelf={shelf} bookId={id}/>}
			</div>)}

		</div>
		<div className="book-title">{title}</div>
		<div className="book-authors">{authors ? authors.join() : ''}</div>
	</div>
}

export default DragSource('book', bookSource, collect)(withLoading(Book))