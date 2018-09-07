export default interface Coinview {
  readonly app: App,
  init(config: Config): Promise<Coinview>
  user: {
    profile(): Promise<UserProfile>
    assets(): Promise<ReadonlyArray<UserAsset>>
    address(assetId: string): Promise<UserAddress>
  }
  utils: {
    setClipboard(payload: string): Promise<void>
    scanQr(): Promise<string | null>
  }
  navigate: {
    back(): Promise<void>
    close(): Promise<void>
  }
  payment: {
    create(payload: PaymentPayload): Promise<PaymentSnapshot>
  }
}

export interface methods {
  [key: number]: string
}

interface App {
  name: string
}

interface Config {
  appId: string,
  name: string,
  icon: string
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
  desc: string
}

interface PaymentSnapshot {
  snapshotId: string
  traceId: string
  assetId: string
  mixinId: string
  amount: number
}
