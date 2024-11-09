import React from "react";
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

    return (
        <div className="btn-group">
            <Button title="Fodoka" onClick={() => sendMessage("P1")} />
            <Button title="Are" onClick={() => sendMessage("P2")} />
            <Button title="Motorul" onClick={() => sendMessage("P3")} />
            <Button title="Mic" onClick={() => sendMessage("P4")} />
        </div>
    );
}

export default ButtonPreset;
