import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import Detail from './components/Detail';
import styled from 'styled-components';
import React from 'react';

// const H1Card = styled.h1`
// margin-top: 3%;
// background-color: white;
// border-radius: 10px;
// border: solid 0px;
// display: inline-block;
// `


function App() {
  return ( 
  <BrowserRouter>
    <div className="App" style={{ padding: '25px' }}>
      <h1>Hello, you are in App.js</h1>
      <Switch>
        <Route exact path='/' component = {LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/videogame' component={CreateVideogame}/>
        <Route exact path='/videogame/:id' component={Detail}/>
        <Route path='*' componet={LandingPage}/>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
