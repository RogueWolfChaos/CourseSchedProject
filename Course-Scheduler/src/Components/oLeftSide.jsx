import {useState} from "react";

function LeftSide(props) {
    const [ isHere, setIsHere ] = useState( true )
    return (
        <div>
        Hello there
            <p> {isHere ? 'We are Here':"We are not here"}</p>
            <button className={ isHere ? 'btn btn-primary' :
                                'btn btn-danger' }
                onClick={
                () => setIsHere(!isHere)
            }>
                Toggle me!
            </button>

        </div>
    );
}
export default LeftSide;