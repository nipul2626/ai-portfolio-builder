import SettingsClient from './settings-client'

interface SettingsPageProps {
  params: Promise<{
    portfolioId: string
  }>
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { portfolioId } = await params

  return <SettingsClient portfolioId={portfolioId} />
}