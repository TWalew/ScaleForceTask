import {DoHttpRequest} from "./HttpRequest";

export default class Service {
    static GetAllCountries() {
        return (
            DoHttpRequest({
                method: 'GET',
                url: `https://restcountries.eu/rest/v2/all`
            }).then(function (response) {
                    return JSON.parse(response);
                }
            ).catch((e) => console.log('ERR', e))
        )
    }
    static GetCountryByName(name) {
        return (
            DoHttpRequest({
                method: 'GET',
                url: `https://restcountries.eu/rest/v2/name/` + name + '?limitTo',
            }).then(function (response) {
                    return JSON.parse(response);
                }
            ).catch((e) => console.log('ERR', e))
        )
    }
}