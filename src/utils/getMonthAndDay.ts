import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function getMonthAndDay(dateString: string): string {
  const date = new Date(dateString)
  const formatString = 'MMMM d'
  const options = { locale: enUS }

  return format(date, formatString, options)
}
