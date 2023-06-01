import firstNames from '../dataset/firstNames'
import surnames from '../dataset/surnames'

export interface IPerson {
  firstName(): string
  lastName(): string
  fullName(): string
  age(): number
}

const person = (): IPerson => {
  const getRandomFirstName = (): string => {
    const collection: string[] = firstNames;
    const randomAccessor = Math.floor(Math.random() * collection.length)

    return collection[randomAccessor] ?? '赵'
  }

  const getRandomSurname = (): string => {
    const randomAccessor = Math.floor(Math.random() * surnames.length)

    return surnames[randomAccessor] ?? '三'
  }

  return {
    firstName: () => getRandomFirstName(),
    lastName: () => getRandomSurname(),
    fullName: () => `${getRandomFirstName()} ${getRandomSurname()}`,
    age: () => Math.floor(Math.random() * 100),
  }
}

export default person
