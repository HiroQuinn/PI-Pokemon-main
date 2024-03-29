import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import LogoPokemon from "../../img/LogoPokemon.png";
import "./NavbarStyles.css";

export function NavBar() {
  return (
    <div class="nav-container">
      <nav>
        <div class="all-li">
          <Link to="/pokemons/" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Inicio</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Crear pokemon</li>
          </Link>
        </div>
        <div class="branding">
          <img class="logo-pokemon" src={LogoPokemon} alt="Pokemon App Logo" />
        </div>
        <div class="search-container">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
}
