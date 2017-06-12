import { expect } from 'chai'
import util from '../src/util'

describe('util', () => {
  describe('getGeo()', () => {
    context('place is undefined', () => {
      it('returns default', () => {
        expect(util.getGeo()).to.eq(298451)
      })
    })

    context('place is given', () => {
      it('returns value in map', () => {
        expect(util.getGeo('makati')).to.eq(298450)
      })
    })
  })
})
