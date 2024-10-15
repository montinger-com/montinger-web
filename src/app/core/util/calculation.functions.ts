export const ttlToMilliseconds = (ttl: string) => ttl.split('d').map(
  step1 => !isNaN(Number(step1)) ? Number(step1) * 24 * 60 * 60 * 1000 : step1.split('h').map(
    step2 => !isNaN(Number(step2)) ? Number(step2) * 60 * 60 * 1000 : step2.split('m').map(
      step3 => !isNaN(Number(step3)) ? Number(step3) * 60 * 1000 : step3.split('s').map(
        step4 => !isNaN(Number(step4)) ? Number(step4) * 1000 : step4.split('u').map(
          step5 => !isNaN(Number(step5)) ? Number(step5) * 1000 : 0
        ).reduce((partialSum, a) => partialSum + a, 0)
      ).reduce((partialSum, a) => partialSum + a, 0)
    ).reduce((partialSum, a) => partialSum + a, 0)
  ).reduce((partialSum, a) => partialSum + a, 0)
)[0] ?? 0

export const getNearestSize = (bytes: number): string => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${Math.round(bytes)} ${units[i]}`
}

export const formatDuration = (seconds: number): string => {
  const years = Math.floor(seconds / 31536000)  // 31536000 seconds in a year
  const days = Math.floor((seconds % 31536000) / 86400)  // 86400 seconds in a day
  const hours = Math.floor((seconds % 86400) / 3600)  // 3600 seconds in an hour
  const minutes = Math.floor((seconds % 3600) / 60)  // 60 seconds in a minute

  const parts: string[] = []
  if (years) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`)
  }

  if (days) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`)
  }

  if (hours) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  }
  
  if (minutes) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
  }

  return parts.join(', ')
}