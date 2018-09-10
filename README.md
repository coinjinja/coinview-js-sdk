# Coinview SDK

> Client side JS SDK to create Coinview DApps.

## Install

Get from CDN:

```
NOT READY
```

Get from NPM:

```
npm install @coinjinja/coinview-sdk --save
```

## Guide

Make sure you have installed **coinview-sdk**. If you installed the SDK
via npm, you can import it:

```js
import coinview from '@coinjinja/coinview-sdk'

// or with common js require
const coinview = require('@coinjinja/coinview-sdk')
```

If you are using the SDK via CDN, it is available on `window`:

```js
const coinview = window.coinview
```

### Initialize

To use coinview SDK, an `APP ID` is required, you can find or create your
App [TODO]. Then, use `.init` to initialize coinview SDK:

```js
coinview.init(YOUR_APP_ID)
```

Note, the `.init` method should be called before using any other methods.

### Example

Here is a full example on how to use coinview SDK:

```js
import coinview from '@coinjinja/coinview-sdk'

coinview.init(YOUR_APP_ID).then(() => {

  coinview.app().then(app => {
    console.log(app)
  })

  coinview.user.profile().then(profile => {
    console.log(profile)
  })

})
```

### `async` and `await`

Hint on using `async` and `await`:

```js
import coinview from '@coinjinja/coinview-sdk'
coinview.init(YOUR_APP_ID)

async function fetchUserProfile () {
  const profile = await coinview.user.profile()
  return profile
}
```

## Modules

Modules and functions in `coinview`. You need to call `.init` before
using any of the below methods:

```js
coinview.init(YOUR_APP_ID)
```

### `coinview.app()`

It returns the information of your DApps:

```js
coinview.app().then(app => {
  console.log(app)
})

/*
{
  name: 'Demo App',
  iconUrl: 'https://...',
  locale: 'ja',
  currency: 'JPY'
}
*/
```

### `coinview.user.profile()`

It returns the current user's profile information:

```js
coinview.user.profile().then(profile => {
  console.log(profile)
})

/*
{
  nickname: 'coinjinja',
  userId: '123'
}
*/
```

### `coinview.user.assets()`

It returns a list of the current user's assets information:

```js
coinview.user.assets().then(assets => {
  console.log(assets)
})

/*
[
  {
    assetId: string
    name: string
    symbol: string
    iconUrl: string
    balance: string
  }
]
*/
```

### `coinview.user.address(assetId)`

It returns the address information of an asset:

```js
coinview.user.address(assetId).then(address => {
  console.log(address)
})

/*
{
  assetId: string
  address: string
}
*/
```

### `coinview.payment.create(PaymentPayload)`

It creates a payment:

```js
/*
const payload = {
  traceId?: string
  assetId: string
  amount: number
  memo?: string
  description: string
}
*/

coinview.payment.create(payload).then(payment => {
  console.log(payment)
})

/*
{
  snapshotId: string
  traceId: string
  assetId: string
  mixinId: string
  amount: number
}
*/
```

### `coinview.navigate.back()`

### `coinview.navigate.close()`

### `coinview.utils.scanQR()`

### `coinview.utils.setClipboard(text)`
