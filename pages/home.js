import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate} from '/app'


class Home extends React.Component {
	
	constructor (props){
		super(props)
		this.state = {
			'sender': '',
			'message':'',
			'date':new Date().toDateString(),
			'private':false
		}
	}
	
	senderChange = (event) =>{
		this.setState({'sender':event.target.value})
	}
	messageChange = (event) =>{
		this.setState({'message':event.target.value})
	}
	privateChange = (event) =>{
		console.log(event.target.checked)
		
		this.setState({'private':event.target.checked})
	}
	buttonClick = (event) => {
		const check = Data.addDocument("maindata",{
			'sender': this.state.sender,
			'message': this.state.message,
			'date': this.state.date,
			'private': this.state.private
		})
		if (check){
			alert('Succesfuly sent your message')
			navigate('messages')
		} else {
			alert("couldn't send message")
		}
	}
	 
 render (){
 	
  return (
   <div className="container p-1">
   <div className="card">
   <h3 className="card-header">Send message</h3>
   <div className="card-body">
   <div className="input-group p-1">
  <span className="input-group-text" id="addon-wrapping"><span className="bi-person-fill"></span></span>
 	<input onChange={this.senderChange} type="text" className="form-control" placeholder="Sender's name(Leave blank to send anonymously)" aria-label="Username" aria-describedby="addon-wrapping"/>
  </div>
  <div className="input-group p-1">
  <span className="input-group-text"><span className="bi-chat-left-dots-fill"></span></span>
  <textarea onChange={this.messageChange} placeholder="Your message here" className="form-control" aria-label="With textarea"></textarea>
</div>
<div className="form-check form-switch m-1">
  <input onChange={this.privateChange} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
  <label className="form-check-label"> Private</label>
</div>
<div className="d-grid p-1">
  <button onClick={this.buttonClick} type="button" className="m-1 btn btn-primary">Send <span className="bi-send-fill"></span></button>
 </div>
</div>
   </div>
   </div>
  )
 }
}

export default function HomePage() {
 return(<Home></Home>)
}