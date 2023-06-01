import { generateDateBetween, generateFutureDate, generatePastDate } from './processors'

export interface IDate {
  past(): string
  future(): string
  between(from: Date, to: Date): string
}

const date: IDate = {
  past: () => generatePastDate(),
  future: () => generateFutureDate(),
  between: (from, to) => generateDateBetween(from, to),
}

export default date
