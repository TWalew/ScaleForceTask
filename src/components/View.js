import React from 'react';
import * as Actions from '../actions/Actions'
import Store from "../stores/Store";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
        };
        this.storeChanged = this.storeChanged.bind(this);
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

    render() {
        return(
            <h1>TESST</h1>
        );
    }
}