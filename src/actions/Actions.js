import dispatcher from '../dispatchers/Dispatcher';
import {GetAllCountries , GetSpecificCountry} from "./ActionCreators";
import Service from "../services/Service";

export function GetAll() {
    Service.GetAllCountries().then(response => {
        if (response) {
            dispatcher.dispatch(GetAllCountries(response));
        }
    });
}

export function GetCountry(name) {
    Service.GetCountryByName(name).then(response => {
        if (response) {
            dispatcher.dispatch(GetSpecificCountry(response));
        }
    });
}