import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';

class DashB extends React.Component {
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
            this.setState({ messages: data.filter(msg=>msg.data.private==true) });
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
            <div hidden={item.data.private?false:true} key={item.id} className="card m-1">
                <h5 className="text-bg-dark card-header"><span className={`bi-${item.data.sender!=""?"person-fill":"question-lg"}`}/> {item.data.sender!=""?item.data.sender:'Anonymous'}</h5>
                   <div className="card-body">
                            <p>{item.data.message}</p>
                        </div>
                     <small> <code style={{color:'gray'}} className="card-text m-2">{format}</code><span style={{color:'gray'}} className={`bi-${item.data.private?"lock-fill":"unlock-fill"}`}/></small>
                    </div>
               ) })}
            </div>
        );
    }
}



export default function DashBoard (){
	return (<DashB title="Private Messages " text="Only private messages will appear here" />)
}