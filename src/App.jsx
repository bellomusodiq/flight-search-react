import React, {Component} from 'react';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from './components/Home/Home';
import api from './api';
import Results from './components/Results/Results';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    loading: false,
    error: false,
    data: null,
    departureSuggestion: [],
    destinationSuggestion: [],
    departure: '',
    destination: '',
    departureFocus: 0,
    destinationFocus: 0,
    departureDate: '',
    returnDate: '',
    adult: '',
    children: '',
    infants: '',
    cabinClass: ''
  }
  fetchFlight = () => {
      api.post('/')
  }
  getSuggestion = (query, type) => {
      if (type === 'departure'){
          this.setState({departure: query})
          api.get(`/get_suggestion/?q=${query}`)
          .then(res => {
              this.setState({departureSuggestion: res.data.result})
            })
        } else {
            this.setState({destination: query})
            api.get(`/get_suggestion/?q=${query}`)
            .then(res => {
                this.setState({destinationSuggestion: res.data.result})
                })
        }
  }
  submitSearch = e => {
      e.preventDefault();
      alert('submitted');
      const {
        departure,
        destination,
        departureDate,
        returnDate,
        adult,
        children,
        infants,
        cabinClass
      } = this.state;
      const data = {
          departure_city: departure,
          destination_city: destination,
          departure_date: departureDate,
          return_date: returnDate,
          no_of_adults: adult,
          no_of_children: children,
          no_of_infants: infants,
          cabin_class: cabinClass
      }
      this.setState({loading: true})
      api.post('/flight_search/', data)
      .then(res => {
          this.setState({loading: false, data: res.data})
          this.props.history.push('/result')
      })
      .catch(err => {
          this.setState({loading: false})
          this.setState({error: err.response.data})
      })
  }
  render () {
    return (
      <div className="App">
        <Header />
          <Switch>
                <Route path='/result' render={() => <Results 
                data={this.state.data} 
                loading={this.state.loading} 
                error={this.state.error} />} />
                <Route path='/' render={() => <Home loading={this.state.loading} 
                departure={this.state.departure}
                destination={this.state.destination}
                adult={this.state.adult}
                infants={this.state.infants}
                children={this.state.children}
                getSuggestions = {(val, type) => this.getSuggestion(val, type)}
                error={this.state.error}
                departureSuggestion={this.state.departureSuggestion}
                destinationSuggestion={this.state.destinationSuggestion}
                focusInDeparture={() => this.setState({departureFocus: 1})}
                focusOutDeparture={() => this.setState({departureFocus: 0})}
                departureFocus={this.state.departureFocus}
                focusInDestination={() => this.setState({destinationFocus: 1})}
                focusOutDestination={() => this.setState({destinationFocus: 0})} 
                destinationFocus={this.state.destinationFocus}
                changeDepartureVal={(val) => this.setState({departure: val})}
                changeDestinationVal={(val) => this.setState({destination: val})}
                changeDepartureDate={val => this.setState({departureDate: val})}
                changeReturnDate={val => this.setState({returnDate: val})}
                changeAdult={val => this.setState({adult: val})}
                changeChildren={val => this.setState({children: val})}
                changeInfants={val => this.setState({infants: val})}
                changeCabinClass={val => this.setState({cabinClass: val})}
                cabinClass={this.state.cabinClass}
                searchFlight={(e) => this.submitSearch(e)}
                />}
                 />
          </Switch>
    </div>
  );
}
}

export default withRouter(App);
