import {useState, useEffect} from "react";

import "../styles/handStatus.css";

function HandStatus({ status }) {
    const [state, setState] = useState(status);

    //When status changes, the state changes
    useEffect(() => {
        setState(status);
    }, [status]);

    /*
    * 0- Not connected
    * 1- Connecting
    * 2- Connected*/
    const connectionStatus = () => {
        if (state === 0) {
            return <h1
            style={{
                fontSize: "2rem",
                color: "red"
            }}>○ Not connected</h1>;
        } else if (state === 1) {
            return <h1
                style={{
                    fontSize: "2rem",
                    color: "yellow"
                }}>○ Connecting...</h1>;
        } else if (state === 2) {
            return <h1
                style={{
                    fontSize: "2rem",
                    color: "green"
                }}>○ Connected</h1>;
        } else {
            return <h1
                style={{
                    fontSize: "2rem",
                    color: "black"
                }}>○ Error</h1>;
        }
    };

    return (
        <div className="hand-status-container">
            <h1 className="hand-status-title">Hand Status</h1>
                <div className="status">
                    {connectionStatus()}
                </div>
        </div>
    );
}

export default HandStatus;
