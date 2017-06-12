import { expect } from 'chai'
import _          from 'lodash'
import rezto      from '../../src/index'
import nock       from 'nock'

describe('getRestaurants', () => {
  context('success', () => {
    beforeEach(() => {
      nock('https://www.tripadvisor.com.ph')
        .get(/RestaurantSearch/)
        .replyWithFile(200, __dirname + '/../fixtures/restaurants.html') /* eslint no-path-concat: 0 */

      nock('https://www.tripadvisor.com.ph')
        .get(/Restaurant_Review/)
        .times(30)
        .replyWithFile(200, __dirname + '/../fixtures/restaurant-detail.html')
    })

    it('async return restaurants', async () => {
      const options = {'parent': {'place': 'mandaluyong', 'type': 'restaurants', 'sortBy': 'rank', 'batchNumber': 1}}
      let restaurants

      await rezto.getRestaurants(options).then((resolvedValue) => {
        restaurants = resolvedValue
      })

      _.forIn(restaurants, (value, key) => {
        expect(restaurants[key]).to.eq(value)
      })
    })
  })

  context('error', () => {
    beforeEach(() => {
      nock('https://www.tripadvisor.com.ph')
        .get(/RestaurantSearch/)
        .replyWithError('error')
    })

    it('rejects with an error', async () => {
      const options = {'parent': {}}
      let error = false

      await rezto.getRestaurants(options).catch(() => {
        error = true
      })

      expect(error).to.eq(true)
    })
  })
})
