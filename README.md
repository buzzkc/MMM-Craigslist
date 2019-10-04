# MMM-Craigslist
[WIP]
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

A MagicMirror module to display search results from craigslist.
![](./img/MMM-Craigslist.png)

* NOTE: Craiglist does block for some IP addresses/ranges, so this may not work for you. I've found that setting the User-Agent header allows the search to execute, but no results are returned, so I'm still trying to determine what needs to be passed to retrieve results, as a browser does still work for searching.

## Installation
### Setup the MagicMirror module
~MagicMirror/modules

git clone https://github.com/buzzkc/MMM-Craigslist.git

cd MMM-Craigslist

npm install

### Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Craigslist',
            config: {
                city: 'seattle',
                search: 'coffee'
                // See below for configurable options
            }
        }
    ]
}
```

### Configuration options

| Option            | Description
|-----------------  |-----------
| `city`            | *Required* Defines the city for the search
| `baseHost`        | *Optional* allows for specification of the base domain (defaults to craiglist.org) to support other countries (i.e. for Canada, craigslist.ca)
| `title`           | *Optional* Title for the module header
| `search`          | *Optional* keyword to search for 
| `category`        | *Optional* allows for specification of the category (defaults to sss) to search in other categories
| `maxPrice`        | *Optional* maximum price
| `minPrice`        | *Optional* minmum price
| `postal`          | *Optional* when specified in conjunction with searchDistance, the postal code can be used to find posting within a certain range
| `searchDistance`  | *Optional* when specified in conjunction with postal, this is the distance range
| `searchNearby`    | *Optional* allows for a search to be performed against nearby locations as well
| `searchTitlesOnly`| *Optional* performs search against posting titles only and not the posting body
| `offset`          | *Optional* offset number of listings returned 
| `nocache`         | *Optional* applies appropriate headers on request to attampt to bypass any caches
| `minYear`         | *Optional* minimum year (cars+trucks related search)
| `maxYear`         | *Optional* maximum year (cars+trucks related search)
| `autoMakeModel`   | *Optional* auto make model (cars+trucks related search)
| `maxResultsShown` | *Optional* Number of results to show, default: 10 <*Int*>
|                   |

## Future ideas
* Add dates to display
* Add QR code to open listings
* Add images to listings

## Thanks To
* MichMich for developing [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* The node-craigslist [node library](https://www.npmjs.com/package/node-craigslist)