export function mkAddress(prefix: string = '0x'): Address {
  return prefix.padEnd(42, '0')
}

export function mkHash(prefix: string = '0x') {
  return prefix.padEnd(66, '0')
}

export function mkSig(prefix: string = '0x') {
  return prefix.padEnd(132, '0')
}