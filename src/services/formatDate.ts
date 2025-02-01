

export function rawDateToLocaleString(date: string): string {
  return new Date(date).toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}

export function getDurationFromRawDateToNow(date: string): string {
  const now = new Date()
  const rawDate = new Date(date)
  const diff = now.getTime() - rawDate.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  if (years > 0) {
    return `${years} tahun yang lalu`
  } else if (months > 0) {
    return `${months} bulan yang lalu`
  } else if (days > 0) {
    return `${days} hari yang lalu`
  } else if (hours > 0) {
    return `${hours} jam yang lalu`
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`
  } else {
    return `${seconds} detik yang lalu`
  }
}