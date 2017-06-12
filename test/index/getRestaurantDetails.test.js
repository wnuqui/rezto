import { expect } from 'chai'
import _          from 'lodash'
import rezto      from '../../src/index'
import fs         from 'fs'

describe('getRestaurantDetails', () => {
  it('returns restaurant details', async () => {
    function asyncReadPath (path) {
      return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function (error, data) {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
      })
    }

    let file = await asyncReadPath(__dirname + '/../fixtures/restaurants.html') /* eslint no-path-concat: 0 */

    let restaurants = rezto.getRestaurantDetails(file)

    expect(_.keys(restaurants).length > 0).to.eq(true)

    _.forIn(restaurants, (value, key) => {
      expect(restaurants[key]).to.eq(value)
    })
  })
})
