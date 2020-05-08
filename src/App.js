import React, { Component } from 'react';
import './App.css';

import RouteData, { getAirlineById, getAirportByCode } from './data.js';
import Table from './components/Table';

class App extends Component {
  state = {
    routes: RouteData.routes,
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

  limitedRoutes(routes, startingRouteIdx=0, routeLimit=25) {
    const endingRouteIdx = startingRouteIdx + routeLimit;
    return routes.slice(startingRouteIdx, endingRouteIdx);
  };

  filterRoutesByAirline = (selectedAirlineName) => {
    if (selectedAirlineName === 'all') { return RouteData.routes }

    const selectedAirlineId = this.findAirlineIdFromName(selectedAirlineName);

    return RouteData.routes.filter((route) => {
      return route.airline === selectedAirlineId;
    });
  };

  findAirlineIdFromName = (selectedAirlineName) => {
    return RouteData.airlines.find((airline) => {
      return airline.name === selectedAirlineName
    }).id;
  };

  totalRoutes = () => {
    return this.state.routes.length;
  };

  handleAirlineSelection = (e) => {
    const selectedAirline = e.target.value;
    const selectedRoutes = this.filterRoutesByAirline(selectedAirline);
    this.setState({ routes: selectedRoutes });
  };

  handlePreviousClick = (_) => {
    const newStartingIdx = this.state.startingRouteIdx - this.state.routeLimit;
    this.setState({
      startingRouteIdx: newStartingIdx,
    });
  };

  handleNextClick = (_) => {
    const newStartingIdx = this.state.startingRouteIdx + this.state.routeLimit;
    this.setState({
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
          <form>
            <select onChange={this.handleAirlineSelection}>
              <option key='all' value='all'>All Airlines</option>
              {RouteData.airlines.map((airline, idx) => {
                return <option 
                         key={airline.name}
                         value={airline.name}
                       >
                         {airline.name}
                       </option>
              })}
            </select>
          </form>
          <Table
            columns={columns}
            rows={this.limitedRoutes(this.state.routes, this.startingRouteIdx, this.routeLimit)}
            format={this.formatValue}
          />
          <p>Showing {this.state.startingRouteIdx}-{this.state.startingRouteIdx +
                      this.state.routeLimit} of {this.totalRoutes()} routes.</p>
          <div>
            <button onClick={this.handlePreviousClick}
                    disabled={(this.state.startingRouteIdx - this.state.routeLimit) < 0}>
              Previous Page
            </button>
            <button onClick={this.handleNextClick}
                    disabled={this.state.startingRouteIdx +
                              this.state.routeLimit  >= this.totalRoutes()}>
              Next Page
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;