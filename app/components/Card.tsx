'use client';

import { useState } from 'react';
import type { Person } from '@/lib/data';
import {
  Box, Flex, Heading, Text, Badge, Checkbox, Divider, Button, List, ListItem, Icon,
  IconButton, Collapse, VStack
} from '@chakra-ui/react';
import { FaPhone, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CardProps {
  person: Person;
  onToggleDownloaded: (cpf: string) => void;
  onEdit: (person: Person) => void;
  onDelete: (cpf: string) => void;
}

export default function Card({ person, onToggleDownloaded, onEdit, onDelete }: CardProps) {
  const borderColor = person.isPrincipal ? 'blue.500' : 'gray.200';
  const badgeColorScheme = person.isPrincipal ? 'blue' : 'gray';

  const [showMoreDetails, setShowMoreDetails] = useState(false); // Single state for all extra details

  const hasExtraDetails = (person.telefones && person.telefones.length > 0) || (person.enderecos && person.enderecos.length > 0);

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

        {/* Single "Mostrar mais" / "Recolher" toggle */}
        {hasExtraDetails && (
          <>
            <Divider my={2} borderColor="gray.200" />
            <Flex justifyContent="space-between" alignItems="center" cursor="pointer" onClick={() => setShowMoreDetails(!showMoreDetails)}>
              <Text color="gray.600" fontWeight="semibold">
                {showMoreDetails ? "Recolher Detalhes" : "Mostrar Mais Detalhes"}
              </Text>
              <IconButton
                icon={showMoreDetails ? <FaChevronUp /> : <FaChevronDown />}
                variant="ghost"
                size="sm"
                aria-label={showMoreDetails ? "Recolher Detalhes" : "Mostrar Mais Detalhes"}
                onClick={(e) => e.stopPropagation()} // Prevent double click
              />
            </Flex>
          </>
        )}

        {/* Collapsible content for phones and addresses */}
        <Collapse in={showMoreDetails} animateOpacity>
          <VStack spacing={2} align="stretch" mt={2}> {/* Added VStack for spacing */}
            {person.telefones && person.telefones.length > 0 && (
              <Box>
                <Text color="gray.600" fontWeight="semibold" mb={1}>Telefones:</Text>
                <List spacing={1}>
                  {person.telefones.map((tel, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <Icon as={FaPhone} mr={2} color="gray.500" />
                      <Text>{tel.numero} {tel.tipo && `(${tel.tipo})`}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {person.enderecos && person.enderecos.length > 0 && (
              <Box>
                {person.telefones && person.telefones.length > 0 && <Divider my={2} borderColor="gray.200" />} {/* Divider if both exist */}
                <Text color="gray.600" fontWeight="semibold" mb={1}>Endereços:</Text>
                <List spacing={1}>
                  {person.enderecos.map((end, index) => (
                    <ListItem key={index} display="flex" alignItems="flex-start">
                      <Icon as={FaMapMarkerAlt} mr={2} mt={1} color="gray.500" />
                      <Text>
                        {end.logradouro}, {end.numero && `${end.numero} - `}{end.bairro}<br />
                        {end.cidade}/{end.uf} - {end.cep}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </VStack>
        </Collapse>

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