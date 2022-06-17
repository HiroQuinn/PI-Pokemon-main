import { NavBar } from "../Nav/NavBar";
import { AllPokemon } from "../AllPokemons/AllPokemons.jsx";
import { Aside as Filter } from "../Aside/Aside";
import imgLanding from "../../img/LadingPage.jpg";


export function Home() {
  return (
    <div>
       <div>
        <img className="img" src={imgLanding} alt="" />
      </div>
      <NavBar />
      <Filter />
      <AllPokemon />
    </div>
  );
}

window.scrollTo(0, 0);
