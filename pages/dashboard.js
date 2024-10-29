import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';
import {MessageContainer} from './messages'
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
<MessageContainer key={item.id} del={true} id={item.id} sender={item.data.sender} message={item.data.message} private={item.data.private} date={format}/>
               ) })}
            </div>
        );
    }
}

export default function DashBoard (){
	return (<DashB title="All messages " text="All messages will appear here with delete button" />)
}