import './Name.css';
function Name({firstName,middleInitial,lastName}){
    return(
        <div className="name">
            <h1>{firstName}{middleInitial}{lastName}</h1>
        </div>
    )
    }
    export default Name;