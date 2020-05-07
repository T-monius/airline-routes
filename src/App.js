import React, { Component } from 'react';
import './App.css';

import RouteData, { getAirlineById, getAirportByCode } from './data.js';
import Table from './components/Table';

class App extends Component {
  state = {
    routes: this.limitedRoutes(),
    startingRouteIdx: 0,
    routeLimit: 25,
  };

  formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  };

  limitedRoutes(startingRouteIdx=0, routeLimit=25) {
    const endingRouteIdx = startingRouteIdx + routeLimit;
    return RouteData.routes.slice(startingRouteIdx, endingRouteIdx);
  };

  totalRoutes = () => {
    return RouteData.routes.length;
  };

  handlePreviousClick = (_) => {
    const newStartingIdx = this.state.startingRouteIdx - this.state.routeLimit;
    this.setState({
      routes: this.limitedRoutes(newStartingIdx, this.state.routeLimit),
      startingRouteIdx: newStartingIdx,
    });
  };

  handleNextClick = (_) => {
    const newStartingIdx = this.state.startingRouteIdx + this.state.routeLimit;
    this.setState({
      routes: this.limitedRoutes(newStartingIdx, this.state.routeLimit),
      startingRouteIdx: newStartingIdx,
    });
  };

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
          <Table
            columns={columns}
            rows={this.state.routes}
            format={this.formatValue}
          />
          <p>Showing {this.state.startingRouteIdx}-{this.state.startingRouteIdx + this.state.routeLimit} of {this.totalRoutes()} routes.</p>
          <div>
            <button onClick={this.handlePreviousClick}
                    disabled={(this.state.startingRouteIdx - this.state.routeLimit) < 0}>
              Previous Page
            </button>
            <button onClick={this.handleNextClick}
                    disabled={this.state.startingRouteIdx + this.state.routeLimit  >= this.totalRoutes()}>
              Next Page
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;