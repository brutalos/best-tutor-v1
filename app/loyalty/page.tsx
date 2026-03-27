import { Gift, Star, Award, UserPlus, BookOpen, Trophy, Stamp } from 'lucide-react';
import LoyaltySignupForm from '@/components/LoyaltySignupForm';

export const metadata = {
  title: 'Loyalty Rewards Program | BestTutor',
  description: 'Join the BestTutor loyalty program. Earn a free tutoring session after every 10 sessions with our digital punch card.',
};

export default function LoyaltyPage() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Register with your name and email to get your digital punch card instantly.',
    },
    {
      icon: BookOpen,
      title: 'Attend Sessions',
      description: 'Each tutoring session earns you a stamp on your digital punch card.',
    },
    {
      icon: Trophy,
      title: 'Earn Free Sessions',
      description: 'After 10 stamps, you earn a FREE tutoring session! The card resets and you keep going.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
            <Gift className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Rewards Program</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 leading-tight">
            Loyalty Rewards{' '}
            <span className="text-accent">Program</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Every session brings you closer to a free one. Get your digital punch card,
            track your progress, and earn free tutoring sessions as a thank you for your loyalty.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span>10 sessions = 1 free</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              <span>Digital punch card</span>
            </div>
            <div className="flex items-center gap-2">
              <Stamp className="w-4 h-4 text-accent" />
              <span>Track online</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-4">
            How It Works
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">
            Three simple steps to start earning free sessions
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center hover:border-accent/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Punch Card Preview */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-100 mb-2">
            Your Digital Punch Card
          </h2>
          <p className="text-center text-slate-400 mb-8 text-sm">
            Here&apos;s what your loyalty card looks like
          </p>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100">BestTutor Rewards</p>
                <p className="text-xs text-slate-500">Sample Card</p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-4">
              {Array.from({ length: 10 }).map((_, i) => {
                const isFilled = i < 4; // Show 4 of 10 filled as preview
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-full flex items-center justify-center border-2 ${
                      isFilled
                        ? 'bg-accent/20 border-accent'
                        : 'bg-slate-900/50 border-slate-600'
                    }`}
                  >
                    {isFilled ? (
                      <Star className="w-5 h-5 text-accent fill-accent" />
                    ) : (
                      <span className="text-slate-600 text-xs">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-500">
              6 more sessions until a free session!
            </p>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="py-16 px-4" id="signup">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-2">
            Get Started Today
          </h2>
          <p className="text-center text-slate-400 mb-8">
            Sign up now to receive your digital punch card
          </p>

          <LoyaltySignupForm />
        </div>
      </section>
    </div>
  );
}
