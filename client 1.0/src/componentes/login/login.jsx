import React from "react";
import { Link } from "react-router-dom";
//import "./LadingStyles.css";
import imgLogin from "../../imagenes/Login.png";

export function Login() {
  return (
    <div className="login-container">
      <img class="img" src={imgLogin} alt="" />
    <div>
    </div>
      <Link to="/pokemons/">
        <button className="btn">Bienvenido</button>
      </Link>
    </div>
  );
}