import camelize from './util/camelize'
import { Registry } from './Container'

const ENV_VARS: string[] = [
  'ETH_RPC_URL',
  'SESSION_SECRET',
  'REDIS_URL',
  'PORT',
  'SERVICE_USER_KEY',
  'DATABASE_URL'
]

const env = process.env.NODE_ENV || 'development'
function envswitch(vals: any) {
  let res = vals[env]
  if (res === undefined)
    throw new Error(`No valid specified for env '${env}' in ${JSON.stringify(vals)}`)
  return res
}

export default class Config {
  static fromEnv(overrides?: Partial<Config>): Config {
    const instance = new Config()

    // prettier-ignore
    ENV_VARS.forEach((v: string) => {
      const val: any = process.env[v]
      if (val !== undefined)
        (instance as any)[camelize(v, '_')] = v.endsWith('ADDRESS') ? val.toLowerCase() : val
    })

    for (let key in (overrides || {})) {
      instance[key] = overrides![key]
    }
    return instance
  }

  public ethRpcUrl: string = 'http://localhost:8545'
  public sessionSecret: string = 'foo'
  public redisUrl: string = 'redis://localhost:6379'
  public port: number = 8080
  public authDomainWhitelist: string[] =  ['localhost']
  public registry?: Registry
  public serviceUserKey: string = 'changeme'
  public adminAddresses: string[] = []
  public databaseUrl: string = 'postgresql://localhost:5432/hub'
}
