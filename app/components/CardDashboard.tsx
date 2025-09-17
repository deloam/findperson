'use client';

import { useEffect, useState } from 'react';
import type { Person } from '@/lib/data';
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  useDisclosure,
  Spinner,
  Center,
} from '@chakra-ui/react';
import Card from './Card';
import AddCardModal from './AddCardModal';
import EditCardModal from './EditCardModal';

export default function CardDashboard() {
  const [cards, setCards] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const { isOpen: isAddOpen, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const sortCards = (cardsArray: Person[]) =>
    [...cardsArray].sort((a, b) => (b.isPrincipal ? 1 : 0) - (a.isPrincipal ? 1 : 0));

  // Fetch inicial
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch('/api/cards');
        if (!res.ok) throw new Error('Erro ao carregar cards');
        const data: Person[] = await res.json();
        setCards(sortCards(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Adicionar card
  const handleAddCard = async (
    newCard: Omit<Person, 'downloaded' | 'id' | 'createdAt'>
  ) => {
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });

      if (!res.ok) throw new Error('Erro ao adicionar card');

      const created: Person = await res.json();
      setCards(sortCards([created, ...cards]));
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle downloaded
  const handleToggleDownloaded = async (cpf: string) => {
    try {
      const person = cards.find((c) => c.cpf === cpf);
      if (!person) return;

      const res = await fetch(`/api/cards/${cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloaded: !person.downloaded }),
      });

      if (!res.ok) throw new Error('Erro ao atualizar card');

      const updated: Person = await res.json();
      setCards(sortCards(cards.map((c) => (c.cpf === cpf ? updated : c))));
    } catch (error) {
      console.error(error);
    }
  };

  // Deletar card
  const handleDelete = async (cpf: string, password: string) => {
    try {
      const res = await fetch(`/api/cards/${cpf}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao deletar card');
      }

      setCards(cards.filter((c) => c.cpf !== cpf));
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || 'Erro desconhecido');
      } else {
        alert('Erro desconhecido');
      }
    }
  };

  // Editar card
  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    onOpenEdit();
  };

  // Atualizar card após edição
  const handleUpdateCard = (updated: Person) => {
    setCards(sortCards(cards.map((c) => (c.cpf === updated.cpf ? updated : c))));
  };

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Button colorScheme="blue" onClick={onOpenAdd} mb={6}>
        Adicionar Novo
      </Button>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {cards.map((person) => (
          <Card
            key={person.cpf}
            person={person}
            onToggleDownloaded={handleToggleDownloaded}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </SimpleGrid>

      <AddCardModal isOpen={isAddOpen} onClose={onCloseAdd} onAddCard={handleAddCard} />
      {editingPerson && (
        <EditCardModal
          isOpen={isEditOpen}
          onClose={onCloseEdit}
          person={editingPerson}
          onUpdate={handleUpdateCard}
        />
      )}
    </Box>
  );
}
