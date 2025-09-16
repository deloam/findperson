'use client';

import { useState, useEffect } from 'react';
import type { Person } from '@/lib/data'; // We can still use the type definition
import Card from './Card';
import AddCardModal from './AddCardModal';
import { Box, Button, SimpleGrid, Text, Spinner, Alert, AlertIcon, Center, Flex } from '@chakra-ui/react';

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
        <Text>Erro ao carregar dados: {error}</Text>
      </Alert>
    );
  }

  return (
    <>
      <Flex justifyContent="flex-end" mb={8}>
        <Button
          onClick={() => setIsModalOpen(true)}
          colorScheme="blue"
          size="md"
          shadow="md"
          _hover={{ shadow: "lg" }}
        >
          Adicionar Novo Card
        </Button>
      </Flex>

      <AddCardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />

      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} 
        spacing={6}
      >
        {cards.map((person) => (
          <Card 
            key={person.cpf} 
            person={person} 
            onToggleDownloaded={handleToggleDownloaded} 
          />
        ))}
      </SimpleGrid>
    </>
  );
}
