import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/action.pokemons";
import imgError from "../../img/error_sad.gif";
import "./ErrorAlerStyles.css";

export function ErrorAlert({ msg = "Error. Vuelve al inicio", code }) {
  const dispatch = useDispatch();

  function handleGoHome() {
    dispatch(setLoading(true));
  }

  return (
    <div class="error_container">
      <img class="gifPikachu" src={imgError} alt="img error" />
      <span class="errorCode">{code}</span>
      <p class="error">Error</p>
      <span class="spanError">{msg}</span>
      <div onClick={handleGoHome()}>
        <Link to="/pokemons/">
          <button class="btn-goHome">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
