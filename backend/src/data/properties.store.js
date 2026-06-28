import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'backend', 'src', 'data', 'properties.json')

function readFileSafe() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    return { items: [] }
  }
}

function writeFileSafe(data) {
  const dir = path.dirname(DATA_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export function listProperties() {
  const db = readFileSafe()
  return db.items
}

export function getPropertyById(id) {
  const db = readFileSafe()
  return db.items.find((p) => String(p.id) === String(id))
}

export function updateProperty(id, patch) {
  const db = readFileSafe()
  const idx = db.items.findIndex((p) => String(p.id) === String(id))
  if (idx === -1) return null

  const updated = { ...db.items[idx], ...patch, id: db.items[idx].id }
  db.items[idx] = updated
  writeFileSafe(db)
  return updated
}

