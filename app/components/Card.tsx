'use client';

import type { Person } from '@/lib/data';
import { Box, Flex, Heading, Text, Badge, Checkbox, Divider, Button } from '@chakra-ui/react';

interface CardProps {
  person: Person;
  onToggleDownloaded: (cpf: string) => void;
  onEdit: (person: Person) => void;
  onDelete: (cpf: string) => void;
}

export default function Card({ person, onToggleDownloaded, onEdit, onDelete }: CardProps) {
  const borderColor = person.isPrincipal ? 'blue.500' : 'gray.200';
  const badgeColorScheme = person.isPrincipal ? 'blue' : 'gray';

  return (
    <Box
      bg="white"
      p={5}
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: "xl" }}
      transition="all 0.3s ease-in-out"
      borderTopWidth={4}
      borderColor={borderColor}
      className="card"
    >
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Heading as="h2" size="md" color="gray.900" textTransform="capitalize">
          {person.nome.toLowerCase()}
        </Heading>
      </Flex>

      <Box fontSize="sm">
        <Flex justifyContent="space-between">
          <Text color="gray.500" fontWeight="medium">CPF:</Text>
          <Text fontFamily="mono">{person.cpf}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.500" fontWeight="medium">Ligação:</Text>
          <Badge colorScheme={badgeColorScheme} px={2} py={1} borderRadius="full" fontSize="xs">
            {person.parentesco}
          </Badge>
        </Flex>

        {person.isPrincipal && (
          <>
            <Divider my={2} borderColor="gray.200" />
            <Flex justifyContent="space-between">
              <Text color="gray.500" fontWeight="medium">Mãe:</Text>
              <Text textAlign="right" textTransform="capitalize">{person.mae?.toLowerCase()}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.500" fontWeight="medium">Nascimento:</Text>
              <Text>{person.nascimento}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.500" fontWeight="medium">Profissão:</Text>
              <Text textAlign="right">{person.profissao}</Text>
            </Flex>
          </>
        )}

        <Divider pt={3} mt={3} borderColor="gray.200" />
        <Flex alignItems="center" justifyContent="space-between" cursor="pointer" mt={3}>
          <Text color="gray.500" fontWeight="medium">Dados Baixados</Text>
          <Checkbox
            isChecked={person.downloaded}
            onChange={() => onToggleDownloaded(person.cpf)}
            colorScheme="blue"
            size="lg"
          />
        </Flex>

        <Flex mt={3} justifyContent="space-between">
          <Button size="sm" colorScheme="yellow" onClick={() => onEdit(person)}>Editar</Button>
          <Button size="sm" colorScheme="red" onClick={() => onDelete(person.cpf)}>Deletar</Button>
        </Flex>
      </Box>
    </Box>
  );
}
