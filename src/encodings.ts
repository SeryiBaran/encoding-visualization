import { Buffer } from 'node:buffer'
import { StringDecoder } from 'node:string_decoder'
import * as koi8r from 'koi8-r'

export interface Encoding {
  id: string
  name: string
  maxBytes: number
  encode: (text: string) => Buffer
  decode: (buf: Buffer) => string
}

/*
ABOUT BUFFER IN NODEJS
---
Buffer is simply an fixed-size array of bytes.
Bytes in Buffer stored in the `number` type.
For example, we have Buffer `[0xFA]`.
If we run `console.log(myBuf[0].toString(10))`, we get byte in decimal - `250`.
If we run `console.log(myBuf[0].toString(2))`, we get byte in binary - `11111010`.
I'm think you understand. If you need additional info, read more here:
  1. https://nodejs.org/api/buffer.html
*/

export const encodings: Encoding[] = [
  {
    id: 'ascii',
    name: 'ASCii',
    maxBytes: 1,
    encode: text => Buffer.from(text, 'ascii'),
    decode: (buf: Buffer) => {
      const decoder = new StringDecoder('ascii')
      return decoder.write(buf)
    },
  },
  {
    id: 'utf8',
    name: 'UTF-8',
    maxBytes: 2,
    encode: text => Buffer.from(text, 'utf8'),
    decode: (buf: Buffer) => {
      const decoder = new StringDecoder('utf8')
      return decoder.write(buf)
    },
  },
  {
    id: 'koi8-r',
    name: 'KOI8-R',
    maxBytes: 1,
    encode: text => Buffer.from(koi8r.encode(text)),
    decode: (buf: Buffer) => {
      return koi8r.decode(buf)
    },
  },
]
