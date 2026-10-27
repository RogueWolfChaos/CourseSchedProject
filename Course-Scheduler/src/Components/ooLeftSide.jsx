import {useState} from "react";

function LeftSide(props) {

    return (
        <div>
            <h2> Size:{menu.length} </h2>
            <select className='form-select mt-3'
                    value={selectedId}
                    onChange={ (e) => setSelectedId( Number(e.target.value) ) }

            >
                {menu.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <p className='mt-3'> {selectedItem.name} at Cost ${selectedItem.cost}</p>
        </div>
    );
}
export default LeftSide;