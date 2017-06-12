import { expect } from 'chai'
import onFind from '../../../src/cli/onFind'
import nock from 'nock'
import intercept from 'intercept-stdout'

describe('onFind', () => {
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
