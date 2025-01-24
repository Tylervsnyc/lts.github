'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import Header from '../components/Header';

export default function Certificate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certificateRef = useRef(null);
  
  const name = searchParams.get('name');
  const score = parseInt(searchParams.get('score'));
  const total = parseInt(searchParams.get('total'));
  
  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const link = document.createElement('a');
      link.download = `${name}-certificate.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const returnHome = () => {
    router.push('/');
  };

  return (
    <div className="watercolor-background">
      <Header />
      <div className="container">
        <div className="certificate" ref={certificateRef}>
          <div className="certificate-text">
            <div className="student-name">{name}</div>
            <div className="certificate-details">
              has completed Chapter <span className="chapter-number">1</span>
              <br />
              with a score of {score}/{total}!
            </div>
          </div>
        </div>

        <div className="certificate-buttons">
          <button 
            className="certificate-download-btn"
            onClick={downloadCertificate}
          >
            Download Certificate
          </button>
          
          <button 
            className="return-home-btn"
            onClick={returnHome}
          >
            Return Home
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