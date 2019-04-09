import camelize from './util/camelize'
import { Registry } from './Container'

const ENV_VARS: string[] = [
  'ETH_RPC_URL',
  'SESSION_SECRET',
  'REDIS_URL',
  'PORT'
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
      // @ts-ignore
      instance[key] = overrides[key]
    }
    return instance
  }

  public ethRpcUrl: string = ''
  public sessionSecret: string = ''
  public redisUrl: string = ''
  public port: number = 8080
}
