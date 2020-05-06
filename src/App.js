import React, { Component } from 'react';
import './App.css';

import RouteData, { getAirlineById, getAirportByCode } from './data.js';
import Table from './Table';

class App extends Component {

  formatValue(property, value) {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <Table
            className="routes-table"
            columns={columns}
            rows={RouteData.routes}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;