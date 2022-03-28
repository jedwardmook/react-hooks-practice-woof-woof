import React from "react";

function Doggo({dog, findDog}){
    const {id, name, isGoodDog, image} = dog

    return <div>
        <span id="dog-bar" onClick={() => findDog(dog)}>{name}</span>
    </div>
}


export default Doggo;