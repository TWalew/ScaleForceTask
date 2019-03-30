import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/Dispatcher'


const ACT_GETALLCOUNTRIES = 'GETALLCOUNTRIES';
const ACT_GETSPECIFICCOUNTRY = 'GETSPECIFICCOUNTRY';

class Store extends EventEmitter {
    constructor() {
        super();

        this.data = {
            countries: [],
            country: [],
        };

        this._actionMap = {
            [ACT_GETALLCOUNTRIES]: this._getAllCountries.bind(this),
            [ACT_GETSPECIFICCOUNTRY]: this._getCountryByName.bind(this),
        };
    }

    _getAllCountries(actionData) {
        this.data.countries = [...actionData];
        this.emit('change');
    }

    _getCountryByName(actionData){
        this.data.country = [...actionData];
        this.emit('change');
    }

    getCountries() {
        return this.data.countries;
    }

    getCountry() {
        return this.data.country;
    }

    handleActions(action) {
        this._actionMap[action.type] && this._actionMap[action.type](action.data);
    }
}

const store = new Store();
const StoreToken = dispatcher.register(store.handleActions.bind(store));
const getStoreToken = () => StoreToken;

export {getStoreToken};
export default store;