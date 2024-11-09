// pages/index.js
import AnalyticsDashboard from '../components/AnalyticsDashboard'
import SupermarketAnalytics from '../components/SupermarketAnalytics.js';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AnalyticsDashboard />
    </main>
  )
}