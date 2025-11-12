'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import RiskAssessmentModal from '@/components/RiskAssessmentModal';
import Link from 'next/link';

export default function DashboardPage() {
  const { currentUser, loading, logout } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/auth');
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    // Check if user has completed assessment (you can store this in localStorage or database)
    const assessmentCompleted = localStorage.getItem('riskAssessmentCompleted');
    if (currentUser && !assessmentCompleted) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (assessmentCompleted) {
      setHasCompletedAssessment(true);
    }
  }, [currentUser]);

  const handleAssessmentSubmit = (answers: Record<string, string>) => {
    // Store answers (you can save to database/Firestore here)
    console.log('Risk assessment answers:', answers);
    
    // Mark assessment as completed
    localStorage.setItem('riskAssessmentCompleted', 'true');
    localStorage.setItem('riskAssessmentAnswers', JSON.stringify(answers));
    
    setShowModal(false);
    setHasCompletedAssessment(true);
    
    // You can process the answers here to determine risk profile
    // and generate portfolio recommendations
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            WealthWell AI
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">
              {currentUser.displayName || currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back{currentUser.displayName ? `, ${currentUser.displayName.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-gray-600">
              Your personalized investment dashboard
            </p>
          </div>

          {hasCompletedAssessment ? (
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Investment Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Based on your risk assessment, we're preparing your personalized portfolio recommendations.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem('riskAssessmentCompleted');
                  setHasCompletedAssessment(false);
                  setShowModal(true);
                }}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Complete Your Risk Assessment
              </h2>
              <p className="text-gray-600 mb-6">
                Answer 10 simple questions to get your personalized investment portfolio.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Start Assessment
              </button>
            </div>
          )}

          {/* Placeholder for future dashboard content */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Overview</h3>
              <p className="text-gray-600 text-sm">Coming soon</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
              <p className="text-gray-600 text-sm">Coming soon</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommendations</h3>
              <p className="text-gray-600 text-sm">Coming soon</p>
            </div>
          </div>
        </div>
      </main>

      {/* Risk Assessment Modal */}
      <RiskAssessmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAssessmentSubmit}
      />
    </div>
  );
}

