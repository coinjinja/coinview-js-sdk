import coinview from '../src/'

describe('Coinview', () => {
  test('.init', () => {
    return coinview.init('MY-APP-ID').then(instance => {
      expect(instance).toBe(coinview)
    })
  })
})
