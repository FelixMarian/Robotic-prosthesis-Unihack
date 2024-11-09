import React from "react";
import '../styles/buttonPreset.css';

function Button({ title, onClick }) {
    return (
        <button type="button" className="btnPreset" onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;
