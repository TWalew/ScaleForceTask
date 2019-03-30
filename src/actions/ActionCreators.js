export function GetAllCountries(countries) {
    return {
        type: 'GETALLCOUNTRIES',
        data: countries
    }
}
export function GetSpecificCountry(country) {
    return {
        type: 'GETSPECIFICCOUNTRY',
        data: country
    }
}