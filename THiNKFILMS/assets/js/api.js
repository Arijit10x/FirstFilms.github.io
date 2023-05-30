"use strict";

const api_key = "2fe477d4bb84e836499e2e6f9871e1f6"
const imageBaseUrl = "https://image.tmdb.org/t/p/"


/* 
 * FETCH DATA FROM A SERVER USING THE 'URL' AND PASSES
 * THE RESULT IN JSON DATA TO A 'CALLBACK' FUNCTION
 * ALONG WITH AN OPTIONAL PARAMETER IF HAS 'OPTIONALPARAM'
 */

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
        .then(Response => Response.json())
        .then(data => callback(data, optionalParam));
}

export {
    imageBaseUrl,
    api_key,
    fetchDataFromServer
};