import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  filterByTypes,
  orderByName,
  orderByAttack,
  resetDetail,
} from "../../redux/action.pokemons";
import "./AsideStyles.css";

export function Aside() {
  const [, setOrder] = useState("");
  const [, setTypes] = useState("allPokemon");
  const dispatch = useDispatch();
  const totalTypes = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(resetDetail());
  }, [dispatch]);
  function handleReset() {
    window.location.reload();
  }
  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
  }
  function handleFilterByTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    setTypes(e.target.value);
  }
  function handleFilterName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }
  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  return (
    <div>
      <aside class="aside-container">
        <div class= "ordenado">
          <label class="label">Orden: </label>
          <select
            class="select"
            defaultValue="name"
            onChange={(e) => handleFilterName(e)}
          >
            <option class="options" value="name" disabled>
              Nombre
            </option>
            <option class="options" value="aToZ">
              A-Z
            </option>
            <option class="options" value="zToA">
              Z-A
            </option>
          </select>

          <select
            class="select"
            defaultValue="attack"
            onChange={(e) => handleOrderByAttack(e)}
          >
            <option class="options" value="attack" disabled>
              Ataque
            </option>
            <option class="options" value="minToMax">
              Min-Max
            </option>
            <option class="options" value="maxToMin">
              Max-Min
            </option>
          </select>
        </div>

        <div class="filtrado">
          <label class="label">Filtros: </label>
          <select
            class="select"
            defaultValue="allOrigin"
            onChange={(e) => handleFilterOrigin(e)}
          >
            <option class="options" value="allOrigin">
              Todos
            </option>
            <option class="options" value="pokemonApi">
              Pokedex
            </option>
            <option class="options" value="createdPokemon">
              Creados
            </option>
          </select>

          <select
            class="select"
            defaultValue="Types"
            onChange={(e) => handleFilterByTypes(e)}
            id="type-select"
          >
            <option class="options" value="Types" disabled>
              Tipos
            </option>
            <option class="options" value="allTypes">
              Todos
            </option>
            {totalTypes &&
              totalTypes
                .sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((t) => (
                  <option class="options" value={t.name} key={t.name}>
                    {t.name}
                  </option>
                ))}
          </select>
          <button class="btn-reload" onClick={(e) => handleReset(e)}>
            Recargar
          </button>
        </div>
      </aside>
    </div>
  );
}
