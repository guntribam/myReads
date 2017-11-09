import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Search from "./components/Search/Search";
import ListBooks from "./components/ListBooks/ListBooks";
import * as BooksAPI from './BooksAPI'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchBooks: [],
		query: ''
	}

	componentDidMount = () => this.getBooks();

	buildBook = (bookObject) => {return {...bookObject, onShelfChange: this.onShelfChange, loading: false}}

	getBooks = async () => {
		try {
			const books = await BooksAPI.getAll();
			this.setState({books: books.map(this.buildBook)})
		} catch (e) {
			console.log(e)
		}
	}

	onSearch = async (e) => {
		const query = e.target.value;
		console.log(query)
		if (query !== '') {
			try {
				const books = await BooksAPI.search(query, 10)
				this.setState({searchBooks: books.map(this.buildBook),query})
			} catch (e) {
				console.log(e)
				this.setState({query})
			}
		}
	}

	onShelfChange = async (newShelf, bookId) => {
		this.activateLoading(bookId);
		try {
			await BooksAPI.update({id: bookId}, newShelf)
			this.getBooks();
			this.onSearch({target: {value:this.state.query}})
		}
		catch (e) {
			console.log(e)
		}
	}

	activateLoading = (bookId) =>
		this.setState(prevState => {
			const books = prevState.books;
			const book = books[books.findIndex(book => book.id === bookId)]
			if(book) book.loading = true

			const searchBooks = prevState.searchBooks;
			const searchBook = searchBooks[searchBooks.findIndex(book => book.id === bookId)]
			if(searchBook) searchBook.loading = true
			return {books, searchBooks}
		})


	render = () =>
		<BrowserRouter>
			<div className="app">
				<Route exact path="/" render={() =>
					<ListBooks books={this.state.books}/>
				}/>
				<Route exact path="/search" render={() =>
					<Search books={this.state.searchBooks}
					        onSearch={this.onSearch}
					        query={this.state.query}/>
				}/>
			</div>
		</BrowserRouter>
}

export default DragDropContext(HTML5Backend)(BooksApp)