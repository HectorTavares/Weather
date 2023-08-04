import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function dateFormat(dateString: string): string {
  const date = new Date(dateString)
  const formatString = "HH:mm - EEEE, MMM d ''yy"
  const options = { locale: enUS }

  return format(date, formatString, options)
}
