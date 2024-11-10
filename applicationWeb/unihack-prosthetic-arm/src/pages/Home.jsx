import ButtonPreset from "../components/buttonPreset.jsx";
import ButtonLocked from "../components/buttonsLock-Unlock/buttonLocked.jsx";
import ButtonUnlocked from "../components/buttonsLock-Unlock/buttonUnlocked.jsx";
import Button from "../components/button.jsx";
import HandStatus from "../components/handStatus.jsx";
import Logo from "../components/logo.jsx";
import ArmRender from "../components/armRender.jsx";

import { useState, useEffect } from 'react';
import "../styles/Home.css";
import "../styles/HomeJumpingText.css";

function Home() {
    const [lockedButton, setLockedButton] = useState(false);
    const [status, setStatus] = useState(0); // Starea de conexiune

    // We check for the stat every 3 sec to update the status
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await fetch('http://localhost:5000/api/status'); // Endpoint pentru status
                const data = await response.json();
                setStatus(data.status); // Set the status
            } catch (error) {
                console.error("Eroare la obținerea statusului:", error);
                setStatus(3); // 3 = Error
            }
        }, 3000); // 3 seconds timeout

        return () => clearInterval(intervalId);
    }, []);

    // Function to toggle lock/unlock button status
    const toggleButton = () => {
        setLockedButton(!lockedButton);
    };

    return (
        <>
            <div className="container">
                <div className="logo">
                    <Logo />
                </div>
                <div className="lockButton">
                    {lockedButton ? (
                        <ButtonLocked changeButton={toggleButton} />
                    ) : (
                        <ButtonUnlocked changeButton={toggleButton} />
                    )}
                </div>

                <div className="presentationButton">
                    <a href="./Presentation"><Button title={"Project presentation"} /></a>
                </div>
                <div className="jumpingText">
                    <span>Aqualix Prosthetic Arm</span>
                </div>
                <div className="handStatus">
                    <HandStatus status={status} />
                </div>
                <div className="buttonPreset">
                    <ButtonPreset />
                </div>
                <div className="ArmRender">
                    <div style={{ width: '50vw', height: '60vh' }}>
                        <ArmRender modelUrl="public/Handv1.glb" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
