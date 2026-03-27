import LoyaltyCardWrapper from '@/components/LoyaltyCardWrapper'

export default async function LoyaltyCardPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <LoyaltyCardWrapper code={code} />
      </div>
    </div>
  )
}
