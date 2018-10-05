export default interface Coinview {
  init(appId: string): Promise<Coinview>
  app(): Promise<App>
  user: {
    profile(): Promise<UserProfile>
    assets(): Promise<ReadonlyArray<UserAsset>>
    address(assetId: string): Promise<UserAddress>
  }
  utils: {
    setClipboard(payload: string): Promise<void>
    scanQR(): Promise<string | null>
    screenshot(): Promise<string>
    SVGPathSegArcRel(payload: SharePayload): Promise<void>
  }
  ui: {
    notice(payload: NoticePayload): Promise<void>
    confirm(payload: ConfirmPayload): Promise<void>
  }
  navigate: {
    back(): Promise<void>
    close(): Promise<void>
  }
  payment: {
    create(payload: PaymentPayload): Promise<PaymentSnapshot>
  }
}

interface App {
  name: string
  iconUrl: string
  locale: string
  currency: string
}

interface UserProfile {
  nickname: string
  userId: string
}

interface UserAsset {
  assetId: string
  name: string
  symbol: string
  iconUrl: string
  balance: string
}

interface UserAddress {
  assetId: string
  address: string
}

interface PaymentPayload {
  traceId?: string
  assetId: string
  amount: number
  memo?: string
  description: string
}

interface PaymentSnapshot {
  snapshotId: string
  traceId: string
  assetId: string
  mixinId: string
  amount: number
}

interface NoticePayload {
  title: string
  content: string
  button: string
}

interface ConfirmPayload {
  title: string
  content: string
  confirmButton: string
  cancelButton: string
}

interface SharePayload {
  text?: string
  link?: string
  image?: string
}