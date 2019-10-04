# MMM-Craigslist
[WIP]
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

A MagicMirror module to display search results from craigslist.

* NOTE: Craiglist does block for some IP ranges, so this may not work for you. I've found that setting the User-Agent header allows the search to execute, but no results are returned, so still trying to determine what needs to be passed to retrieve results

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Craigslist',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `option1`        | *Required* DESCRIPTION HERE
| `option2`        | *Optional* DESCRIPTION HERE TOO <br><br>**Type:** `int`(milliseconds) <br>Default 60000 milliseconds (1 minute)
