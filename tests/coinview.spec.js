import coinview from '../src/'
import bridge from '../src/_bridge'

describe('Coinview', () => {
  test('before .init', () => {
    expect(() => {
      coinview.app()
    }).toThrow()

    expect(() => {
      coinview.user.profile()
    }).toThrow()
  })

  test.skip('.init timeout', () => {
    window.originalPostMessage = undefined
    return coinview.init('MY-APP-ID').catch(error => {
      expect(error.message).toEqual('Timeout')
    })
  })

  test('.init can postMessage', () => {
    window.originalPostMessage = true

    const mockData = {name: 'Mock App'}

    const spy = jest.fn().mockImplementation(payload => {
      const data = JSON.parse(payload)
      bridge.receive({
        uuid: data.uuid,
        payload: mockData
      })
    })

    window.postMessage = spy
    return coinview.init('MY-APP-ID').then(() => {
      return coinview.app().then(app => {
        expect(app).toEqual(mockData)
      })
    })
  })

  test('.user.profile success', () => {
    window.originalPostMessage = true

    const mockApp = {name: 'Mock App'}
    const mockData = {nickname: 'coinjinja'}

    const spy = jest.fn().mockImplementation(payload => {
      const data = JSON.parse(payload)

      if (data.method === 'user.profile') {
        bridge.receive(JSON.stringify({
          uuid: data.uuid,
          payload: mockData
        }))
      } else if (data.method === 'app.init') {
        bridge.receive({
          uuid: data.uuid,
          payload: mockApp
        })
      }
    })

    window.postMessage = spy

    coinview.init('MY-APP-ID')
    return coinview.user.profile().then(profile => {
      expect(profile).toEqual(mockData)
      return coinview.user.profile()
    })
  })

})
