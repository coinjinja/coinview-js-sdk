export default interface Coinview {
  readonly app: App,
  init(config: Config): Promise<Coinview>
  user: {
    profile(): Promise<UserProfile>
  }
}

export interface Methods {
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
}
