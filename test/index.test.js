import { expect } from 'chai'
import rezto from '../src/index'
import { TRIPADVISOR_URL } from '../src/constants'

describe('rezto', () => {
  it('defines getRestaurants', () => {
    expect(typeof rezto.getRestaurants).to.equal('function')
  })

  it('defines TRIPADVISOR_URL', () => {
    expect(typeof TRIPADVISOR_URL).to.equal('string')
  })
})
