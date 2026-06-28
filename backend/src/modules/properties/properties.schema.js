export const PROPERTY_UPDATE_FIELDS = [
  'title',
  'description',
  'price',
  'currency',
  'image',
  'status',
  'available',
  'category',
  'serviceType',
  'priceUnit',
  'location'
]

const STATUS_VALUES = ['published', 'pending', 'rejected', 'unavailable']

export function validatePropertyUpdate(payload) {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Payload invalide' }
  }

  const unknownKeys = Object.keys(payload).filter((k) => !PROPERTY_UPDATE_FIELDS.includes(k))
  if (unknownKeys.length) {
    return { ok: false, error: `Champs inconnus: ${unknownKeys.join(', ')}` }
  }

  if ('status' in payload) {
    if (!STATUS_VALUES.includes(payload.status)) {
      return { ok: false, error: `status invalide: ${payload.status}` }
    }
  }

  if ('available' in payload && typeof payload.available !== 'boolean') {
    return { ok: false, error: 'available doit être un booléen' }
  }

  if ('price' in payload && (typeof payload.price !== 'number' || Number.isNaN(payload.price) || payload.price < 0)) {
    return { ok: false, error: 'price doit être un nombre >= 0' }
  }

  // title/description/image/location: optionnel, mais si présents -> string
  for (const key of ['title', 'description', 'image', 'category', 'serviceType', 'priceUnit', 'location', 'currency']) {
    if (key in payload && typeof payload[key] !== 'string') {
      return { ok: false, error: `${key} doit être une string` }
    }
  }

  return { ok: true, value: payload }
}

