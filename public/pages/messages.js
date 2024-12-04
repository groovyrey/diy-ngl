import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import * as Config from '/data/app_configurations'
import {navigate, showNotif} from '/app'


function timeAgo(firebaseTimestamp) {
	const now = new Date();
	const timestampDate = firebaseTimestamp.toDate(); // Convert Firebase Timestamp to JS Date
	const diffInSeconds = Math.floor((now - timestampDate) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	} else if (diffInSeconds < 3600) {
		const minutes = Math.floor(diffInSeconds / 60);
		return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
	} else if (diffInSeconds < 86400) {
		const hours = Math.floor(diffInSeconds / 3600);
		return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
	} else if (diffInSeconds < 2592000) { // Less than 30 days
		const days = Math.floor(diffInSeconds / 86400);
		return `${days} day${days !== 1 ? 's' : ''} ago`;
	} else if (diffInSeconds < 31536000) { // Less than 1 year
		const months = Math.floor(diffInSeconds / 2592000); // Approximate month as 30 days
		return `${months} month${months !== 1 ? 's' : ''} ago`;
	} else {
		const years = Math.floor(diffInSeconds / 31536000); // Approximate year as 365 days
		return `${years} year${years !== 1 ? 's' : ''} ago`;
	}
}

export class MessageContainer extends React.Component{
	constructor(props){
		super(props)
	};
	
	deleteMessage (id, from){
    	const element = document.querySelector(`#${id}`).parentElement
     const modal = new bootstrap.Modal("#delModal",{keybaord:false})
		   const title = document.querySelector("#deltitle")
		   const body = document.querySelector("#delbody")
		   const delbtn = document.querySelector("#delete")
		  
     if (modal){
     	title.innerText="System"
     	body.innerText=`Confirm to delete this message from ${from!=""?from:'Anonymous'}?`
     	modal.show()
     	delbtn.onclick=()=>{
     		const check = Data.deleteDocument("maindata", id)
     		modal.hide()
     		if (check) {
     			showNotif('System', `${id} deleted`)
     			element.remove()
     		} else {
     			showNotif('Error', 'Failed to delete message')
     		}
     	}
     }
    }
	
	render(){
		return (
			   <div className="card m-3">
	      <button id={this.props.id} hidden={this.props.del?false:true} onClick={()=>this.deleteMessage(this.props.id, this.props.sender)} type="button"
	      className="btn text-danger position-absolute bottom-0 end-0" ><span className="bi-trash-fill"/></button>
	      
        <div className="card-body">
  <h5 className="card-title"><span className={`bi-${this.props.sender!=""?"person-fill":"question-lg"}`}/> {this.props.sender!=""?this.props.sender:'Anonymous'}</h5>
             <p className="card-text text-secondary">{this.props.message}</p>
        </div>
        <div className="card-footer">
         <small> <code className="text-secondary"> <span className={`bi-${this.props.private?"lock-fill":"unlock-fill"} text-${this.props.private?'danger':'secondary'}`}/> {timeAgo(this.props.date)}</code></small>
          </div>
       </div>
		)
	}
}


class Messages extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state to store fetched data
        this.state = {
            messages: [] // Holds the fetched data
        };
    }
    // Fetch data after component mounts
    componentDidMount() {
        // Call async function and update state
        Data.readCollection("maindata").then((data) => {
            this.setState({ messages: data.filter(msg=>msg.data.private==false) });
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    render() {
    	let count = 0
        return (
          <div className="container p-1">
             <div id="home-page" className="p-5 m-0 text-dark text-center fw-light bg-light rounded">
              <h1 className="fw-light display-4">{this.props.title}<span className="bi-envelope-open-fill"></span></h1>
               <p className="text-secondary">{this.props.text}</p>
                </div>
           {this.state.messages.map((item) => {
           const Msgdate = new Date(item.data.date.seconds*1000)
           const time = Msgdate.getHours()+':'+Msgdate.getMinutes()
           const format = `${Msgdate.toDateString()} | ${time}`
           count++
           return(
           <MessageContainer key={count} del={false} id={item.id} sender={item.data.sender} message={item.data.message} private={item.data.private} date={item.data.date}/>
               )})}
            </div>
        );
    }
}

export default function MessagesPage() {
    return (
        <Messages title="Public Messages " text="Messages section, only public messages will appear here" />
    );
}