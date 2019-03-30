import React from 'react';
import * as Actions from '../actions/Actions'
import Store from "../stores/Store";
import Pagination from "react-js-pagination";
import ReactTooltip from 'react-tooltip'
import { browserHistory } from 'react-router'
import "../styles/table.scss"

let searchString = "";

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonPressedTimer: 5,
            currentPage: 1,
            countriesPerPage: 10,
            searchString: '',
            countries: [],
            country: []
        };
        this.sortBy.bind(this);
        this.compareBy.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleButtonRelease = this.handleButtonRelease.bind(this);
    }

    componentDidMount() {
        Store.on("change", this.storeChanged);
        Actions.GetAll();
        this.storeChanged();
    }

    componentWillUnmount() {
        Store.removeListener("change", this.storeChanged);
    }

    storeChanged(){
        let countries = Store.getCountries();
        let country = Store.getCountry();
        console.log("StoreChanged", country);
        this.setState({
            countries,
            country: country.slice(0,10)
        });
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [...this.state.countries];
        arrayCopy.sort(this.compareBy(key));
        this.setState({countries: arrayCopy});
    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });
    }
    handleButtonPress(name){
        let that = this;
        this.interval = setInterval(() => {
        if(that.state.buttonPressedTimer > 0){
            that.setState({
                buttonPressedTimer: that.state.buttonPressedTimer - 1
            })
        }
        else if (that.state.buttonPressedTimer === 0){
            window.location.assign('/view?name=' + name);
        }
    }, 1000); }

    handleButtonRelease(){
        clearTimeout(this.interval);
        this.setState({
            buttonPressedTimer: 5
        })
    }

    handleKeyPress = (event) => {
        console.log(event.key);
        if (event.key !== 'Backspace' && event.key !== 'Shift' && event.key !== 'CapsLock' && event.key !== 'Tab' && event.key !== 'Alt') {
            searchString+=event.key;
        }else{
            searchString = searchString.slice(0,-1)
        }
        console.log(searchString);
        Actions.GetCountry(searchString)
    };

    handleCountryClick(name){
        window.location.assign('/view?name=' + name);
    }

    render() {

        const countries = this.state.countries;
        const country = this.state.country;
        const indexOfLastCountry = this.state.currentPage * this.state.countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - this.state.countriesPerPage;
        const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
        return (
            <div className="limiter container">
                <input placeholder="Search for Countries" type="text" onKeyDown={this.handleKeyPress}/>
                <ul className='auto-suggest'>{
                    country.map((country) => {
                        return(
                            <li>
                                <div onClick={() => this.handleCountryClick(country.name)} className='suggestion-box'>
                                    <img src={country.flag} />
                                    <span>{country.name}</span>
                                </div>
                            </li>
                        )
                    })
                }</ul>
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <div className="text-center">
                                <Pagination
                                    prevPageText='prev'
                                    nextPageText='next'
                                    firstPageText='first'
                                    lastPageText='last'
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={this.state.currentPage}
                                    itemsCountPerPage={this.state.countriesPerPage}
                                    totalItemsCount={this.state.countries.length}
                                    onChange={this.handlePageChange}
                                />
                            </div>
                            <table>
                                <thead>
                                <tr className="table100-head">
                                    <th className="column1">Flag</th>
                                    <th className="column2" onClick={() => this.sortBy('name')}>Name</th>
                                    <th className="column3" onClick={() => this.sortBy('capital')}>Capital</th>
                                    <th className="column4" onClick={() => this.sortBy('population')}>Population</th>
                                    <th className="column5">Currency</th>
                                    <th className="column6" onClick={() => this.sortBy('subregion')}>Region</th>
                                </tr>
                                </thead>
                                <tbody>{
                                    currentCountries.map((country) => {
                                        return(
                                            <tr key={country.numericCode}
                                                onMouseDown={() => this.handleButtonPress(country.name)}
                                                onMouseUp={() => this.handleButtonRelease()}
                                                onMouseLeave={() => this.handleButtonRelease()}
                                                data-tip data-for={country.numericCode}>
                                                <td className="column1">
                                                    <img src={country.flag}/>
                                                    <ReactTooltip id={country.numericCode} place="top" type="info" effect="float">
                                                        <span>{this.state.buttonPressedTimer}</span>
                                                    </ReactTooltip>
                                                </td>
                                                <td className="column2"><span>{country.name}</span></td>
                                                <td className="column3"><span>{country.capital}</span></td>
                                                <td className="column4"><span>{country.population}</span></td>
                                                <td className="column5"><span>{country.currencies[0].name}</span> <span>({country.currencies[0].symbol})</span></td>
                                                <td className="column6"><span>{country.subregion}</span></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            <div className="text-center">
                                <Pagination
                                    prevPageText='prev'
                                    nextPageText='next'
                                    firstPageText='first'
                                    lastPageText='last'
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={this.state.currentPage}
                                    itemsCountPerPage={this.state.countriesPerPage}
                                    totalItemsCount={this.state.countries.length}
                                    onChange={this.handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
