import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {navigate, showNotif} from '/app'

class DashB extends React.Component {
	constructor(props) {
        super(props);
        // Initialize state to store fetched data
        this.state = {
            messages: []// Holds the fetched data
        };
    }
    // Fetch data after component mounts
    deleteMessage (event){
    	const id = event.target.value
    	const element = event.target.parentElement
     const check = Data.deleteDocument("maindata",id)
     
    	if (check){
    		element.style.display='none'
    		showNotif('System',`${id} deleted`)
    	} else {
    		showNotif('System','failed to delete message')
    	}
    }
    
    componentDidMount() {
        // Call async function and update state
        Data.readCollection("maindata").then((data) => {
            this.setState({ messages: data})//.filter(msg=>msg.data.private==true) });
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    render() {
        return (
          <div className="container p-1">
             <div id="home-page" className="p-5 m-0 text-light text-center bg-dark rounded">
              <h1 className="">{this.props.title}<span className="bi-database-fill-lock"></span></h1>
               <p className="">{this.props.text}</p>
                </div>
           {this.state.messages.map((item) => {
           const Msgdate = new Date(item.data.date.seconds*1000)
           const time = Msgdate.getHours()+':'+Msgdate.getMinutes()
           const format = `${Msgdate.toDateString()} | ${time}`
           return (
            <div key={item.id} className="text-bg-info card m-1">
             <button onClick={this.deleteMessage} type="button" className="btn-close position-absolute top-0 end-0 m-2" aria-label="Close" value={item.id}></button>
              <div className="card-body">
                 <h5 className="card-title"><span className={`bi-${item.data.sender!=""?"person-fill":"question-lg"}`}/> {item.data.sender!=""?item.data.sender:'Anonymous'}</h5>
                    <p>{item.data.message}</p>
                        </div>
                     <small> <code style={{color:'black'}} className="card-text m-2">{format}</code><span style={{color:`${item.data.private?'red':'black'}`}} className={`bi-${item.data.private?"lock-fill":"unlock-fill"}`}/></small>
                    </div>
               ) })}
            </div>
        );
    }
}



export default function DashBoard (){
	return (<DashB title="Private Messages " text="Only private messages will appear here" />)
}