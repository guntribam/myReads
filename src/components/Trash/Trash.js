import React from 'react';
import {DropTarget} from 'react-dnd'
import './Trash.css'

//The function defined on this object will be called when you drop the book on the trash
const trashTarget = {
	drop(props, monitor) {
		const {bookId, onShelfChange} = monitor.getItem()
		onShelfChange('none', bookId)
	}
};

//This is used by the DropTarget HOC of react-dnd to add extra properties
const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
};

const Trash = ({connectDropTarget, isOver}) => {
	return connectDropTarget(
		<span className={isOver ? 'trash open-trash' : 'trash'}>
	        <span></span>
			<i></i>
        </span>
	)
};

//DropTarget HOC of react-dnd
export default DropTarget('book', trashTarget, collect)(Trash);