export function validate(input) {
  let errors = {};
  const numberExpresion = /^[0-9]+$/;

  if (!input.nombre) {
    errors.nombre = "el pokemon necesita un nombre para ingresar a la pokedex";
  } else if (input.nombre.search(/^[a-zA-Zñáéíóúü]*$/)) {
    errors.nombre = "solo se admiten letras";
  }
  if (input.nombre.length > 20) {
    errors.nombre = "el nombre no puede ser de mas de 20 letras";
  }
  if (input.vida < 1 || input.vida > 999) {
    errors.vida = "la salud no pude ser inferior a 1 y no puede superar los 999";
  } else if (input.vida.search(numberExpresion)) {
    errors.vida = "solo puedes poner un numero";
  }
  if (input.ataque < 1 || input.ataque > 999) {
    errors.ataque = "el ataque no pude ser inferior a 1 y no puede superar los 999";
  } else if (input.ataque.search(numberExpresion)) {
    errors.ataque ="solo puedes poner un numero";
  }
  if (input.defensa < 1 || input.defensa > 999) {
    errors.defensa = "la defensa no pude ser inferior a 1 y no puede superar los 999";
  } else if (input.defensa.search(numberExpresion)) {
    errors.defensa ="solo puedes poner un numero";
  }
  if (input.velocidad < 1 || input.velocidad > 999) {
    errors.velocidad = "la velocidad no pude ser inferior a 1 y no puede superar los 999";
  } else if (input.velocidad.search(numberExpresion)) {
    errors.velocidad = "solo puedes poner un numero";
  }
  if (input.altura < 1 || input.altura > 999) {
    errors.altura = "la altura no pude ser inferior a 1 y no puede superar los 999";
  } else if (input.altura.search(numberExpresion)) {
    errors.altura = "solo puedes poner un numero";
  }
  if (input.peso < 1 || input.weight > 999) {
    errors.peso = "el peso no pude ser inferior a 1 y no puede superar los 999";
  } else if (input.peso.search(numberExpresion)) {
    errors.peso = "solo puedes poner un numero";
  }
  if (!input.tipos) {
    errors.tipos = "elige almenos un tipo para tu pokemon";
  } else if (input.tipos.length > 2) {
    errors.tipos = "solo puedes poner maximo 2 tipos";
  }
return errors;
}
