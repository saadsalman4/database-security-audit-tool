import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">DB Audit</span>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Database Security Audit Tool &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              By 21K-4664 Saad Salman
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;