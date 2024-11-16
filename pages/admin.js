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