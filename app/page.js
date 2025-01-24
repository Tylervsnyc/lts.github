'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';

export default function Home() {
  const router = useRouter();
  
  const handleAgeSelect = (age) => {
    router.push(`/quiz?age=${age}`);
  };

  return (
    <div className="watercolor-background">
      <Header />
      <div className="container">
        <div className="title-container">
          <h1 className="watercolor-text">
            Select Your Age Range
          </h1>
        </div>
        
        <div className="age-select-box">
          <div className="age-options">
            <button 
              className="age-button goof-answer" 
              onClick={() => handleAgeSelect('kid')}
            >
              I&apos;m a Kid!
            </button>
            <button 
              className="age-button real-answer" 
              onClick={() => handleAgeSelect('adult')}
            >
              I&apos;m a Grown-Up
            </button>
          </div>
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

