import '../../styles/buttonLock.css'

function ButtonLocked({changeButton}) {
    return (
        <button className="btn-lock" data-back="UnLocked"
                data-front="Locked" onClick={changeButton}></button>
    );
}

export default ButtonLocked;