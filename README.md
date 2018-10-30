# Coinview SDK

> Client side JS SDK for creating CoinView DApps.

## Install

Get from CDN:

```
https://unpkg.com/@coinjinja/coinview-sdk@1.0.8-dev/dist/coinview.min.js
```

Get from NPM:

```
npm install @coinjinja/coinview-sdk --save
```

## Guide

Make sure you have installed the **coinview-sdk**. If you installed the SDK
via npm, you can import it:

```js
import coinview from '@coinjinja/coinview-sdk'

// or with common js require
const coinview = require('@coinjinja/coinview-sdk')
```

If you are using the SDK via CDN, it is available on `window`:

```html
<script src="https://unpkg.com/@coinjinja/coinview-sdk@1.0.8-dev/dist/coinview.min.js"></script>
```

```js
const coinview = window.coinview
```

### Initialize

To use the CoinView SDK, an `APP ID` is required, you can find or create your
App [TODO]. Then, use `.init` to initialize the CoinView SDK:

```js
coinview.init(YOUR_APP_ID)
```

Note, the `.init` method should be called before using any other methods.

### Example

Here is a full example of how to use the CoinView SDK:

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
  params: 'customParam1=xxx&customParam2=xxx',
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

Navigation back.

### `coinview.navigate.close()`

Navigation close.

### `coinview.ui.notice(payload)`

It shows an alert message:

```js
/*
const payload = {
  title: string
  content: string
  button: string
}
*/

const payload = {
  title: 'Notice',
  content: 'You have done something wrong',
  button: 'Ok'
}
coinview.ui.notice(payload)
```

### `coinview.ui.confirm(payload)`

It shows a confirm message:

```js
/*
const payload = {
  title: string
  content: string
  confirmButton: string
  cancelButton: string
}
*/

const payload = {
  title: 'Alert',
  content: 'Are you sure you want to delete it?',
  confirmButton: 'Sure',
  cancelButton: 'Cancel'
}
const answer = await coinview.ui.confirm(payload)
// true or false
```

### `coinview.utils.scanQR()`

### `coinview.utils.setClipboard(text)`
