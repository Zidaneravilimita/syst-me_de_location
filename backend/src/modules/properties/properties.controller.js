import { validatePropertyUpdate } from './properties.schema.js'
import * as service from './properties.service.js'

export function listProperties(req, res) {
  const items = service.list()
  res.json({ items })
}

export function updateProperty(req, res) {
  const id = req.params.id
  const check = validatePropertyUpdate(req.body)
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }

  const updated = service.updateById(id, check.value)
  if (!updated) {
    return res.status(404).json({ error: 'Annonce introuvable' })
  }

  res.json({ item: updated })
}

