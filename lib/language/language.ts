import words from '../dataset/words'

export interface ILanguage {
  words(): string
  paragraph(): string
  title(): string
}

export type ParagraphConfigType = {
  lines?: number
  wordCount?: number
  languageType?: LanguageType
}

export enum LanguageType {
  english = 'english',
  chinese = 'chinese',
}

export type WordsConfigType = {
  count?: number;
  languageType?: LanguageType;
}

const DEFAULT_PARAGRAPH_LENGTH = 5
const DEFAULT_SENTENCE_WORDS_COUNT = 50
const DEFAULT_WORDS_COUNT = 1


const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const generateWords = ({ count = DEFAULT_WORDS_COUNT, languageType = LanguageType.english }: WordsConfigType = {}) => {
  const word = []

  for (let i = 0; i < count; i++) {
    word.push(words[languageType][Math.floor(Math.random() * words[languageType].length)])
  }

  return word.join('')
}

const generateSentences = ({
  lines = DEFAULT_PARAGRAPH_LENGTH,
  wordCount = DEFAULT_SENTENCE_WORDS_COUNT,
  languageType = LanguageType.english,
}: ParagraphConfigType = {}) => {
  let paragraph: string[] = []

  for (let i = 0; i < lines; i++) {
    const sentence: string[] = []

    for (let i = 0; i < wordCount; i++) {
      const randomAccessor = Math.floor(Math.random() * words[languageType].length)
      !sentence.includes(words[languageType][randomAccessor] as string) && sentence.push(words[languageType][randomAccessor] as string)
    }

    paragraph.push(sentence.join(' '))
  }

  return capitalizeFirstLetter(`${paragraph.join(', ')}.`)
}

const generateTitle = ({
  lines = DEFAULT_PARAGRAPH_LENGTH,
  wordCount = DEFAULT_SENTENCE_WORDS_COUNT,
  languageType = LanguageType.english
}: ParagraphConfigType = {}) => {
  const title = generateSentences({ lines, wordCount, languageType })
  return title.substring(0, title.length - 1)
}

const language: ILanguage = {
  words: ({ count = DEFAULT_WORDS_COUNT }: WordsConfigType = {}) => generateWords({ count }),
  paragraph: ({ lines = DEFAULT_PARAGRAPH_LENGTH }: ParagraphConfigType = {}) => generateSentences({ lines }),
  title: () => generateTitle({ lines: 1, wordCount: 5 }),
}

export default language
