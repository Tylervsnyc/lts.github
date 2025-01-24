import './globals.css';

export const metadata = {
  title: 'Learn Through Stories',
  description: 'Interactive learning through storytelling',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
