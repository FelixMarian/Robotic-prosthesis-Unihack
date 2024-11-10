import React from 'react';
import '../styles/scrollSnapComponents.css';

function ScrollSnapComponent() {
    return (
        <div className="scroll-container">
            <section className="scroll-section" style={{backgroundColor: '#3e027f', color: "white"}}>
                <h2>Medical Robotic Arm System Documentation</h2>
                <p>This documentation provides a comprehensive overview of the Medical Robotic Arm System, detailing its
                    purpose, functionalities, technical features, and safety measures designed to enhance autonomy for
                    users with limited hand mobility.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#26014b', color: "white"}}>
                <h1>Purpose</h1>
                <p>The robotic arm aims to assist individuals who lack a functional hand, enabling them to perform daily
                    tasks independently. With two operating modes: <br></br><br></br>- gesture mirroring, which mimics a healthy hand’s
                    movements<br></br> - control through a web interface the system seamlessly integrates presets into daily
                    routines to improve mobility and self-sufficiency.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#654eef', color: "white"}}>
                <h1>Core Functionalities</h1>
                <p>The system offers key functionalities, including Gesture Mirroring and Manual Control, tailored to
                    the unique needs of users for an adaptable experience.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#654eef', color: "white"}}>
                <h1>Gesture Mirroring</h1>
                <p>Using image processing, this feature mirrors the user’s healthy hand movements in real time, creating a
                    seamless, natural experience and enabling responsive interactions with the environment.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#654eef', color: "white"}}>
                <h1>Manual Control</h1>
                <p>A Wi-Fi-enabled web interface allows users to control the arm directly, featuring four customizable
                    movement presets and a lock function to secure the arm in place for stability.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#f5925e', color: "white"}}>
                <h1>Lock Button</h1>
                <p>This feature holds the arm in a fixed position, allowing users to complete tasks that require a
                    steady hold, reducing strain and maintaining stability over extended periods.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#5717a0', color: "white"}}>
                <h1>Technical Specifications</h1>
                <p>The arm is equipped with precision motors and joints for smooth, natural movements. Made from
                    lightweight and durable materials, it ensures long-term comfort and safety for the
                    user, even with prolonged wear.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#efba3d', color: "white"}}>
                <h1>Safety and Reliability</h1>
                <p>A connection indicator within the web app notifies users of any disconnection, ensuring continuous
                    monitoring and prompt action to maintain safe and reliable operation.</p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#863be1', color: "white"}}>
                <h1>Conclusion</h1>
                <p>This robotic arm system merges advanced technologies with user-centered design, empowering
                    individuals to regain autonomy in their daily lives, enhancing their quality of life and
                    independence.</p>
            </section>

        </div>
    );
}

export default ScrollSnapComponent;
