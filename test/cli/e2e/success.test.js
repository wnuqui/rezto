import { expect } from 'chai'
import onFind from '../../../src/cli/onFind'
import nock from 'nock'
import intercept from 'intercept-stdout'

describe('onFind', () => {
  context('success', () => {
    beforeEach(() => {
      nock('https://www.tripadvisor.com.ph')
      .get(/RestaurantSearch/)
      .replyWithFile(200, __dirname + '/../../replies/restaurants.html') /* eslint no-path-concat: 0 */

      nock('https://www.tripadvisor.com.ph')
      .get(/Restaurant_Review/)
      .times(30)
      .replyWithFile(200, __dirname + '/../../replies/restaurant-detail.html')
    })

    it('prints results to STDOUT', async () => {
      let stdoutText = ''
      const unhookIntercept = intercept((text) => {
        stdoutText += text
      })

      const options = {'parent': {'place': 'mandaluyong', 'type': 'restaurants', 'sortBy': 'rank', 'batchNumber': 1}}

      await onFind(options).then(() => unhookIntercept())

      expect(stdoutText).to.match(/Name:/)
      expect(stdoutText).to.match(/Address:/)
      expect(stdoutText).to.match(/Reviews:/)
    })
  })
})
