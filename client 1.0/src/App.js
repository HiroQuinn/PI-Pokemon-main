import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./componentes/login/login";
import './App.css';

function App() {
  return (
    <div>
    <Switch>
        <Route exact path="/" component={<Login />} />
        {/* <Route exact path="/pokemons/" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<Details />} />
        <Route exact path="/create" element={<Create />} />
      <Route path="*" element={<ErrorPage />} /> */}sss
    </Switch>
      </div>
  );
}

export default App;
