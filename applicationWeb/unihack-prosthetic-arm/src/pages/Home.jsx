import ButtonPreset from "../components/buttonPreset.jsx";
import ButtonLocked from "../components/buttonsLock-Unlock/buttonLocked.jsx";
import ButtonUnlocked from "../components/buttonsLock-Unlock/buttonUnlocked.jsx";
import Button from "../components/button.jsx";
import HandStatus from "../components/handStatus.jsx";
import Logo from "../components/logo.jsx";
import ArmRender from "../components/armRender.jsx";

import {useState} from 'react';

import "../styles/Home.css"
import "../styles/HomeJumpingText.css"
import presentation from "./Presentation.jsx";

function Home(){
    const [lockedButton, setLockedButton] = useState(false);

    //Function used to invert the current state of the button in order to
    //show the right one
    const toggleButton = () => {
        setLockedButton(!lockedButton);
    };
    const status = 0;

    return (
        <>
            <div className="container">
                <div className="logo">
                    <Logo />
                </div>
                <div className="lockButton">
                    {lockedButton ? (
                        <ButtonLocked changeButton={toggleButton}/>
                    ) : (
                        <ButtonUnlocked changeButton={toggleButton}/>
                    )}
                </div>

                <div className="presentationButton">
                        <a href="./Presentation"><Button title={"Project presentation"}/></a>

                </div>
                <div className="jumpingText">
                    <span>Aqualix Prosthetic Arm</span>
                </div>
                <div className="handStatus">
                    <HandStatus status={status}/>
                </div>
                <div className="buttonPreset">
                    <ButtonPreset/>
                </div>
                <div className="ArmRender">
                    <div style={{width: '50vw', height: '50vh'}}>
                        <ArmRender modelUrl="public/test.glb"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;