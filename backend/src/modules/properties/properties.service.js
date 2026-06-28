import { getPropertyById, listProperties, updateProperty } from '../../data/properties.store.js'

export function list() {
  return listProperties()
}

export function getById(id) {
  return getPropertyById(id)
}

export function updateById(id, patch) {
  return updateProperty(id, patch)
}

