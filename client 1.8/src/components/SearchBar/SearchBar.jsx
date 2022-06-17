import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNamePokemon } from "../../redux/action.pokemons";
import "./SearchStyles.css";

export function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePokemon(name.toLowerCase()));
    setName("");
  }

  return (
    <div class="search-container">
      <input
        value={name}
        class="input-search"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Nombre del pokemon"
      />
      <button class="btn-search" onClick={(e) => handleSubmit(e)} type="submit">
        Buscar
      </button>
    </div>
  );
}
