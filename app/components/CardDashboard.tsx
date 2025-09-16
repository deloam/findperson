'use client';

import { useState, useEffect } from 'react';
import type { Person } from '@/lib/data'; // We can still use the type definition
import Card from './Card';
import AddCardModal from './AddCardModal';

export default function CardDashboard() {
  const [cards, setCards] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cards');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleToggleDownloaded = async (cpf: string) => {
    const card = cards.find(c => c.cpf === cpf);
    if (!card) return;

    const updatedStatus = !card.downloaded;

    try {
      const response = await fetch(`/api/cards/${cpf}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ downloaded: updatedStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update card');
      }

      const updatedCard = await response.json();
      setCards(cards.map(c => (c.cpf === cpf ? updatedCard : c)));

    } catch (err) {
      // Here you might want to revert the optimistic update or show an error toast
      console.error(err);
    }
  };

  const handleAddCard = async (newCardData: Omit<Person, 'id' | 'downloaded' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCardData),
      });

      if (!response.ok) {
        throw new Error('Failed to add card');
      }

      const newlyAddedCard = await response.json();
      setCards([newlyAddedCard, ...cards]);
      setIsModalOpen(false); // Close modal on success

    } catch (err) {
      console.error(err);
      // Optionally, show an error message in the modal
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Carregando dados...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar dados: {error}</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Adicionar Novo Card
        </button>
      </div>

      <AddCardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />

      <main
        id="cards-container"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {cards.map((person) => (
          <Card 
            key={person.cpf} 
            person={person} 
            onToggleDownloaded={handleToggleDownloaded} 
          />
        ))}
      </main>
    </>
  );
}