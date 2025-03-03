import React from "react";
import { MessageContainer } from "./container.jsx";
import * as Data from "/data/data_manager";

class DashB extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [], // Holds all fetched messages
			currentPage: 1, // Current page for pagination
			messagesPerPage: 5, // Number of messages per page
		};
	}

	componentDidMount() {
		Data.readCollection("maindata")
			.then((data) => {
				this.setState({ messages: data });
			})
			.catch((error) => console.error("Error fetching data:", error));
	}

	// Handle deletion and update state
	handleDelete = (id) => {
		this.setState((prevState) => ({
			messages: prevState.messages.filter((message) => message.id !== id),
		}));
	};

	// Change page
	changePage = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	renderPagination = (totalPages, currentPage) => {
        const visiblePages = 3; // Number of pages to show before and after current page
        const pages = [];

        // Add first page and ellipsis if needed
        if (currentPage > visiblePages + 1) {
            pages.push(1, "...");
        }

        // Add range of pages around the current page
        for (
            let i = Math.max(1, currentPage - visiblePages);
            i <= Math.min(totalPages, currentPage + visiblePages);
            i++
        ) {
            pages.push(i);
        }

        // Add ellipsis and last page if needed
        if (currentPage < totalPages - visiblePages) {
            pages.push("...", totalPages);
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => this.changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>

                    {pages.map((page, index) =>
                        page === "..." ? (
                            <li key={index} className="page-item disabled">
                                <span className="page-link">{page}</span>
                            </li>
                        ) : (
                            <li
                                key={index}
                                className={`page-item ${page === currentPage ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => this.changePage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        )
                    )}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => this.changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    render() {
        const { messages, currentPage, messagesPerPage } = this.state;

        // Pagination calculations
        const totalMessages = messages.length;
        const totalPages = Math.ceil(totalMessages / messagesPerPage);
        const indexOfLastMessage = currentPage * messagesPerPage;
        const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
        const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

        return (
            <div className="container p-1">
                <div id="home-page" className="p-5 m-0 text-dark text-center fw-light bg-light rounded">
                    <h1 className="fw-light display-4">
                        {this.props.title}
                        <span className="bi-envelope-open-fill"></span>
                    </h1>
                    <p className="text-secondary">{this.props.text}</p>
                </div>

                {/* Render messages for the current page */}
                {currentMessages.map((item) => (
                    <MessageContainer
                        key={item.id}
                        del={true}
                        id={item.id}
                        sender={item.data.sender}
                        message={item.data.message}
                        private={item.data.private}
                        date={item.data.date}
                        onDelete={this.handleDelete}
                    />
                ))}

                {/* Render pagination */}
                {totalPages > 1 && this.renderPagination(totalPages, currentPage)}
            </div>
        );
    }
}


export default function DashBoard() {
    return <DashB title="All Messages" text="All messages will appear here with delete button" />;
}