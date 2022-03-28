import React, {useEffect,useState} from "react";
import Doggo from "./Doggo";
import DogDetails from "./DogDetails";



function App() {

  const [dogs, setDogs] = useState([])
  const [currentDog, setCurrentDog] = useState({})
  const [filtered, setFiltered] = useState(false)

  useEffect(() => {
      fetch('http://localhost:3001/pups')
          .then(resp => resp.json())
          .then(dogData => {
                  setDogs(dogData)
          })
  }, [])

  function handleIsGoodDog(dogObj){
    console.log(dogObj)
    fetch(`http://localhost:3001/pups/${dogObj.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(dogObj)
    }).then(resp => resp.json())
      .then(resp => {
    const updatedDogList = [...dogs].map(dog => {
      if(dog.id === dogObj.id){
        return dogObj
    }else{
      return dog
      }
    })
    setDogs(updatedDogList)
    })
  }

  function handleFilter(){
    setFiltered(!filtered)
    if(!filtered){
      const filterDogs=dogs.filter(dog => dog.isGoodDog === true)
      setDogs(filterDogs)
    }else{
      fetch('http://localhost:3001/pups')
      .then(resp => resp.json())
      .then(dogData => {
              setDogs(dogData)
      })
    }
  }
  function findDog(dogObj){
    setCurrentDog(dogObj)
  }

  const dogsArray = dogs.map((dog, id) => {
      return <Doggo dog={dog} key={id} findDog={findDog} />
  })

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>Filter good dogs: {filtered? "ON" :"OFF"}</button>
      </div>
      <div id="dog-bar">{dogsArray}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info"><DogDetails 
                              currentDog={currentDog}
                              handleIsGoodDog={handleIsGoodDog}
                            /></div>
      </div>
    </div>
  );
}

export default App;
