import React, { Component } from 'react';
import './App.css';

import RouteData from './data.js';

const AirlineRouteTableRow = ( { route } ) => {
  return (
    <tr>
      <td>{route.airline}</td>
      <td>{route.src}</td>
      <td>{route.dest}</td>
    </tr>
  )
}

const AirlineRoutesTable = ( { routes } ) => {
  return (
    <table>
      <tr>
        <th>Airline</th>
        <th>Source Airport</th>
        <th>Destination Airport</th>
      </tr>
      {routes.map((route) => <AirlineRouteTableRow route={route} /> )}
    </table>
  );
};

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <AirlineRoutesTable
            routes={RouteData.routes}
          />
        </section>
      </div>
    );
  }
}

export default App;