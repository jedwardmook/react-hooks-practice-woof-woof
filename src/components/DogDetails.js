import React, {useState, useEffect} from "react";


function DogDetails({currentDog, handleIsGoodDog}){
    const [isGoodDog, setIsGoodDog] = useState(false)

    useEffect(() => {
        setIsGoodDog(currentDog.isGoodDog)
    }, [currentDog])

    function handleClick(){
        setIsGoodDog(!isGoodDog)
        const updateDog= {
            id: currentDog.id,
            image: currentDog.image,
            name: currentDog.name,
            isGoodDog: isGoodDog
            }
        handleIsGoodDog(updateDog)
    }

    return <div id="dog-info">
            <img src={currentDog.image} alt={currentDog.name} />
            <h2>{currentDog.name}</h2>
            {currentDog.isGoodDog? <button onClick={() => handleClick(currentDog)}>Good Dog!</button> :
            <button onClick={() => handleClick(currentDog)}>Bad Dog!</button>}
    </div>

}

export default DogDetails