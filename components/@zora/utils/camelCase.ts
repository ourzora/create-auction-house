export const capitalize = (word: string) =>
  word
    .split('')
    .map((letter, index) =>
      index ? letter.toLowerCase() : letter.toUpperCase(),
    )
    .join('');


export const camelCase = (text: string) => {
  if (text !== 'unknown') {

    const regex = /[^a-z0-9]|\s+|\r?\n|\r/gmi;

    return text
      .split(regex)
      .map((word, index) =>
        index ? capitalize(word) : word.toLowerCase()
      )
      .join('');
    
  } else {
    return ''
  }
}
