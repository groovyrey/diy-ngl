import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate, showNotif} from '/app'

const password = "MDYyMDIzcmV5"

class Pass extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			passInput: ''
		}
	}
	
	inputChange = (event) =>{
		this.setState({passInput: event.target.value})
	}
	buttonClicked = (event) => {
		const convert = btoa(this.state.passInput)
		
		if (convert==password){
			showNotif('System','Welcome admin!')
			navigate('dashboard')
		} else {
			showNotif('System','Invalid password')
		}
	}
	
	
	render (){
		return (
			<div className="container p-1">
			<div className="card">
			<h5 className="text-bg-primary card-header">Admin Panel</h5>
			<div className="card-body">
			<div className="form-floating">
  <input onChange={this.inputChange} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
  <label>Password</label>
</div>
			</div>
			<button onClick={this.buttonClicked} type="button" className="btn btn-primary m-3">Submit</button>
			</div>
			</div>
		)
	}
}



export default function AdminPage(){
	return(<Pass/>)
}