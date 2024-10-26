import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/data/data_manager';


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
            this.setState({ messages: data });
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
           {this.state.messages.map((item) => (
            <div hidden={item.data.private} key={item.id} className="card m-1">
                <h5 className="card-header"><span className={`bi-${item.data.sender!=""?"person-fill":"question-lg"}`}/> {item.data.sender!=""?item.data.sender:'Anonymous'}</h5>
                   <div className="card-body">
                            <p>{item.data.message}</p>
                        </div>
                     <small> <code style={{color:'gray'}} className="card-text m-2">{item.data.date}</code><span style={{color:'gray'}} className={`bi-${item.data.private?"lock-fill":"unlock-fill"}`}/></small>
                    </div>
                ))}
            </div>
        );
    }
}

export default function MessagesPage() {
    return (
        <Messages title="Messages " text="Messages section, Only public messages will appear here" />
    );
}