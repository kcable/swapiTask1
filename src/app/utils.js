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

 /**
  *  retrives planets from swapi;
  *  the while loop is used to deal with the pagination of the api
  */
 async function getPlanets(){
    const response = await fetch("https://swapi.dev/api/planets/"); // query the api
    let { next , results, count } = await response.json();
    let sumArr = [...results];
  
   while(next){
     const query = await fetch(next);
      const{next: newNext , results: newResults} = await query.json(); // get the next url we need to query to
      sumArr =[ ...sumArr,...newResults]; // add the results to the array
      next = newNext;
   }
    return [count,sumArr];  // return the count of the planets and the array of planet objects
 }


 module.exports = {
     getPlanetsFromSwapi,
     getPlanets
 }
