import React from "react";
import * as Data from "/data/data_manager";
import { showNotif } from "/app";

function timeAgo(firebaseTimestamp) {
    const now = new Date();
    const timestampDate = firebaseTimestamp.toDate();
    const diffInSeconds = Math.floor((now - timestampDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute${Math.floor(diffInSeconds / 60) !== 1 ? "s" : ""} ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? "s" : ""} ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? "s" : ""} ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} month${Math.floor(diffInSeconds / 2592000) !== 1 ? "s" : ""} ago`;
    return `${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? "s" : ""} ago`;
}

export const MessageContainer = ({ id, sender, message, private: isPrivate, date, del, onDelete }) => {
    const deleteMessage = () => {
        const modal = new bootstrap.Modal("#delModal", { keyboard: false });
        const title = document.querySelector("#deltitle");
        const body = document.querySelector("#delbody");
        const delbtn = document.querySelector("#delete");

        title.innerText = "System";
        body.innerText = `Confirm to delete this message from ${sender !== "" ? sender : "Anonymous"}?`;
        modal.show();

        delbtn.onclick = async () => {
            const check = await Data.deleteDocument("maindata", id);
            modal.hide();
            if (check) {
                onDelete(id); // Notify the parent to update the state
            } else {
                showNotif("Error", "Failed to delete message");
            }
        };
    };

    return (
        <div className="card m-1 mb-3">
            <button
                id={id}
                hidden={!del}
                onClick={deleteMessage}
                type="button"
                className="btn text-danger position-absolute bottom-0 end-0"
            >
                <span className="bi-trash-fill" />
            </button>

            <div className="card-body">
                <h5 className="card-title">
                    <span className={`bi-${sender !== "" ? "person-fill" : "question-lg"}`} />{" "}
                    {sender !== "" ? sender : "Anonymous"}
                </h5>
                <p className="card-text text-secondary">{message}</p>
            </div>
            <div className="card-footer">
                <small>
                    {" "}
                    <code className="text-secondary">
                        {" "}
                        <span
                            className={`bi-${isPrivate ? "lock-fill" : "unlock-fill"} text-${isPrivate ? "danger" : "secondary"}`}
                        />{" "}
                        {timeAgo(date)}
                    </code>
                </small>
            </div>
        </div>
    );
};