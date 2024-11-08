import React from "react";
import '../styles/buttonPreset.css';
import Button from "./button.jsx";

function ButtonPreset(){
    return (
        <>
            <div className="btn-group">
                <Button title={"Fodoka"} />
                <Button title={"Are"}/>
                <Button title={"Motorul"}/>
                <Button title={"Mic"}/>
            </div>
        </>
    )
}

export default ButtonPreset;