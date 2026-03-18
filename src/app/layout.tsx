import type { Metadata } from 'next';
import './globals.css';
import { DashboardProvider } from '../context/DashboardContext';

export const metadata: Metadata = {
  title: 'Supply Chain Control Tower',
  description: 'Real-time operational intelligence dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DashboardProvider>{children}</DashboardProvider>
      </body>
    </html>
  );
}
