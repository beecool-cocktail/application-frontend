import { UAParser } from 'ua-parser-js'

const parser = new UAParser()
const result = parser.getResult()

export const isMobile = result.device.type === 'mobile'
