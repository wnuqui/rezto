# rezto [![wercker status](https://app.wercker.com/status/bdd84c7a11c124e5831a5fc96822a4ea/s/master "wercker status")](https://app.wercker.com/project/byKey/bdd84c7a11c124e5831a5fc96822a4ea) [![codecov](https://codecov.io/gh/wnuqui/rezto/branch/master/graph/badge.svg)](https://codecov.io/gh/wnuqui/rezto)

A CLI and library to list restaurants (found in some of CBD in Philippines). Results are from TripAdvisor.

## Installation

    $ npm install -g rezto

## Usage


### CLI

```
Usage: rezto find [options]


  Commands:

    find

  List restaurants (found in some of CBD in Philippines) via CLI.
  Results are from TripAdvisor.

  Options:

    -h, --help                         output usage information
    -V, --version                      output the version number
    -p, --place <place>                place
    -t, --type <type>                  type
    -s, --sort-by <sort_by>            sort results (valid values are: name, rank)
    -b, --batch-number <batch_number>  batch number of restaurants
```

#### Examples

`rezto` has default values for the CLI options and you can override them.

     $ rezto find --place=makati

Default values for these options are:

* `--place` is mandaluyong (other values are: makati, taguig, quezon, pasig, pasay and clark)
* `--type` is resturants (other values are: dessert, coffee-n-tea, bakeries and bars-n-pubs)
* `--sort-by` is rank (other is name)
* `--batch-number` is 1 for 1st 30 results, 2 for next 30 and so on and so forth.

So to search for bakeries in Makati, you can do

    $ rezto find --place=makati --type=bakeries

### Library

You can as well use `rezto` in your code. For example,

```javascript
var rezto = require('rezto').default
var _ = require('lodash')

rezto
  .getRestaurants({})
  .then((restaurants) => {
    _.keys(restaurants).forEach((url) => {
      const restaurant = restaurants[url]
      console.log('\n')
      console.log('Name:    ' + restaurant.name)
      console.log('Reviews: ' + restaurant.reviews.count)
    })
  })
  .catch((error) => {
    console.log(error)
  })
```

## License

(The MIT License)

Copyright (c) 2017 Wilfrido T. Nuqui Jr. nuqui.dev@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
