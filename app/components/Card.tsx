'use client';

import type { Person } from '@/lib/data';

interface CardProps {
  person: Person;
  onToggleDownloaded: (cpf: string) => void;
}

export default function Card({ person, onToggleDownloaded }: CardProps) {
  const borderClass = person.isPrincipal ? 'border-blue-500' : 'border-gray-200';
  const badgeClass = person.isPrincipal
    ? 'bg-blue-500 text-white'
    : 'bg-gray-200 text-gray-600';

  return (
    <div
      className={`card bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 ${borderClass}`}
      style={{ animation: 'fadeIn 0.5s ease-out forwards' }} // Apply animation
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 capitalize">
          {person.nome.toLowerCase()}
        </h2>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">CPF:</span>
          <span className="font-mono">{person.cpf}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Ligação:</span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${badgeClass}`}
          >
            {person.parentesco}
          </span>
        </div>

        {person.isPrincipal && (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Mãe:</span>
              <span className="text-right capitalize">
                {person.mae?.toLowerCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Nascimento:</span>
              <span>{person.nascimento}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Profissão:</span>
              <span className="text-right">{person.profissao}</span>
            </div>
          </> 
        )}

        <div className="border-t border-gray-200 pt-3 mt-3">
            <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-500 font-medium">Dados Baixados</span>
                <input 
                    type="checkbox" 
                    checked={person.downloaded}
                    onChange={() => onToggleDownloaded(person.cpf)}
                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                />
            </label>
        </div>

      </div>
    </div>
  );
}
