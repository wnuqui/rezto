import request from 'superagent'
import cheerio from 'cheerio'
import _ from 'lodash'
import util from './util'

const getRestaurants = (options) => {
  const url = util.urlFor(options)

  return request
    .get(url)

    .then((response) => {
      let restaurants = getRestaurantDetails(response.text)
      return { promises: getRestaurantAddresses(restaurants), restaurants }
    })

    .then((args) => {
      return Promise
        .all(args.promises)
        .then(onGetRestaurantAddressesFulfilled(args.restaurants))
    })
}

const getRestaurantDetails = (html) => {
  const $ = cheerio.load(html)
      , listings = $('.listing.rebrand')

  let i = 0
    , restaurants = {}

  while (i < 30) {
    let listing = $(listings[i + ''])

    let name          = listing.find('a.property_title').text().trim()
      , reviewsCount  = listing.find('span.reviewCount a').text().trim()
      , url           = listing.find('div.photo_booking a.photo_link').attr('href')

    if (url) {
      let featuredReviews = []

      url = 'https://www.tripadvisor.com.ph' + url

      listing.find('ul.review_stubs li').each((_, _review) => {
        let review = $(_review).find('span a').text()
        let date = $(_review).find('span.date').text()
        featuredReviews.push({
          review: review,
          date: date
        })
      })

      restaurants[url] = {
        name: name,
        rank: i + 1,
        reviews: {
          count: reviewsCount,
          featured: featuredReviews
        }
      }
    }

    i++
  }

  return restaurants
}

const getRestaurantAddresses = (restaurants) => {
  let promises = []

  let onPromiseFulfilled = (url) => {
    return (response) => {
      const $ = cheerio.load(response.text)
      return getAddress($, url)
    }
  }

  let onPromiseError = (error) => console.log(error)

  _.keys(restaurants).forEach((url) => {
    promises.push(
      request.get(url).then(onPromiseFulfilled(url)).catch(onPromiseError)
    )
  })

  return promises
}

const onGetRestaurantAddressesFulfilled = (restaurants) => {
  return (addresses) => {
    addresses.forEach((address) => {
      const url = _.keys(address)[0]
      restaurants[url].address = address[url]
    })

    return restaurants
  }
}

const getLocality = ($) => {
  let locality = []

  $('span.locality')[0].children.forEach((i) => {
    let j = $(i)
              .text()
              .trim()
              .replace(',', '')
              .replace(' ', '')

    if (j !== '') locality.push(j)
  })

  return locality
}

const getAddress = ($, url) => {
  let otherDetails  = $('.prw_rup.prw_common_atf_header_bl.headerBL')
    , locality      = getLocality($)
    , address       = {}

  address[url] = {
    streetAddress: $(otherDetails).find('span.street-address').text(),
    extendedAddress: $(otherDetails).find('span.extended-address').text(),
    locality: locality,
    country: $(otherDetails).find('span.country-name').text()
  }

  return address
}

export default { getRestaurantDetails, getRestaurants }
