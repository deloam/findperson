'use client';

import { useState, FormEvent } from 'react';
import type { Person } from '@/lib/data';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (newCard: Omit<Person, 'downloaded'>) => void;
}

export default function AddCardModal({ isOpen, onClose, onAddCard }: AddCardModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    parentesco: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddCard({ ...formData, isPrincipal: false });
    onClose(); // Close modal after submission
    // Reset form for next time
    setFormData({ nome: '', cpf: '', parentesco: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Adicionar Novo Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
              <input
                type="text"
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="parentesco" className="block text-sm font-medium text-gray-700">Parentesco</label>
              <input
                type="text"
                id="parentesco"
                value={formData.parentesco}
                onChange={(e) => setFormData({ ...formData, parentesco: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
