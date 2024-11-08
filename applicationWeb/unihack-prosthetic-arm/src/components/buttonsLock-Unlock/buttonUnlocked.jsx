import '../../styles/buttonUnlock.css'

function ButtonUnlocked({changeButton}) {
    return (
        <button className="btn-unlock" data-back="Locked"
                data-front="Unlocked" onClick={changeButton}></button>
    );
}

export default ButtonUnlocked;