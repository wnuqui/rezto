import _ from 'lodash'
import {
  TRIPADVISOR_URL,
  GEO_MAP,
  SORT_ORDERS_MAP,
  ESTABLISHMENT_TYPES_MAP
} from './constants'

const getGeo = (place) => place ? GEO_MAP[place] : 298451

const getEstablishmentType = (type) => type ? ESTABLISHMENT_TYPES_MAP[type] : 10591

const getSortOrder = (order) => order ? SORT_ORDERS_MAP[order] : 'relevance'

const getBatchOfRestaurants = (batchNumber = 1) => `a${(batchNumber - 1) * 30}`

// from: stackoverflow
const toQueryString = (object) => {
  const parts = []

  _.forIn(object, (value, key) => {
    parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
  })

  return parts.join('&')
}

const urlFor = (options) => {
  const { place, type, sortBy, batchNumber } = options
  var query = { 'Action': 'PAGE', 'ajax': 1, 'availSearchEnabled': false }

  query.geo       = getGeo(place)
  query.itags     = getEstablishmentType(type)
  query.sortOrder = getSortOrder(sortBy)
  query.o         = getBatchOfRestaurants(batchNumber)

  return TRIPADVISOR_URL + '?' + toQueryString(query)
}

export default { urlFor, getGeo, getEstablishmentType, getSortOrder, getBatchOfRestaurants, toQueryString }
