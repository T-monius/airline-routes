import React, { Component } from 'react';
import './App.css';

import RouteData, { getAirlineById, getAirportByCode } from './data.js';
import Table from './components/Table';
import Select from './components/Select';

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
    if (selectedAirlineName === 'all_airlines') { return RouteData.routes }

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

  filterRoutesByAirport = (selectedAirportName) => {
    if (selectedAirportName === 'all_airports') { return RouteData.routes };

    const airportCode = this.findAirportCodeFromName(selectedAirportName);

    return RouteData.routes.filter((route) => {
      return route.src === airportCode || route.dest === airportCode;
    })
  };

  findAirportCodeFromName = (selectedAirportName) => {
    return RouteData.airports.find((airport) => {
      return airport.name === selectedAirportName;
    }).code;
  };

  showAllRoutes = (_) => {
    this.setState({ routes: RouteData.routes });
  };

  totalRoutes = () => {
    return this.state.routes.length;
  };

  sortByName = (airport, airport1) => {
    const name = airport.name.toLowerCase();
    const name1 = airport1.name.toLowerCase();
    if (name < name1) {
      return -1;
    } else if (name > name1) {
      return 1;
    } else {
      return 0;
    }
  };

  handleAirlineSelection = (e) => {
    const selectedAirlineName = e.target.value;
    const selectedRoutes = this.filterRoutesByAirline(selectedAirlineName);
    this.setState({ routes: selectedRoutes });
  };

  handleAirportSelection = (e) => {
    const selectedAirportName = e.target.value;
    const selectedRoutes = this.filterRoutesByAirport(selectedAirportName);
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

  isCompatibleAirline = (airlineId) => {
    return this.state.routes.find((route) => {
      return route.airline === airlineId;
    });
  };

  isCompatibleAirport = (airportCode) => {
    return this.state.routes.find((route) => {
      return route.src === airportCode || route.dest === airportCode;
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
            <Select
              options={RouteData.airlines}
              compatible={this.isCompatibleAirline}
              onChange={this.handleAirlineSelection}
              allTitle={'All Airlines'}
              titleKey={'all_airlines'}
              value={'name'}
              valueKey={'id'}
            />
            <Select
              options={[...RouteData.airports].sort(this.sortByName)}
              compatible={this.isCompatibleAirport}
              onChange={this.handleAirportSelection}
              allTitle={'All Airports'}
              titleKey={'all_airports'}
              value={'name'}
              valueKey={'code'}
            />
            <button type='reset' onClick={this.showAllRoutes}>Show All Routes</button>
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