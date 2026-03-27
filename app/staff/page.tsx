import StaffScanner from '@/components/StaffScanner';

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-100 text-center mb-8">
          Staff Scanner
        </h1>
        <StaffScanner />
      </div>
    </div>
  );
}
