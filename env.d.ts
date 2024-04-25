import type { Buffer } from 'node:buffer'

declare module 'koi8-r' {
  interface EncodeOptions {
    mode: 'fatal' | 'replacement'
  }
  interface DecodeOptions {
    mode: 'fatal' | 'replacement'
  }

  export function encode(
    text: string,
    options?: EncodeOptions
  ): Uint16Array
  export function decode(
    buffer: Uint16Array | Uint8Array | Buffer | string,
    options?: DecodeOptions
  ): string
  export type labels = string[]
}
