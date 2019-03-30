import React from 'react';
import * as Actions from '../actions/Actions'
import Store from "../stores/Store";
import '../styles/view.scss'

export default class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: [],
        };
        this.storeChanged = this.storeChanged.bind(this);
    }

    componentDidMount() {
        let paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        const name = params.get('name');
        Store.on("change", this.storeChanged);
        Actions.GetCountry(name);
        this.storeChanged();
    }

    componentWillUnmount() {
        Store.removeListener("change", this.storeChanged);
    }

    storeChanged(){
        let country = Store.getCountry();
        console.log("StoreChanged", country);
        this.setState({
            country,
        });
    }

    render() {
        let country = this.state.country;
        return(
            <div>{
                country.map((country) => {
                    return(
                        <div className="container view">
                            <div className='row'>
                                <label className='col-sm-5'><h1>Flag</h1></label>
                                <span className='col-sm-2'><h1>:</h1></span>
                                <span  className='col-sm-5'><img src={country.flag} /></span>
                            </div>
                            <div className='row'>
                                <label className='col-sm-5'><h1>Name</h1></label>
                                <span className='col-sm-2'><h1>:</h1></span>
                                <span  className='col-sm-5'><h1>{country.name}</h1></span>
                            </div>
                            <div className='row'>
                                <label className='col-sm-5'><h1>Capital</h1></label>
                                <span className='col-sm-2'><h1>:</h1></span>
                                <span  className='col-sm-5'><h1>{country.capital}</h1></span>
                            </div>
                            <div className='row'>
                                <label className='col-sm-5'><h1>Population</h1></label>
                                <span className='col-sm-2'><h1>:</h1></span>
                                <span  className='col-sm-5'><h1>{country.population}</h1></span>
                            </div>
                            <div className='row'>
                                <label className='col-sm-5'><h1>Currency</h1></label>
                                <span className='col-sm-2'><h1>:</h1></span>
                                <span  className='col-sm-5'><h1>{country.currencies[0].name}<span>({country.currencies[0].symbol})</span></h1></span>
                            </div>
                            <div className='row'>
                                <label className='col-sm-5'><h1>Region</h1></label>
                                <span className='col-sm-2'><h1>:</h1></span>
                                <span  className='col-sm-5'><h1>{country.subregion}</h1></span>
                            </div>
                        </div>
                    )
                })
            }</div>
        );
    }
}