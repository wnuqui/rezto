import { expect } from 'chai'
import {
  TRIPADVISOR_URL,
  GEO_MAP,
  SORT_ORDERS_MAP,
  ESTABLISHMENT_TYPES_MAP
} from '../src/constants'
import util from '../src/util'

describe('util', () => {
  describe('getGeo()', () => {
    context('place is undefined', () => {
      it('returns default', () => {
        expect(util.getGeo()).to.eq(GEO_MAP['mandaluyong'])
      })
    })

    context('place is given', () => {
      it('returns value in map', () => {
        expect(util.getGeo('makati')).to.eq(GEO_MAP['makati'])
      })
    })
  })

  describe('getEstablishmentType()', () => {
    context('type is undefined', () => {
      it('returns default', () => {
        expect(util.getEstablishmentType()).to.eq(ESTABLISHMENT_TYPES_MAP['restaurants'])
      })
    })

    context('type is given', () => {
      it('returns value in map', () => {
        expect(util.getEstablishmentType('dessert')).to.eq(ESTABLISHMENT_TYPES_MAP['dessert'])
      })
    })
  })

  describe('getSortOrder()', () => {
    context('order is undefined', () => {
      it('returns default', () => {
        expect(util.getSortOrder()).to.eq(SORT_ORDERS_MAP['rank'])
      })
    })

    context('order is given', () => {
      it('returns value in map', () => {
        expect(util.getSortOrder('name')).to.eq(SORT_ORDERS_MAP['name'])
      })
    })
  })

  describe('getBatchOfRestaurants()', () => {
    it('correctly returns number', () => {
      expect(util.getBatchOfRestaurants(1)).to.eq('a0')
      expect(util.getBatchOfRestaurants(2)).to.eq('a30')
    })
  })

  describe('toQueryString()', () => {
    it('returns query string', () => {
      expect(util.toQueryString({'a': 1})).to.eq('a=1')
      expect(util.toQueryString({'a': 1, 'b': 'two'})).to.eq('a=1&b=two')
    })
  })

  describe('urlFor()', () => {
    it('returns url', () => {
      expect(util.urlFor({})).to.eq(TRIPADVISOR_URL + '?Action=PAGE&ajax=1&availSearchEnabled=false&geo=298451&itags=10591&sortOrder=relevance&o=a0')
      expect(util.urlFor({'place': 'makati'})).to.eq(TRIPADVISOR_URL + '?Action=PAGE&ajax=1&availSearchEnabled=false&geo=298450&itags=10591&sortOrder=relevance&o=a0')
    })
  })
})
