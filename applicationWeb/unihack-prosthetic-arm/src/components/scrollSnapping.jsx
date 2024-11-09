import React from 'react';
import '../styles/scrollSnapComponents.css';

function ScrollSnapComponent() {
    return (
        <div className="scroll-container">
            <section className="scroll-section" style={{backgroundColor: '#ffadad'}}>
                <h3>Documentation for the Control and Use of the Medical Robotic Arm System</h3>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#ffd6a5'}}>
                <h1>Introduction</h1>
                <p>The medical robotic arm is a device designed to assist individuals
                    who lack a hand, aiming to enhance their mobility and independence.
                    This system enables users to perform daily activities through a robotic
                    prosthesis capable of mirroring the gestures of their healthy hand.
                    Alternatively, the device can be manually operated via an intuitive
                    web application that provides precise and personalized movement control.
                    Additionally, the robotic arm features a position-locking function,
                    referred to as the “lock button,” which maintains the arm in a set posture,
                    offering stability for tasks that require prolonged hand positioning.
                </p>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#fdffb6'}}>
                <h1>Functionalities Description</h1>
            </section>
            <section className="scroll-section" style={{backgroundColor: '#fdffb6'}}>

                <p>Mirroring Healthy Hand Gestures The robotic arm can track and replicate movements made by the user’s healthy hand through advanced motion sensors. These sensors detect joint angles and transmit this data to the robotic arm, allowing it to reproduce gestures in real-time. This functionality facilitates everyday tasks, such as gripping objects, rotational movements, or lifting and moving small items.

                    Manual Control via Web Application For cases where users seek personalized control, the web application provides a detailed interface that allows manipulation of the robotic arm’s movements without relying on the healthy hand. Through a Bluetooth connection, the application enables users to adjust each component of the robotic arm, offering added flexibility in usage. Key features of the application include:</p>
            </section>
        </div>
    );
}

export default ScrollSnapComponent;
