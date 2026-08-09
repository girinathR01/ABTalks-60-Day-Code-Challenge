import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RouteMapBar } from './components/RouteMapBar';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ChallengeDay } from './components/ChallengeDay';
import { DeveloperStatsPage } from './components/DeveloperStatsPage';
import { DeveloperDirectory } from './components/DeveloperDirectory';
import { DeveloperProfile } from './components/DeveloperProfile';
import { LeaderboardPage } from './components/LeaderboardPage';
import { SubmissionsHistoryPage } from './components/SubmissionsHistoryPage';
import { ChallengesCatalogPage } from './components/ChallengesCatalogPage';
import { AchievementsPage } from './components/AchievementsPage';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

const AppRouter: React.FC = () => {
  const { currentPath } = useApp();

  const renderCurrentView = () => {
    if (currentPath === '/dashboard') {
      return <Dashboard />;
    }
    if (currentPath.startsWith('/day/')) {
      return <ChallengeDay />;
    }
    if (currentPath === '/statistics' || currentPath === '/stats') {
      return <DeveloperStatsPage />;
    }
    if (currentPath === '/developers') {
      return <DeveloperDirectory />;
    }
    if (currentPath.startsWith('/developers/')) {
      const usernameParam = currentPath.split('/developers/')[1];
      return <DeveloperProfile usernameParam={usernameParam} />;
    }
    if (currentPath === '/profile') {
      return <DeveloperProfile />;
    }
    if (currentPath === '/leaderboard') {
      return <LeaderboardPage />;
    }
    if (currentPath === '/submissions') {
      return <SubmissionsHistoryPage />;
    }
    if (currentPath === '/challenges') {
      return <ChallengesCatalogPage />;
    }
    if (currentPath === '/achievements') {
      return <AchievementsPage />;
    }
    return <LandingPage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#08090d] text-slate-100">
      <RouteMapBar />
      <Header />
      <main className="flex-1">{renderCurrentView()}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
