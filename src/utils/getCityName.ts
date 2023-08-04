export function getCityName(sentence: string): string {
  const commaIndex = sentence.indexOf(',')

  if (commaIndex !== -1) {
    return sentence.substring(0, commaIndex).trim()
  }

  return sentence.trim()
}
