import {DoHttpRequest} from "./HttpRequest";

export default class Service {
    static GetAllCampaigns() {
        return (
            DoHttpRequest({
                method: 'GET',
                url: `https://restcountries.eu/rest/v2/all`
            }).then(function (response) {
                    console.log('OK', response);
                    return response;
                }
            ).catch((e) => console.log('ERR', e))
        )
    }
}