import React from 'react';
import {Link} from 'react-router-dom';
import {search} from '../../BooksAPI'
import {Debounce} from 'react-throttle';
import BookGrid from "../BookGrid/BookGrid";
import './Search.css'

export default class Search extends React.Component {
	state = {
		books: [],
		query: ''
	}

	handleChange = async (e) => {
		const query = e.target.value;
		if (query !== '') {
			try {
				const books = await search(query, 10)
				this.setState(
					{
						books: books.map(book => {
							return {...book, onShelfChange: this.props.onShelfChange}
						}),
						query
					})
			} catch (e) {
				console.log(e)
			}
		}
	}

	render() {
		return <div className="search-books">
			<div className="search-books-bar">
				<Link className="close-search" to="/">Close</Link>
				<div className="search-books-input-wrapper">
					<Debounce time="400" handler="onChange">
						<input type="text"
						       placeholder="Search by title or author"
						       onChange={this.handleChange}/>
					</Debounce>

				</div>
			</div>
			<div className="search-books-results">
				{
					this.state.books.length > 0
						? <BookGrid books={this.state.books} />
						: <h3 className="book-not-found">{this.state.query !== '' ? 'Book not found' : ''}</h3>
				}
			</div>
		</div>
	}
}