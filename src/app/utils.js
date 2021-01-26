/**
 * Here you can define helper functions to use across your app.
 */
/**
 * 
 * @param {string} apiUrl  a http url string 
 * @param {Array<Planet>} sumArr an array of planet Objects
 * 
 *  this function is designed to work with the swapi 
 * it retrives all the planets from the url  https://swapi.dev/api/planets/
 * as well as the planet count
 * it also deals with the pagination that this api provides and does so in a recursive manner
 * (i did not find a query parameter  to retrive all entries at once ? maybe there is maybe there is not)
 * @returns {[number,[{Planet}]]}  an array that contains a number and a second nested array of Planet objects
 */
 async function getPlanetsFromSwapi(apiUrl,sumArr){
    const response = await fetch(apiUrl); // query the api
    const { next , results, count } = await response.json();  // destructure the data we need
    if(!next){  // if next is falsy this if returns true which means we have reached the bottom of the recursion
         return [count , sumArr.concat(results)];
    } else { 
        // next is not falsy which means there are more pages with planets left
        // calling the function again but this time with the next page as the url and the result from the current request
        // so we call a get request to the next  page with a now full array of objects
         return await getPlanetsFromSwapi(next,sumArr.concat(results));
    }
 // maybe a loop is a better solution to the problem ?
 }


 module.exports = {
     getPlanetsFromSwapi
 }
