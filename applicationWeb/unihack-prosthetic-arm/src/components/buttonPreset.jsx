import React, {useEffect} from "react";
import net from 'net';
import '../styles/buttonPreset.css';
import Button from "./button.jsx";

function ButtonPreset() {



    const sendMessage = async (message) => {
        try {
            const response = await fetch("http://localhost:5000/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                console.log("Mesaj trimis cu succes!");
            } else {
                console.error("Eroare la trimiterea mesajului.");
            }
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            sendMessage("");
        }, 1000); // 1000 ms timer

        // Curățăm intervalul la demontarea componentului
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="btn-group">
            <Button title="Thumbs Up" onClick={() => sendMessage("P1")} />
            <Button title="Peace" onClick={() => sendMessage("P2")} />
            <Button title="Fist" onClick={() => sendMessage("P3")} />
            <Button title="Palm" onClick={() => sendMessage("P4")} />
        </div>
    );
}

export default ButtonPreset;
