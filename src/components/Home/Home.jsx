import React, {Component} from 'react';
import './Home.css';
import Loader from '../Loader/Loader';

class Home extends Component {
    render() {
        let departureSuggestion = null;
        if(this.props.departureSuggestion.length > 0 && this.props.departure.length > 0 && this.props.departureFocus === 1) {
            departureSuggestion = <div className="AutoComplete">
                {this.props.departureSuggestion.map((airport, i) => {
                   return <div onMouseEnter={() => this.props.changeDepartureVal(airport)} key={i}>{airport}</div>
               })}
            </div>
        }
        let destinationSuggestion = null;
        if(this.props.destinationSuggestion.length > 0 && this.props.destination.length > 0 && this.props.destinationFocus === 1) {
            destinationSuggestion = <div className="AutoComplete">
                {this.props.destinationSuggestion.map((airport, i) => {
                   return <div onMouseEnter={() => this.props.changeDestinationVal(airport)} key={i}>{airport}</div>
               })}
            </div>
        }
        let errors = null;
        if(this.props.error) {
            errors = this.props.error.map((err, i) => {
                return <p key={i} className="error">{err}</p>
            })
        }
        return (
            <div className="Home">
                {this.props.loading?<Loader/>:null}
                <h1>Search Flight</h1>
                {errors}
                <form onSubmit={e => this.props.searchFlight(e)} className="">
                    <div className="FlightSearch">
                    <div className="FormInput">
                        <input ref={this.departureRef} required onChange={e => this.props.getSuggestions(e.target.value, 'departure')} 
                        value={this.props.departure}
                        onFocus={() => this.props.focusInDeparture()}
                        onBlur={() => this.props.focusOutDeparture()}
                        type="text" placeholder="Departure" />
                        {departureSuggestion}
                    </div>
                    <div className="FormInput">
                        <input required onChange={e => this.props.getSuggestions(e.target.value, 'destination')} 
                        value={this.props.destination}
                        onFocus={() => this.props.focusInDestination()}
                        onBlur={() => this.props.focusOutDestination()}
                        type="text" placeholder="Destination" />
                        {destinationSuggestion}
                    </div>
                    <div className="FormInput">
                        <input required onChange={e => this.props.changeDepartureDate(e.target.value)} 
                        value={this.props.departureDate} 
                        type="date" placeholder="Departure Date" />
                    </div>
                    <div className="FormInput">
                        <input onChange={e => this.props.changeReturnDate(e.target.value)} 
                        value={this.props.returnDate} 
                        type="date" placeholder="Return Date" />
                    </div>
                    <div className="FormInput">
                        <select onChange={e => this.props.changeCabinClass(e.target.value)}
                         required value={this.props.cabinClass} placeholder='select cabin class' id="">
                            <option value="">Select Cabin Class</option>
                            <option value="First">First</option>
                            <option value="Economy">Economy</option>
                            <option value="Premium">Premium</option>
                            <option value="Business">Business</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <div className="FormInput">
                        <input required onChange={e => this.props.changeAdult(e.target.value)} 
                        value={this.props.adult} 
                        type="number" placeholder="No of Adults" />
                    </div>
                    <div className="FormInput">
                        <input required onChange={e => this.props.changeChildren(e.target.value)} 
                        value={this.props.children} 
                        type="number" placeholder="No of Children" />
                    </div>
                    <div className="FormInput">
                        <input required onChange={e => this.props.changeInfants(e.target.value)} 
                        value={this.props.infants} 
                        type="number" placeholder="No of Infants" />
                    </div>
                    </div>
                    <br/><br/>
                    <button type="submit">SEARCH</button>
                </form>
            </div>
        )
    }
}

export default Home;