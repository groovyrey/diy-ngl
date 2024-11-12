import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate, showNotif} from '/app'

const max_msg_chars = 3000
const max_sender_chars = 50




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
	
	componentDidMount(){}
	
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
   <div className="card">
   <h5 className="card-header text-bg-primary">Message me</h5>
   <div className="card-body">
     <code><small className="text-primary m-0 p-1">{this.state.sl}</small></code>
   <div className="input-group p-1">
  <span className="input-group-text" id="addon-wrapping"><span className="bi-person-fill"></span></span>

 	<input id="senderIn" onChange={this.senderChange} type="text" className="form-control" placeholder="Sender(Optional)" aria-label="Username" aria-describedby="addon-wrapping"/>
  </div>
  <code><small className="text-primary m-0 p-1">{this.state.ml}</small></code>
  <div className="input-group p-1">
  <textarea onChange={this.messageChange} placeholder="Message" className="form-control" aria-label="With textarea"></textarea>
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