const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const data = await res.json()
      message = data?.error || data?.message || message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return res.json()
}

export async function fetchProperties() {
  const data = await request('/properties')
  return data?.items ?? []
}

export async function updateProperty(id, patch) {
  const data = await request(`/properties/${id}`, { method: 'PUT', body: patch })
  return data?.item
}

