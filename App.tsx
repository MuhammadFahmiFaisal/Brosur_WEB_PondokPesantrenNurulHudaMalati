import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import NewsFeature from './components/NewsFeature';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import VideoGallery from './components/VideoGallery';
import AdmissionsInfo from './components/AdmissionsInfo';
import Facilities from './components/Facilities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';

const LandingPage: React.FC = () => {
  const [showRegistration, setShowRegistration] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero onRegisterClick={() => setShowRegistration(true)} />
        <About />
        <WhyChooseUs />
        <NewsFeature />
        <Programs />
        <Gallery />
        <VideoGallery />
        <AdmissionsInfo />
        <Facilities />
        <Contact onRegisterClick={() => setShowRegistration(true)} />
      </main>
      <Footer />

      {/* Registration Modal Overlay */}
      {showRegistration && (
        <React.Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center text-white">Loading...</div>}>
          <RegistrationForm onClose={() => setShowRegistration(false)} />
        </React.Suspense>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;