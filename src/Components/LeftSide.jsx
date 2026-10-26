import {useState} from "react";

function LeftSide(props) {
    const [ colorInput, setColorInput ] = useState("");
    const [ clickCt, setClickCt ] = useState(0);
    const [applyThisColor, setApplyThisColor] = useState("red");
    function handleButtonClick() {
        setApplyThisColor(colorInput);
        setClickCt(clickCt + 1);
    }
    return (
        <div>
            <div>
                <h2> Color Picker and Counter </h2>
                <input type='text' className='form-control'
                       placeholder='Enter a color'
                       value={colorInput}
                       onChange={ (e) => setColorInput(e.target.value) }
                >
                </input>
            </div>
            <button className='btn btn-primary'
            onClick={handleButtonClick}>
                Clicked {clickCt} times
            </button>
            <div style={{backgroundColor: applyThisColor, width:'150px'}}>
                Does this background color change
                </div>

        </div>
    );
}

export default LeftSide;