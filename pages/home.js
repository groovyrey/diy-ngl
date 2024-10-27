import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate, showNotif} from '/app'

const webhookURL = "https://discord.com/api/webhooks/1299650206333141074/ywe-JBRSJb_XbsF3M7aZIWIoYipFX1oi-cse6PKJ2JXIBXzRYhJvGJwZhEpFOYTGrNoi";

const max_msg_chars = 50

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
		
		if (event.target.value.length>=max_msg_chars){
			event.target.value = this.state.message
			showNotif('System',`Message cannot exceed ${max_msg_chars} characters`)
		} else {
			this.setState({'message':event.target.value})
		}
	}
	privateChange = (event) =>{
		this.setState({'private':event.target.checked})
	}
	buttonClick = (event) => {
		
		if (this.state.message!=""){
			const check = Data.addDocument("maindata",{
			'sender': this.state.sender,
			'message': this.state.message,
			'date': this.state.date,
			'private': this.state.private
		})
		const text = `${this.state.sender!=""?this.state.sender:'Anonymous'} sent a message to ${this.state.private?'private':'public'}`
		if (check){
			const text1 = `Your message was sent successfully to ${this.state.private?'reymart':'Messages'}`
			showNotif('System',text1)
			sendMessage(text)
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
   <h3 className="card-header">Message me</h3>
   <div className="card-body">
   <div className="input-group p-1">
  <span className="input-group-text" id="addon-wrapping"><span className="bi-person-fill"></span></span>
 	<input onChange={this.senderChange} type="text" className="form-control" placeholder="Sender(Optional)" aria-label="Username" aria-describedby="addon-wrapping"/>
  </div>
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

function sendMessage(msg) {
      const request = new XMLHttpRequest();
      request.open("POST", webhookURL);

      request.setRequestHeader('Content-type', 'application/json');

      const params = {
        username: "Micha",
        avatar_url: "",
        content: msg
      }
      request.send(JSON.stringify(params));
    }

export default function HomePage() {
 return(<Home></Home>)
}