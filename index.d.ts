export as namespace Coinview

export function init(appId: string): Promise<void>

export function app(): Promise<App>

export namespace user {
  export function profile(): Promise<UserProfile>
  export function assets(): Promise<ReadonlyArray<UserAsset>>
  export function address(assetId: string): Promise<UserAddress>
  export function signMessage(payload: SignMessagePayload): Promise<string>
}

export namespace utils {
  export function setClipboard(payload: string): Promise<void>
  export function scanQR(): Promise<string | null>
  export function screenshot(): Promise<string>
  export function share(payload: SharePayload): Promise<void>
}

export namespace ui {
  export function notice(payload: NoticePayload): Promise<void>
  export function confirm(payload: ConfirmPayload): Promise<void>
}

export namespace navigate {
  export function back(): Promise<void>
  export function close(): Promise<void>
}

export namespace payment {
  export function create(payload: PaymentPayload): Promise<PaymentSnapshot>
}

interface App {
  name: string
  iconUrl: string
  locale: string
  currency: string
  params: string
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

interface SignMessagePayload {
  method: string
  path: string
  content: string
  timestamp?: number
  expire: number
}
