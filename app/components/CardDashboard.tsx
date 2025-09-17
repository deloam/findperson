'use client';

import { useState, useEffect } from 'react';
import type { Person } from '@/lib/data';
import Card from './Card';
import AddCardModal from './AddCardModal';
import EditCardModal from './EditCardModal'; // Assuming this component exists or will be created
import {
  Button,
  Flex,
  Box,
  SimpleGrid, // For the grid layout
  Spinner,    // For loading state
  Alert,      // For error state
  AlertIcon,  // For error state
  Center,     // For centering loading/error
  Text,       // For loading/error messages
  useToast,   // For notifications
} from '@chakra-ui/react';

export default function CardDashboard() {
  const [cards, setCards] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast(); // Initialize useToast

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
        toast({
          title: 'Erro ao carregar dados.',
          description: err instanceof Error ? err.message : 'Erro desconhecido.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
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
      const res = await fetch(`/api/cards/${cpf}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ downloaded: !card.downloaded }),
        }
      );

      if (!res.ok) throw new Error('Erro ao atualizar card');
      const updated = await res.json();
      setCards(cards.map(c => (c.cpf === cpf ? updated : c)));
      toast({
        title: 'Card atualizado.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao atualizar card.',
        description: err instanceof Error ? err.message : 'Erro desconhecido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddCard = async (newCard: Omit<Person, 'id' | 'downloaded' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao adicionar card');
      }
      const added = await res.json();
      setCards([added, ...cards]);
      setIsModalOpen(false);
      toast({
        title: 'Pessoa adicionada.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao adicionar pessoa.',
        description: err instanceof Error ? err.message : 'Erro desconhecido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (person: Person) => setEditPerson(person);

  const handleUpdate = async (updatedPerson: Person) => {
    try {
      const res = await fetch(`/api/cards/${updatedPerson.cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPerson),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao atualizar pessoa');
      }
      const updated = await res.json();
      setCards(cards.map(c => (c.cpf === updated.cpf ? updated : c)));
      setEditPerson(null);
      toast({
        title: 'Pessoa atualizada.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao atualizar pessoa.',
        description: err instanceof Error ? err.message : 'Erro desconhecido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
      toast({
        title: 'Pessoa deletada.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao deletar pessoa.',
        description: err instanceof Error ? err.message : 'Erro desconhecido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Center p={10}>
        <Spinner size="xl" color="blue.500" />
        <Text ml={4}>Carregando dados...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" p={10}>
        <AlertIcon />
        <Text>Erro: {error}</Text>
      </Alert>
    );
  }

  return (
    <Box>
      {/* Botão Add Card */}
      <Flex justify="flex-end" mb={8}>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Adicionar Nova Pessoa
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
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
        {cards.map(person => (
          <Card
            key={person.cpf} // Use CPF as key for now, consider using ID from DB later
            person={person}
            onToggleDownloaded={handleToggleDownloaded}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}