import React, {Component, Fragment} from 'react';
import './Results.css';

class Results extends Component {

    componentDidMount() {
            console.log(this.props.data)
    }
    render() {
        let results = null;
        if (this.props.data) {
            results = this.props.data.map((flight, i) => {
                return <Fragment key={i}>
                    <div>{i+1}</div>
                    <div>{flight.departure.airport.name}</div>
                    <div>{flight.departure.date} / {flight.departure.time}</div>
                    <div>{flight.arrival.airport.name}</div>
                    <div>{flight.arrival.date} / {flight.arrival.time}</div>
                    <div>{flight.operating_airline.name}</div>
                </Fragment> 
            })
        }
        return (
            <div className="Result">
                <div className="ResultTable">
                    <div><strong>S/N</strong></div>
                    <div><strong>DEPARTURE</strong></div>
                    <div><strong>DEPARTURE DATE/TIME</strong></div>
                    <div><strong>ARRIVAL</strong></div>
                    <div><strong>ARRIVAL DATE/TIME</strong></div>
                    <div><strong>AIRLINE</strong></div>
                    {results}
                </div>
            </div>
        )
    }
}

export default Results;