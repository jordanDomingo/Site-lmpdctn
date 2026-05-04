import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fadeInUp">
      <h1 className="text-8xl font-black text-gradient opacity-80 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Page Introuvable</h2>
      <p className="text-gray-400 max-w-md mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée. 
        Revenez à l'accueil pour continuer votre shopping.
      </p>
      <Link to="/" className="btn-primary px-8 py-3 rounded-xl font-bold text-lg">
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
