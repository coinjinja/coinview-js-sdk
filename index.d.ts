export default interface Coinview {
  readonly app: App,
  init(config: Config): Promise<Coinview>
  user: {
    profile(): Promise<UserProfile>
  }
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
