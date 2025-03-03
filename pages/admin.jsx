import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate, showNotif} from '/app'

const admin_ips = '124.83.104.174'
const pass = Data.readCollection("private")
  .then((data) => data[0].data.password)
  .catch((error) => {
    console.error(error);
  });

class Pass extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			passInput: '',
			ipa:'',
			password:''
		}
	}
	
	inputChange = (event) =>{
		this.setState({passInput: event.target.value})
	}
	buttonClicked = (event) => {

pass.then((password) => {
  if (this.state.passInput==password){
			//Data.sendMessage('Someone entered admin panel')
			showNotif('System','Welcome admin!')
			navigate('dashboard')
		} else {
			showNotif('System','Invalid password')
		}
});
		
	}
	
	componentDidMount() {
	}
	
	
	render (){
		return (
			<div className="container p-1">
			<div className="card text-light bg-dark">
			<h5 className="text-bg-dark card-header">Admin Panel</h5>
			<div className="card-body">
			<label htmlFor="senderInput" className="form-label text-light">Password:</label>
        <div className="input-group">
          <span className="input-group-text bg-secondary text-light" id="addon-wrapping">
            <span className="bi-key-fill"></span>
          </span>
          <input
            onChange={this.inputChange}
            type="password"
            className="form-control bg-dark text-light border-secondary"
            id="senderInput"
          />
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