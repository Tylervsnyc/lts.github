'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <>
      <div className="lts-logo">
        <Image
          src="/logo.png"
          alt="Learn Through Stories Logo"
          width={180}
          height={180}
          priority
        />
      </div>
      <a href="https://learnstories.substack.com" target="_blank" rel="noopener noreferrer" className="substack-link">
        <Image
          src="/substack.jpg"
          alt="Subscribe on Substack"
          width={140}
          height={140}
          priority
        />
      </a>
    </>
  );
} 