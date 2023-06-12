import { useState, useEffect } from "react";

function App() {
  const [api, getApi] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextApi, getNextAPi] = useState("");
  const [prevApi, getPrevAPi] = useState("");

  const [pokeData, getPokeData] = useState([]);

  const getPokeApi = () => {
    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        // getPokeData(res.results);
        getNextAPi(res.next);
        getPrevAPi(res.previous);
        getPokeData(res.results.map((poke) => ({ ...poke, image: "" })));
      });
  };

  const getPokeImg = (index, pokeUrl) => {
    return fetch(pokeUrl)
      .then((res) => res.json())
      .then((res) => {
        const updatedPokeData = [...pokeData];
        updatedPokeData[index].image = res.sprites.front_default;
        getPokeData(updatedPokeData);
      });
  };

  useEffect(() => {
    getPokeApi();
  }, [api]);

  return (
    <>
      <Heading />

      <div className="list">
        {pokeData.map((value, index) => {
          if (!value.image) {
            getPokeImg(index, value.url);
          }
          return (
            <div key={value.name}>
              <img src={value.image} alt="asd" />
              <h4 className="poke-name">{value.name}</h4>
            </div>
          );
        })}
      </div>

      <div className="button-class">
        {prevApi && (
          <button
            className="this-button"
            type="button"
            onClick={() => getApi(prevApi)}
          >
            Prev
          </button>
        )}
        {nextApi && (
          <button
            className="this-button"
            type="button"
            onClick={() => getApi(nextApi)}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

const Heading = () => {
  return (
    <div className="title">
      <h1>Pokemon List</h1>
    </div>
  );
};
export default App;
