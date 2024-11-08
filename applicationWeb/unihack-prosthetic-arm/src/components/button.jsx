import React from "react";
import '../styles/buttonPreset.css';

function Button( {title} ) {
    return (
        <button type="button" className="btnPreset">{title}</button>
    )
}

export default Button;