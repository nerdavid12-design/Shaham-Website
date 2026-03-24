// Paste your Google Sheet ID here (the long string from the sheet URL)
const SHEET_ID = '1H8Ektl7zI1f_hXMdOGsKqWZFQfEw1sqM167Jegf4BbE'

function csvToArray(csv) {
  const rows = parseCSV(csv)
  if (rows.length < 2) return []

  const headers = rows[0].map(h => h.trim())
  return rows.slice(1).map(values => {
    const obj = {}
    headers.forEach((header, i) => {
      obj[header] = (values[i] || '').trim()
    })
    return obj
  }).filter(row => Object.values(row).some(v => v))
}

function parseCSV(csv) {
  const rows = []
  let current = ''
  let inQuotes = false
  let row = []

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i]
    if (char === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current)
      current = ''
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && csv[i + 1] === '\n') i++
      row.push(current)
      current = ''
      if (row.some(v => v.trim())) rows.push(row)
      row = []
    } else {
      current += char
    }
  }
  row.push(current)
  if (row.some(v => v.trim())) rows.push(row)
  return rows
}

function driveImageUrl(url) {
  if (!url) return ''
  // Convert Google Drive share links to direct image URLs
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`
  }
  return url
}

function driveVideoUrl(url) {
  if (!url) return ''
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  return url
}

function youtubeId(url) {
  if (!url) return ''
  // Handle various YouTube URL formats
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return url // Maybe it's already just an ID
}

export async function fetchVideos() {
  if (!SHEET_ID) return []
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`
    const res = await fetch(url)
    const csv = await res.text()
    const rows = csvToArray(csv)
    return rows.map((row, i) => ({
      id: i + 1,
      title: row['title'] || row['כותרת'] || '',
      artist: row['artist'] || row['אמן'] || '',
      description: row['description'] || row['תיאור'] || '',
      youtubeId: youtubeId(row['youtube_url'] || row['קישור'] || ''),
    })).filter(v => v.youtubeId)
  } catch (e) {
    console.error('Failed to fetch videos:', e)
    return []
  }
}

export async function fetchNowShowing() {
  if (!SHEET_ID) return []
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=NowShowing`
    const res = await fetch(url)
    const csv = await res.text()
    const rows = csvToArray(csv)
    return rows.map((row, i) => ({
      id: i + 1,
      title: row['title'] || row['כותרת'] || '',
      artist: row['artist'] || row['אמן'] || '',
      description: row['description'] || row['תיאור'] || '',
      youtubeId: youtubeId(row['youtube_url'] || ''),
      imageUrl: driveImageUrl(row['image_url'] || ''),
      videoUrl: driveVideoUrl(row['video_url'] || ''),
    }))
  } catch (e) {
    console.error('Failed to fetch now showing:', e)
    return []
  }
}

export async function fetchHeroVideo() {
  if (!SHEET_ID) return ''
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1075446200`
    const res = await fetch(url)
    const csv = await res.text()
    const rows = csvToArray(csv)
    if (rows.length === 0) return ''
    const raw = rows[0]['video_url'] || ''
    // Extract Drive file ID and return preview embed URL
    const match = raw.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return match[1]
    }
    return raw
  } catch (e) {
    console.error('Failed to fetch hero video:', e)
    return ''
  }
}

export async function fetchPosters() {
  if (!SHEET_ID) return []
  try {
    // gid for the second sheet — we'll use sheet name instead
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=730644176`
    const res = await fetch(url)
    const csv = await res.text()
    const rows = csvToArray(csv)
    return rows.map((row, i) => ({
      id: i + 1,
      title: row['title'] || row['כותרת'] || '',
      imageUrl: driveImageUrl(row['image_url'] || row['קישור_תמונה'] || ''),
    })).filter(p => p.imageUrl)
  } catch (e) {
    console.error('Failed to fetch posters:', e)
    return []
  }
}

