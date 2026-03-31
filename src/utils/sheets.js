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

// Map known Drive file IDs to local assets
const localAssets = {
  '1Sfwmal5Av1Ua6n_n8B4ghUfosGOnaAC8': '/assets/posters/ball.jpg',
  '117o8hBYxgoT8LEnt6KkOllD34hxNhXJB': '/assets/posters/hagar.png',
}

function driveImageUrl(url) {
  if (!url) return ''
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) {
    // Use local file if available, otherwise try Drive URL
    return localAssets[match[1]] || `https://drive.google.com/uc?export=view&id=${match[1]}`
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
      title_en: row['title_en'] || '',
      title_ar: row['title_ar'] || '',
      artist: row['artist'] || row['אמן'] || '',
      artist_en: row['artist_en'] || '',
      artist_ar: row['artist_ar'] || '',
      description: row['description'] || row['תיאור'] || '',
      description_en: row['description_en'] || '',
      description_ar: row['description_ar'] || '',
      youtubeId: youtubeId(row['youtube_url'] || row['קישור'] || ''),
      month: row['month'] || row['חודש'] || '',
      month_en: row['month_en'] || '',
      month_ar: row['month_ar'] || '',
      artist_bio: row['artist_bio'] || '',
      artist_bio_en: row['artist_bio_en'] || '',
      artist_bio_ar: row['artist_bio_ar'] || '',
      artist_photo: driveImageUrl(row['artist_photo'] || ''),
      artist_email: row['artist_email'] || '',
      year: row['year'] || '',
      duration: row['duration'] || '',
      featured: (row['featured'] || '').toUpperCase() === 'TRUE',
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
      title_en: row['title_en'] || '',
      title_ar: row['title_ar'] || '',
      artist: row['artist'] || row['אמן'] || '',
      artist_en: row['artist_en'] || '',
      artist_ar: row['artist_ar'] || '',
      description: row['description'] || row['תיאור'] || '',
      description_en: row['description_en'] || '',
      description_ar: row['description_ar'] || '',
      youtubeId: youtubeId(row['youtube_url'] || ''),
      imageUrl: driveImageUrl(row['image_url'] || ''),
      videoUrl: driveVideoUrl(row['video_url'] || ''),
      instagramUrl: row['instagram_url'] || '',
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

export async function fetchEvents() {
  if (!SHEET_ID) return []
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Events`
    const res = await fetch(url)
    const csv = await res.text()
    const rows = csvToArray(csv)
    return rows.map((row, i) => ({
      id: i + 1,
      title: row['title'] || row['כותרת'] || '',
      title_en: row['title_en'] || '',
      title_ar: row['title_ar'] || '',
      date: row['date'] || row['תאריך'] || '',
      time: row['time'] || row['שעה'] || '',
      location: row['location'] || row['מיקום'] || '',
      location_en: row['location_en'] || '',
      location_ar: row['location_ar'] || '',
      description: row['description'] || row['תיאור'] || '',
      description_en: row['description_en'] || '',
      description_ar: row['description_ar'] || '',
      imageUrl: driveImageUrl(row['image_url'] || ''),
    })).filter(e => e.title)
  } catch (e) {
    console.error('Failed to fetch events:', e)
    return []
  }
}

export async function fetchPosters() {
  if (!SHEET_ID) return []
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=730644176`
    const res = await fetch(url)
    const csv = await res.text()
    const rows = csvToArray(csv)
    return rows.map((row, i) => ({
      id: i + 1,
      title: row['title'] || row['כותרת'] || '',
      title_en: row['title_en'] || '',
      title_ar: row['title_ar'] || '',
      description: row['description'] || row['תיאור'] || '',
      description_en: row['description_en'] || '',
      description_ar: row['description_ar'] || '',
      startDate: row['start_date'] || '',
      endDate: row['end_date'] || '',
      imageUrl: driveImageUrl(row['image_url'] || row['קישור_תמונה'] || ''),
    })).filter(p => p.imageUrl)
  } catch (e) {
    console.error('Failed to fetch posters:', e)
    return []
  }
}

