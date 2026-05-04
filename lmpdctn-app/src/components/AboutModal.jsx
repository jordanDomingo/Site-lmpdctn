import React from 'react';
import { X } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeInUp">
      <div className="bg-white text-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative flex flex-col transform transition-all duration-300">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gradient">À propos de LMPDCTN</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Bienvenue chez LMPDCTN — boutique urbaine, sélection de pièces stylées et abordables.
          Nous mettons l'accent sur la qualité, le confort et la rapidité de livraison.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
          <li>Collections renouvelées régulièrement</li>
          <li>Livraison express disponible</li>
          <li>Politique de retour simple</li>
        </ul>
        <div className="text-center mt-auto">
          <button 
            onClick={onClose}
            className="btn-primary px-6 py-2 rounded-lg font-semibold w-full sm:w-auto"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
