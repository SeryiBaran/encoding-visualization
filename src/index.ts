import chalk from 'chalk'
import prompts from 'prompts'
import { encodings } from './encodings'

async function realtimeEncodingVisualization() {
  const encodingResponse = await prompts({
    type: 'select',
    name: 'encoding',
    message: 'Select an encoding:',
    choices: encodings.map(encoding => ({ title: encoding.name })),
  })

  const encoding = encodings[encodingResponse.encoding]

  const textResponse = await prompts({
    type: 'text',
    name: 'text',
    message: 'Write text to encode:',
  })

  const text: string = textResponse.text

  const infoTemplate = `=================================================================
Printing visualization of this text in "${encoding.name}" encoding:
-----------------------------------------------------------------
${text}
=================================================================
`

  console.log(infoTemplate)

  text.split('').forEach((textChar) => {
    const encodedTextCharBuffer = encoding.encode(textChar)

    let forPrint = ''

    encodedTextCharBuffer.forEach((bufferChar) => {
      const chars = bufferChar.toString(2)
      chars.split('').forEach((char) => {
        forPrint += (`${char}`)
      })
    })

    forPrint = forPrint.padStart(8 * encoding.maxBytes, '0')

    forPrint = forPrint.split('').map((char) => {
      if (char === '1')
        return chalk.bgBlue.white(' 1')
      else if (char === '0')
        return chalk.bgWhite.black(' 0')
      else return (` ${char}`)
    }).join('')

    const addChar = encoding.decode(encodedTextCharBuffer)

    forPrint += (` || ${addChar === textChar ? addChar : chalk.red(`${addChar} (error, original is ${textChar})`)}`)

    console.log(forPrint)
  })
}

realtimeEncodingVisualization()
