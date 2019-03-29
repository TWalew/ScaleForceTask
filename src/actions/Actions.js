import dispatcher from '../dispatchers/Dispatcher';
import {GetAllCountries} from "./ActionCreators";
import Service from "../services/Service";

export function GetAll() {
    Service.GetAllCountries().then(response => {
        if (response) {
            dispatcher.dispatch(GetAllCountries(response));
        }
    });
}