import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'SQL Audit', href: '/audit/sql' },
    { name: 'MongoDB Audit', href: '/audit/mongodb' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Shield className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">DB Audit</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const isSqlRoute = item.href.includes('sql');
              const isMongoRoute = item.href.includes('mongodb');
              
              let activeClasses = '';
              if (isActive) {
                if (isSqlRoute) {
                  activeClasses = 'border-sql-primary text-sql-primary';
                } else if (isMongoRoute) {
                  activeClasses = 'border-mongo-primary text-mongo-primary';
                } else {
                  activeClasses = 'border-indigo-500 text-gray-900';
                }
              } else {
                activeClasses = 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeClasses}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const isSqlRoute = item.href.includes('sql');
              const isMongoRoute = item.href.includes('mongodb');
              
              let activeClasses = '';
              if (isActive) {
                if (isSqlRoute) {
                  activeClasses = 'bg-sql-light border-sql-primary text-sql-primary';
                } else if (isMongoRoute) {
                  activeClasses = 'bg-mongo-light border-mongo-primary text-mongo-primary';
                } else {
                  activeClasses = 'bg-indigo-50 border-indigo-500 text-indigo-700';
                }
              } else {
                activeClasses = 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700';
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${activeClasses}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;