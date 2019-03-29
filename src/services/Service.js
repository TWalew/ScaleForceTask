import {DoHttpRequest} from "./HttpRequest";

export default class Service {
    static GetAllCountries() {
        return (
            DoHttpRequest({
                method: 'GET',
                url: `https://restcountries.eu/rest/v2/all`
            }).then(function (response) {
                    console.log( JSON.parse(response));
                    return JSON.parse(response);
                }
            ).catch((e) => console.log('ERR', e))
        )
    }
}