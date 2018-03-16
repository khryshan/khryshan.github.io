import React from 'react';
import './add-task-style.css';



class AddTask extends React.Component {

	constructor(props) {
    super(props);

    this.addTask = this.addTask.bind(this);
  };


  addTask(e) {
  	e.preventDefault();
  	let input = e.target.querySelector('input');
  	let value = input.value;
  	
  	if(!value) { return };

  	this.props.saveTask();
  	input.value = '';

  };


  
	render() {

		return (

			<form className="add__block" onSubmit={this.addTask}>
				<input
					className="add__input" 
					type="text" 
					placeholder="Add Task to List, press Enter to save" 
					onChange={(e) => { this.props.handleTextInput(e.target.value) }}
				/>
				<button className="add__btn">
					<svg viewBox="0 0 32 32" width="40px" height="40px" fill="#cccccc">
						<path d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z "/>
					</svg>
				</button> 
			</form>

		);
	};
};

export default AddTask;