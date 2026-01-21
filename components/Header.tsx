import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial check for theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Active Link Observer
    const sections = document.querySelectorAll('section[id], header[id]'); // Include header for home if it has id="home"
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Profil', href: '#about' },
    { name: 'Program', href: '#programs' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Video', href: '#videos' },
    { name: 'Pendaftaran', href: '#admissions' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy shadow-lg py-3 dark:bg-navy-dark/95 backdrop-blur-sm' : 'bg-transparent py-4'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-10 lg:px-20">
        <div className="flex items-center gap-4 text-white">
          <div className="w-10 h-10 flex items-center">
            <img
              src="https://res.cloudinary.com/dnnuqxs7g/image/upload/v1765542749/LOGONH_jj5r9f.png"
              alt="Logo Nurul Huda Malati"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Nurul Huda Malati
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-end gap-8 items-center">
          <div className="flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium leading-normal transition-all duration-300 relative group ${activeSection === link.href
                  ? 'text-primary font-bold drop-shadow-sm scale-105'
                  : 'text-white/80 hover:text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Toggle Dark Mode"
            >
              <span className="material-symbols-outlined text-[20px] block">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-navy font-bold text-sm hover:bg-white transition-colors">
              <span className="truncate">Login Santri</span>
            </button> */}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[20px] block">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-navy dark:bg-navy-dark shadow-xl border-t border-white/10 p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-base font-medium py-2 transition-colors ${activeSection === link.href ? 'text-primary' : 'text-white/80 hover:text-white'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-navy font-bold text-sm hover:bg-white transition-colors">
            <span className="truncate">Login Santri</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;