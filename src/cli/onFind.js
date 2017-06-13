import _ from 'lodash'
import rezto from '../index'
import util from '../util'

const onFind = (options) => {
  const printRestaurants = (restaurants) => {
    _.keys(restaurants).forEach((url) => {
      const restaurant = restaurants[url]
      console.log('\n')
      console.log('Name:    ' + restaurant.name)
      console.log('Address: ' + util.prettifyAddress(restaurant.address))
      console.log('Reviews: ' + restaurant.reviews.count)
    })
  }

  return rezto
    .getRestaurants(options.parent)
    .then(printRestaurants)
    .catch(() => {
      console.log('Oh, seems to be an error during http request... Please try again!')
    })
}

export default onFind
