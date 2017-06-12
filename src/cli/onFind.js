import _ from 'lodash'
import rezto from '../index'

const onFind = (options) => {
  const prettifyAddress = (address) => {
    let parts = _.filter(_.valuesIn(address), (part) => part !== '')

    parts = _.map(parts, (part) => {
      if (typeof part === 'object') {
        return part.join(', ')
      } else {
        return part
      }
    })

    parts = _.map(parts, (part) => {
      return part
              .trim()
              .replace(/,$/, '')
              .replace(/,/, ', ')
              .replace(/\s+/, ' ')
    })

    return parts.join(', ')
  }

  return rezto
    .getRestaurants(options.parent)
    .then((restaurants) => {
      _.keys(restaurants).forEach((url) => {
        const restaurant = restaurants[url]
        console.log('\n')
        console.log('Name:    ' + restaurant.name)
        console.log('Address: ' + prettifyAddress(restaurant.address))
        console.log('Reviews: ' + restaurant.reviews.count)
      })
    })
    .catch(() => {
      console.log('Oh, seems to be an error during http request... Please try again!')
    })
}

export default onFind
