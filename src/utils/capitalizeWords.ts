export function capitalizeWords(sentence: string) {
  return sentence.replace(/(^|\s)\S/g, (match) => match.toUpperCase())
}
