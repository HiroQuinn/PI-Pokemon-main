import axios from "axios"
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_BY_NAME_POKEMON = "GET_BY_NAME_POKEMON";
export const GET_DETAILS = "GET_DETAILS";
export const POST_POKEMON = "POST_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_BY_ORIGEN = "FILTER_BY_ORIGEN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const RESET = "RESET";
export const RESET_DETAIL = "RESET_DETAIL";
export const SET_LOADING = "SET_LOADING";
export const URL_ALL_POKEMON = "http://localhost:3001/api/pokemons/"
export const URL_POST_POKEMON = "http://localhost:3001/api/pokemons/create"
export const URL_TYPES = "http://localhost:3001/api/types"

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      let jsonPokemon = await axios.get(URL_ALL_POKEMON);
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: jsonPokemon.data});
    } catch (error) {
      console.log(error.message);
      return alert(
        "Error al conectar con la pokedex... algo me dice que alguien perdera su trabajo"
      );
    }
  };
}

export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      if (name.search(/^[A-Z]+$/i)) {
        return alert("El nombre a buscar solo debe contener letras.");
      }

      return dispatch({
        type: GET_BY_NAME_POKEMON,
        payload: name,
      });
    } catch (error) {
      return alert(`No existe un Pokémon llamado ${name} pero puedes crearlo :3`);
    }
  };
}

export function getPokemonId(id) {
  return async function (dispatch) {
    try {
      let jsonPokemonID = await axios.get(
        `${URL_ALL_POKEMON}${id}`
      );
      console.log(jsonPokemonID.data)
      return dispatch({
        type: GET_DETAILS,
        payload: jsonPokemonID.data,
      });
    } catch (error) {
      return alert(`No existe ningun Pokemon con el ID ${id}`);
    }
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const pokemonCreated = await axios.post(URL_POST_POKEMON, payload);
      return dispatch({
        type: POST_POKEMON,
        payload: pokemonCreated.data,
      });
    } catch (error) {
      console.log(error.message);
      return alert("fracaso la creacion del pokemon, intentalo nuevamente Arceus y Mew te esperan");
    }
  };
}


export function reset() {
  return {
    type: RESET,
  };
}

export function resetDetail() {
  return {
    type: RESET_DETAIL,
  };
}
export function filterByOrigin(payload) {
  try {
    return {
      type: FILTER_BY_ORIGEN,
      payload: payload,
    };
  } catch (error) {
    console.log(error.message);
    return alert(
      "Hubo un error al listar los Pokemons por origen... prueba otra vez, si falla nuevamente, reportalo!"
    );
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function setLoading(value) {
  return {
    type: SET_LOADING,
    payload: value,
  };
}
export function getTypes() {
  return async function (dispatch) {
    try {
      let jsonTypes = await axios.get(URL_TYPES);
      return dispatch({
        type: GET_TYPES,
        payload: jsonTypes.data,
      });
    } catch (error) {
      console.log(error);
      return alert(
        "Algo salio mal... Que raro... en definitiva alguien tendra un mal día"
      );
    }
  };
}


export function filterByTypes(payload) {
  try {
    return {
      type: FILTER_BY_TYPES,
      payload,
    };
  } catch (error) {
    console.log(error);
    return alert("Hubo un error al listar los Pokemons por tipos... prueba otra vez, si falla nuevamente, reportalo!");
  }
}

