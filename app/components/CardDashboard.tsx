'use client';

import { useState, useEffect } from 'react';
import type { Person } from '@/lib/data';
import Card from './Card';
import AddCardModal from './AddCardModal';
import EditCardModal from './EditCardModal';
import { Button, Flex, Box } from '@chakra-ui/react';

export default function CardDashboard() {
  const [cards, setCards] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/cards');
        if (!res.ok) throw new Error('Erro ao buscar cards');
        const data = await res.json();

        // Ordena principal primeiro
        data.sort((a: Person, b: Person) => (b.isPrincipal ? 1 : 0) - (a.isPrincipal ? 1 : 0));
        setCards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const handleToggleDownloaded = async (cpf: string) => {
    const card = cards.find(c => c.cpf === cpf);
    if (!card) return;
    try {
      const res = await fetch(`/api/cards/${cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloaded: !card.downloaded }),
      });
      if (!res.ok) throw new Error('Erro ao atualizar card');
      const updated = await res.json();
      setCards(cards.map(c => (c.cpf === cpf ? updated : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCard = async (newCard: Omit<Person, 'id' | 'downloaded' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      if (!res.ok) throw new Error('Erro ao adicionar card');
      const added = await res.json();
      setCards([added, ...cards]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (person: Person) => setEditPerson(person);

  const handleUpdate = (updated: Person) => {
    setCards(cards.map(c => (c.cpf === updated.cpf ? updated : c)));
    setEditPerson(null);
  };

  const handleDelete = async (cpf: string) => {
    const password = prompt('Digite a senha de administrador:');
    if (!password) return;

    try {
      const res = await fetch(`/api/cards/${cpf}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Erro ao deletar');
        return;
      }
      setCards(cards.filter(c => c.cpf !== cpf));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar');
    }
  };

  if (isLoading) return <div className="text-center p-10">Carregando dados...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Erro: {error}</div>;

  return (
    <>
      {/* Botão Add Card */}
      <Flex justify="flex-end" mb={8}>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Adicionar Novo Card
        </Button>
      </Flex>

      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddCard={handleAddCard} />
      {editPerson && (
        <EditCardModal
          isOpen={!!editPerson}
          person={editPerson}
          onClose={() => setEditPerson(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Grid responsivo definitivo */}
      <Box w="full">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
          suppressHydrationWarning
        >
          {cards.map(person => (
            <Card
              key={person.cpf}
              person={person}
              onToggleDownloaded={handleToggleDownloaded}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Box>
    </>
  );
}
