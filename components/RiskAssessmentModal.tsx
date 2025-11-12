'use client';

import { useState } from 'react';

interface RiskAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answers: Record<string, string>) => void;
}

const questions = [
  {
    id: '1',
    question: 'What is your primary investment goal?',
    options: [
      'Preserve my capital with minimal risk',
      'Generate steady income',
      'Grow my wealth over time',
      'Maximize returns with aggressive growth'
    ]
  },
  {
    id: '2',
    question: 'What is your investment time horizon?',
    options: [
      'Less than 1 year',
      '1-3 years',
      '3-7 years',
      '7+ years'
    ]
  },
  {
    id: '3',
    question: 'How would you react if your portfolio lost 20% in a month?',
    options: [
      'Sell everything immediately',
      'Sell some investments to reduce risk',
      'Hold and wait for recovery',
      'Buy more while prices are low'
    ]
  },
  {
    id: '4',
    question: 'What percentage of your income are you comfortable investing?',
    options: [
      'Less than 5%',
      '5-10%',
      '10-20%',
      'More than 20%'
    ]
  },
  {
    id: '5',
    question: 'How familiar are you with investing?',
    options: [
      'Not familiar at all',
      'Somewhat familiar',
      'Moderately familiar',
      'Very familiar'
    ]
  },
  {
    id: '6',
    question: 'What is your current financial situation?',
    options: [
      'Living paycheck to paycheck',
      'Some savings, but limited',
      'Comfortable with emergency fund',
      'Significant savings and assets'
    ]
  },
  {
    id: '7',
    question: 'How important is it that your investments are easily accessible?',
    options: [
      'Very important - need quick access',
      'Somewhat important',
      'Not very important',
      'Not important - can lock in long-term'
    ]
  },
  {
    id: '8',
    question: 'What is your age range?',
    options: [
      'Under 25',
      '25-35',
      '35-50',
      '50+'
    ]
  },
  {
    id: '9',
    question: 'How do you feel about market volatility?',
    options: [
      'Very uncomfortable - prefer stability',
      'Somewhat uncomfortable',
      'Comfortable with moderate swings',
      'Very comfortable - volatility means opportunity'
    ]
  },
  {
    id: '10',
    question: 'What best describes your investment experience?',
    options: [
      'Never invested before',
      'Invested in savings accounts or CDs only',
      'Some experience with stocks/bonds',
      'Extensive experience with various investments'
    ]
  }
];

export default function RiskAssessmentModal({ isOpen, onClose, onSubmit }: RiskAssessmentModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedAnswer) {
      const questionId = questions[currentQuestion].id;
      setAnswers({ ...answers, [questionId]: selectedAnswer });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[questions[currentQuestion + 1].id] || '');
      } else {
        // Last question - submit
        const finalAnswers = { ...answers, [questionId]: selectedAnswer };
        onSubmit(finalAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const questionId = questions[currentQuestion].id;
      if (selectedAnswer) {
        setAnswers({ ...answers, [questionId]: selectedAnswer });
      }
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || '');
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Investment Risk Assessment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question Content */}
        <div className="px-6 py-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === option
                      ? 'border-gray-900 bg-gray-900'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

