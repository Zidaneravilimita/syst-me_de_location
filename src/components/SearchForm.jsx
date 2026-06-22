import { locations, serviceTypes } from '../data/listings'

export default function SearchForm({ search, onSearchChange, onSubmit }) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-form__field">
        <label htmlFor="serviceType">Type de location</label>
        <select
          id="serviceType"
          value={search.serviceType}
          onChange={(e) => onSearchChange({ ...search, serviceType: e.target.value })}
        >
          {serviceTypes.map((s) => (
            <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
          ))}
        </select>
      </div>

      <div className="search-form__field">
        <label htmlFor="location">Lieu</label>
        <select
          id="location"
          value={search.location}
          onChange={(e) => onSearchChange({ ...search, location: e.target.value })}
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="search-form__field">
        <label htmlFor="startDate">Date d&apos;arrivée</label>
        <input
          id="startDate"
          type="date"
          min={today}
          value={search.startDate}
          onChange={(e) => onSearchChange({ ...search, startDate: e.target.value })}
          required
        />
      </div>

      <div className="search-form__field">
        <label htmlFor="endDate">Date de départ</label>
        <input
          id="endDate"
          type="date"
          min={search.startDate || today}
          value={search.endDate}
          onChange={(e) => onSearchChange({ ...search, endDate: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn--primary search-form__btn">
        Rechercher
      </button>
    </form>
  )
}
