import React from 'react';
import ReactDOM from "react-dom";
import * as Actions from '../actions/Actions'
import Store from "../stores/Store";
import Pagination from "react-js-pagination";
import "../styles/table.scss"

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            countriesPerPage: 10,
            countries: [],
        };
        this.sortBy.bind(this);
        this.compareBy.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
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
        console.log("StoreChanged", countries);
        this.setState({
            countries,
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

    render() {

        const countries = this.state.countries;
        const indexOfLastCountry = this.state.currentPage * this.state.countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - this.state.countriesPerPage;
        const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
        return (
            <div className="limiter container">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <div className="text-center">s
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
                                            <tr key={country.numericCode}>
                                                <td className="column1"><img src={country.flag}/></td>
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
 className="col-sm-2"}
