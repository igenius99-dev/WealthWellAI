'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && currentUser) {
      router.push('/dashboard');
    }
  }, [currentUser, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Don't render landing page if user is authenticated (will redirect)
  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">WealthWell AI</div>
          <div className="hidden md:flex space-x-8">
          
          </div>
          <Link href="/auth" className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Investing Made
            <span className="block text-gray-600">Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Answer a few simple questions about yourself, and our AI creates a personalized investment portfolio tailored to your goals and risk tolerance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
              Start Your Assessment
            </Link>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to your personalized investment portfolio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Answer Questions</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete a quick 10-15 question assessment about your financial goals, timeline, and risk comfort level.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI analyzes your responses to determine your optimal risk profile and investment strategy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Your Portfolio</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a custom portfolio recommendation with specific investments tailored to your unique profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose WealthWell AI</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We remove the complexity from investing so you can focus on what matters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Financial Jargon</h3>
              <p className="text-gray-600">
                We ask simple, everyday questions instead of confusing financial terms. No need to understand complex investment concepts.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Advanced artificial intelligence analyzes your profile to create the most suitable investment strategy for your situation.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Portfolios</h3>
              <p className="text-gray-600">
                Every portfolio is uniquely crafted based on your individual goals, timeline, and comfort with risk.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick & Easy</h3>
              <p className="text-gray-600">
                Complete your assessment in just 5 minutes and get your personalized investment recommendations instantly.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Process</h3>
              <p className="text-gray-600">
                We explain exactly how your portfolio was created and why each investment was chosen for you.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Your portfolio evolves with your life changes. Update your profile anytime to get new recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Investing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their investment journey with WealthWell AI.
          </p>
          <Link href="/auth" className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
            Begin Your Assessment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-4">WealthWell AI</div>
              <p className="text-gray-600">
                Making investing accessible to everyone through the power of AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 WealthWell AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
