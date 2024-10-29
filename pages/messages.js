import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate, showNotif} from '/app'


export class MessageContainer extends React.Component{
	constructor(props){
		super(props)
	};
	
	deleteMessage (event){
    	const id = event.target.value
    	const element = event.target.parentElement
     const check = Data.deleteDocument("maindata",id)
     
    	if (check){
    		element.remove()
    		showNotif('System',`${id} deleted`)
    	} else {
    		showNotif('System','failed to delete message')
    	}
    }
	
	render(){
		return (
			   <div key={this.props.id} className="text-bg-info card m-1">
	      <button hidden={this.props.del?false:true} onClick={this.deleteMessage} type="button" className="btn-close position-absolute top-0 end-0 m-2" aria-label="Close" value={this.props.id}></button>
        <div className="card-body">
          <h5 className="card-title"><span className={`bi-${this.props.sender!=""?"person-fill":"question-lg"}`}/> {this.props.sender!=""?this.props.sender:'Anonymous'}</h5>
             <p className="card-text">{this.props.message}</p>
                        </div>
           <small> <code style={{color:'black'}} className="p-2">{this.props.date}</code><span style={{color:this.props.private?'red':'black'}} className={`bi-${this.props.private?"lock-fill":"unlock-fill"}`}/></small>
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
        return (
          <div className="container p-1">
             <div id="home-page" className="p-5 m-0 text-light text-center bg-dark rounded">
              <h1 className="">{this.props.title}<span className="bi-envelope-open-fill"></span></h1>
               <p className="">{this.props.text}</p>
                </div>
           {this.state.messages.map((item) => {
           const Msgdate = new Date(item.data.date.seconds*1000)
           const time = Msgdate.getHours()+':'+Msgdate.getMinutes()
           const format = `${Msgdate.toDateString()} | ${time}`
           return(
           <MessageContainer del={false} key={item.id} id={item.id} sender={item.data.sender} message={item.data.message} private={item.data.private} date={format}/>
               )})}
            </div>
        );
    }
}

export default function MessagesPage() {
    return (
        <Messages title="Messages " text="Messages section, only public messages will appear here" />
    );
}