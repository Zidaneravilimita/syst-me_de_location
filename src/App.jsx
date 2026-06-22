import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ListingList from './components/ListingList'
import Features, { ServiceShowcase } from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { listings as allListings, locations } from './data/listings'

function getDefaultDates() {
  const start = new Date()
  start.setDate(start.getDate() + 1)
  const end = new Date(start)
  end.setDate(end.getDate() + 3)
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  }
}

export default function App() {
  const defaults = getDefaultDates()
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState({
    serviceType: 'all',
    location: locations[0],
    startDate: defaults.startDate,
    endDate: defaults.endDate,
  })
  const [activeService, setActiveService] = useState('all')
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const [locationFilter, setLocationFilter] = useState(null)
  const [selectedListing, setSelectedListing] = useState(null)

  const handleServiceChange = (serviceId) => {
    setActiveService(serviceId)
    setActiveSubcategory('all')
    if (serviceId !== 'all') {
      setSearch((prev) => ({ ...prev, serviceType: serviceId }))
    }
  }

  const filteredListings = allListings.filter((item) => {
    const matchService = activeService === 'all' || item.serviceType === activeService
    const matchSubcategory = activeSubcategory === 'all' || item.category === activeSubcategory
    const matchLocation = !locationFilter || item.location === locationFilter
    return matchService && matchSubcategory && matchLocation
  })

  const scrollToListings = () => {
    const service = search.serviceType
    if (service !== 'all') {
      setActiveService(service)
      setActiveSubcategory('all')
    }
    setLocationFilter(search.location)
    document.getElementById('annonces')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (page === 'login') {
    return <LoginPage onNavigate={setPage} />
  }

  if (page === 'register') {
    return <RegisterPage onNavigate={setPage} />
  }

  return (
    <>
      <Header onNavigate={setPage} />
      <main>
        <Hero
          search={search}
          onSearchChange={setSearch}
          onSearch={scrollToListings}
        />
        <ListingList
          listings={filteredListings}
          activeService={activeService}
          activeSubcategory={activeSubcategory}
          onServiceChange={handleServiceChange}
          onSubcategoryChange={setActiveSubcategory}
          onBook={setSelectedListing}
        />
        <ServiceShowcase />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
      <BookingModal
        listing={selectedListing}
        search={search}
        onClose={() => setSelectedListing(null)}
      />
    </>
  )
}
