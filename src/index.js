import React from "react";
import ReactDOM from "react-dom";
import { useAsync } from "react-async";

import "./styles.css";

const heroes = () =>
  fetch("https://swapi.co/api/people")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());

function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: heroes });
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) console.log(data);

  return data.results.map(function(person) {
    return (
      <ul>
        <li>Name: {person.name}</li>
        <li>Height: {person.height}</li>
        <li>Hair Color: {person.hair_color}</li>
      </ul>
    );
  });
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
