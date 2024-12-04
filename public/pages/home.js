import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/public/data/data_manager';
import * as Config from '/public/data/app_configurations'
import {navigate, showNotif} from '/public/app'

const max_msg_chars = Config.inputConfig.max_message_chars
const max_sender_chars = Config.inputConfig.max_sender_chars


class Home extends React.Component {
	
	constructor (props){
		super(props)
		this.state = {
			'sender': "",
			'message':"",
			'date':null,
			'private':false,
			'sl':`0/${max_sender_chars}`,
			'ml':`0/${max_msg_chars}`
		}
	}
	//Sender box limitation handler
	senderChange = (event) =>{
		if (event.target.value.length >= max_sender_chars) {
		//	event.target.value = this.state.sender
		const fil = event.target.value.split("",max_sender_chars)
		let text = ""
		for (let x in fil){
			text+=fil[x]
		}
		event.target.value=text
			showNotif('System', `Sender cannot exceed ${max_sender_chars} characters`)
		} else {
			this.setState({ 'sender': event.target.value })
		}
		this.setState({'sl':`${event.target.value.length}/${max_sender_chars}`})
	}
	//Message box limitations handler
	messageChange = (event) =>{
		if (event.target.value.length > max_msg_chars){
		const fil1 = event.target.value.split("",max_msg_chars)
		let text1 = ""
		for (let x in fil1){
			text1+=fil1[x]
		}
		event.target.value=text1
		showNotif('System', `Message cannot exceed ${max_msg_chars} characters`)
		} else {
			this.setState({'message':event.target.value})
		}
		this.setState({'ml':`${event.target.value.length}/${max_msg_chars}`})
	}
	//Visibility handler
	privateChange = (event) =>{
		this.setState({'private':event.target.checked})
	}
	//Message submission handler
	buttonClick = (event) => {
		if (this.state.message!=""){
			const check = Data.addDocument("maindata",{
			'sender': this.state.sender,
			'message': this.state.message,
			'date': new Date(),
			'private': this.state.private
		})
		const text = `New message from ${this.state.sender!=""?this.state.sender:'Anonymous'}, sent to ${this.state.private?'private':'public'}`
		if (check){
			const text1 = `Your message was sent successfully to ${this.state.private?'reymart':'Messages'}`
			showNotif('System',text1)
			Data.sendMessage(text)
			navigate('messages')
		} else {
			showNotif('System',"Couldn't send message")
		}
		} else {
			showNotif("System","Please provide a message")
		}
		
		
	}
	 
 render (){
 	
  return (
   <div className="container p-1">
   <div className="card fw-light">
   <h5 className="card-header m-0 text-bg-primary">Message me</h5>
   <div className="card-body">
     <code><small className="text-primary m-0 p-1">{this.state.sl}</small></code>
   
<div className="input-group mb-3">
  <span className="input-group-text" id="addon-wrapping"><span className="bi-person-fill"></span></span>
  <div className="form-floating">
    <input onChange={this.senderChange} type="text" className="form-control" id="floatingInputGroup1" placeholder="Sender"/>
    <label htmlFor="floatingInputGroup1" >Sender(Optional)</label>
  </div>
</div>
  
  <code><small className="text-primary m-0 p-1">{this.state.ml}</small></code>
  <div className="border card">
  <div className="input-group p-1">
  <div className="form-floating">
  <textarea onChange={this.messageChange} className="form-control border-0 rounded-0 no-ring" placeholder="Your message here" id="floatingTextarea2"></textarea>
  <label htmlFor="floatingTextarea2">Message</label>
</div>
</div>
<div className="card-footer">
<div className="form-check form-switch">
  <input onChange={this.privateChange} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
  <label htmlFor="flexSwitchCheckChecked" className="m-0 form-check-label">Private</label>
</div>
</div>
</div>
<div className="d-grid mt-2">
  <button onClick={this.buttonClick} type="button" className="btn btn-primary">Send <span className="bi-send-fill"></span></button>
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