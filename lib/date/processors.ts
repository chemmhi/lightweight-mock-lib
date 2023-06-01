
import dayjs from 'dayjs';

export const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const generatePastDate = (refDate?: string, format: string = DEFAULT_FORMAT) => {
  let date = new Date()
  if (typeof refDate !== 'undefined') {
    date = new Date(Date.parse(refDate))
  }

  const changerFactor = Math.floor(Math.random() * 365 * 24 * 3600 * 1000)

  let timeDifference = date.getTime() - changerFactor
  date.setTime(timeDifference)

  return dayjs(date).format(format);
}

export const generateFutureDate = (refDate?: string, format: string = DEFAULT_FORMAT) => {
  let date = new Date()
  if (typeof refDate !== 'undefined') {
    date = new Date(Date.parse(refDate))
  }

  const changerFactor = Math.floor(Math.random() * 365 * 24 * 3600 * 1000)

  let timeDifference = date.getTime() + changerFactor
  date.setTime(timeDifference)

  return dayjs(date).format(format);
}

export const generateDateBetween = (from: Date, to: Date, format: string = DEFAULT_FORMAT) => {
  const fromTime = from.getTime()
  const toTime = to.getTime()

  return dayjs(new Date(fromTime + Math.random() * (toTime - fromTime))).format(format)
}
