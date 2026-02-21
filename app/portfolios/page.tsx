import PortfolioDashboardClient from './portfolio-dashboard-client'

interface PageProps {
  params: {
    portfolioId: string
  }
}

export default function PortfolioDashboard({ params }: PageProps) {
  return (
      <PortfolioDashboardClient portfolioId={params.portfolioId} />
  )
}