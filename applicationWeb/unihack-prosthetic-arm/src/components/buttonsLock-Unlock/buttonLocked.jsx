import '../../styles/buttonLock.css'

function ButtonLocked({changeButton}) {
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
        changeButton();
    };
    return (
        <button className="btn-lock" data-back="UnLocked"
                data-front="Locked" onClick={() => sendMessage("UL")}></button>
    );
}

export default ButtonLocked;