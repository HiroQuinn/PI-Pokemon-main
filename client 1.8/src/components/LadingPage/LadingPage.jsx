import React from "react";
import { Link } from "react-router-dom";
import "./LadingStyles.css";
import imgLanding from "../../img/IMAGE_LANDING_PNG.png";

export function LandingPage() {
  return (
    <div className="landing-container">
      <img class="img" src={imgLanding} alt="" />
    <div>
    </div>
      <Link to="/pokemons/">
        <button className="btn">Bienvenido a pokeapi</button>
      </Link>
    </div>
  );
}
