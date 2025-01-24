'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../components/Header';

export default function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentName, setStudentName] = useState('');
  const [isStartButtonEnabled, setIsStartButtonEnabled] = useState(false);
  const age = searchParams.get('age');

  useEffect(() => {
    setIsStartButtonEnabled(studentName.trim().length > 0);
  }, [studentName]);

  const handleStartQuiz = () => {
    if (studentName.trim()) {
      router.push(`/quiz/questions?name=${encodeURIComponent(studentName)}&age=${age}`);
    }
  };

  return (
    <div className="watercolor-background">
      <Header />
      <div className="container">
        <div className="welcome-message">
          <div className="fluffbutt-message">
            {age === 'kid' ? 
              "Hi there, young explorer! I'm so excited to go on this learning adventure with you!" :
              "Welcome! Ready to embark on a fun learning journey?"}
          </div>
          
          <div className="name-input">
            <input
              type="text"
              id="student-name"
              placeholder="Enter your first name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              maxLength="20"
            />
          </div>

          <button
            id="start-button"
            disabled={!isStartButtonEnabled}
            onClick={handleStartQuiz}
          >
            Start the Quiz!
          </button>
        </div>
      </div>

      {/* Watercolor splashes */}
      <div className="splash splash1"></div>
      <div className="splash splash2"></div>
      <div className="splash splash3"></div>
      <div className="splash splash4"></div>
      <div className="splash splash5"></div>
    </div>
  );
} 