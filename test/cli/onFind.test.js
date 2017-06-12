import { expect } from 'chai'
import onFind     from '../../src/cli/onFind'
import nock       from 'nock'
import intercept  from 'intercept-stdout'

describe('onFind', () => {
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

  context('error', () => {
    beforeEach(() => {
      nock('https://www.tripadvisor.com.ph')
        .get(/RestaurantSearch/)
        .replyWithError('error')
    })

    it('prints error to STDOUT', async () => {
      let stdoutText = ''
      const unhookIntercept = intercept((text) => {
        stdoutText += text
      })

      const options = {'parent': {}}
      await onFind(options).catch(() => unhookIntercept())
      expect(stdoutText.trim()).to.include('Oh, seems to be an error during http request... Please try again!')
    })
  })
})
