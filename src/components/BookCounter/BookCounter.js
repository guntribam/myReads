import React from 'react';
import './BookCounter.css'

const BookCounter = ({counter}) =>
	<button className="bookshelf-book-counter">
		<strong>{counter}</strong>
	</button>

export default BookCounter