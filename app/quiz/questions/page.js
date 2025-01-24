'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function QuizQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const name = searchParams.get('name');
  const age = searchParams.get('age');

  useEffect(() => {
    // In a real app, this would fetch from an API
    const quizQuestions = age === 'kid' ? [
      {
        question: "What does a cat say?",
        choices: ["Woof!", "Meow!", "Moo!", "Tweet!"],
        correctAnswer: 1
      },
      // Add more kid questions
    ] : [
      {
        question: "What is the average lifespan of a house cat?",
        choices: ["5-8 years", "10-15 years", "15-20 years", "20-25 years"],
        correctAnswer: 2
      },
      // Add more adult questions
    ];
    
    setQuestions(quizQuestions);
    setLoading(false);
  }, [age]);

  const handleAnswer = (choiceIndex) => {
    const correct = choiceIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push(`/certificate?name=${encodeURIComponent(name)}&score=${score}&total=${questions.length}`);
      }
    }, 1500);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="watercolor-background">
      <div className="container">
        <div className="quiz-content">
          <div className="progress-tracker">
            <div className="tracker-steps">
              {questions.map((_, index) => (
                <div 
                  key={index} 
                  className={`tracker-step ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-label">Q{index + 1}</div>
                </div>
              ))}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-container">
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
            <div className="choices-container">
              {questions[currentQuestion].choices.map((choice, index) => (
                <button
                  key={index}
                  className="choice-button"
                  onClick={() => handleAnswer(index)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div className={`feedback-container ${isCorrect ? 'correct' : 'incorrect'} visible`}>
              {isCorrect ? "Purr-fect! That's correct!" : "Oops! Not quite right."}
            </div>
          )}
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