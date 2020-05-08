import React from 'react';
import './App.css';

import { Route,Switch } from 'react-router-dom'

import Nasabah from './components/nasabah/nasabah'
import NasabahDetail from './components/nasabah/nasabahDetail'


class App extends React.Component{
  render(){
    return(
      <Switch>
         <Route path='/' component={Nasabah} exact></Route>
         <Route path="/detailNasabah/:id" component={NasabahDetail}></Route>

      </Switch>
    )
  }
}
export default App;
