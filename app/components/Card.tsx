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
      bg="gray.800"
      p={5}
      borderRadius="lg"
      boxShadow="xl"
      _hover={{ transform: "translateY(-4px)", boxShadow: "2xl", borderColor: "blue.400" }}
      transition="all 0.3s ease-in-out"
      borderTopWidth={4}
      borderWidth="1px"
      borderColor={borderColor}
      className="card"
    >
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Heading as="h2" size="md" color="white" textTransform="capitalize">
          {person.nome.toLowerCase()}
        </Heading>
      </Flex>

      <Box fontSize="sm">
        <Flex justifyContent="space-between">
          <Text color="gray.400" fontWeight="medium">CPF:</Text>
          <Text fontFamily="mono" color="gray.200">{person.cpf}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt={1}>
          <Text color="gray.400" fontWeight="medium">Ligação:</Text>
          <Badge colorScheme={badgeColorScheme} px={2} py={1} borderRadius="full" fontSize="xs">
            {person.parentesco}
          </Badge>
        </Flex>

        {person.isPrincipal && (
          <>
            <Divider my={3} borderColor="gray.600" />
            <Flex justifyContent="space-between">
              <Text color="gray.400" fontWeight="medium">Mãe:</Text>
              <Text textAlign="right" textTransform="capitalize" color="gray.200">{person.mae?.toLowerCase()}</Text>
            </Flex>
            <Flex justifyContent="space-between" mt={1}>
              <Text color="gray.400" fontWeight="medium">Nascimento:</Text>
              <Text color="gray.200">{person.nascimento}</Text>
            </Flex>
            <Flex justifyContent="space-between" mt={1}>
              <Text color="gray.400" fontWeight="medium">Profissão:</Text>
              <Text textAlign="right" color="gray.200">{person.profissao}</Text>
            </Flex>
          </>
        )}

        {/* Single "Mostrar mais" / "Recolher" toggle */}
        {hasExtraDetails && (
          <>
            <Divider my={3} borderColor="gray.600" />
            <Flex justifyContent="space-between" alignItems="center" cursor="pointer" onClick={() => setShowMoreDetails(!showMoreDetails)} _hover={{ color: "blue.300" }}>
              <Text color="gray.400" fontWeight="semibold">
                {showMoreDetails ? "Recolher Detalhes" : "Mostrar Mais Detalhes"}
              </Text>
              <IconButton
                icon={showMoreDetails ? <FaChevronUp /> : <FaChevronDown />}
                variant="ghost"
                size="sm"
                color="gray.400"
                aria-label={showMoreDetails ? "Recolher Detalhes" : "Mostrar Mais Detalhes"}
                onClick={(e) => e.stopPropagation()} // Prevent double click
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
              />
            </Flex>
          </>
        )}

        {/* Collapsible content for phones and addresses */}
        <Collapse in={showMoreDetails} animateOpacity>
          <VStack spacing={2} align="stretch" mt={2}> {/* Added VStack for spacing */}
            {person.telefones && person.telefones.length > 0 && (
              <Box>
                <Text color="blue.300" fontWeight="semibold" mb={1} fontSize="xs" textTransform="uppercase" letterSpacing="wide">Telefones</Text>
                <List spacing={2}>
                  {person.telefones.map((tel, index) => (
                    <ListItem key={index} display="flex" alignItems="center" bg="gray.700" p={2} borderRadius="md">
                      <Icon as={FaPhone} mr={2} color="green.300" />
                      <Text color="gray.200">{tel.numero} {tel.tipo && <Text as="span" color="gray.500" fontSize="xs">({tel.tipo})</Text>}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {person.enderecos && person.enderecos.length > 0 && (
              <Box mt={2}>
                {person.telefones && person.telefones.length > 0 && <Divider my={2} borderColor="gray.600" />}
                <Text color="blue.300" fontWeight="semibold" mb={1} fontSize="xs" textTransform="uppercase" letterSpacing="wide">Endereços</Text>
                <List spacing={2}>
                  {person.enderecos.map((end, index) => (
                    <ListItem key={index} display="flex" alignItems="flex-start" bg="gray.700" p={2} borderRadius="md">
                      <Icon as={FaMapMarkerAlt} mr={2} mt={1} color="red.300" />
                      <Text color="gray.200" fontSize="sm">
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

        <Divider pt={3} mt={3} borderColor="gray.600" />
        <Flex alignItems="center" justifyContent="space-between" cursor="pointer" mt={3}>
          <Text color="gray.500" fontWeight="medium" fontSize="xs">DADOS BAIXADOS</Text>
          <Checkbox
            isChecked={person.downloaded}
            onChange={() => onToggleDownloaded(person.cpf)}
            colorScheme="green"
            size="md"
            borderColor="gray.500"
          />
        </Flex>

        <Flex mt={4} justifyContent="space-between" gap={2}>
          <Button size="sm" flex={1} colorScheme="yellow" variant="outline" onClick={() => onEdit(person)} _hover={{ bg: "yellow.500", color: "black" }}>Editar</Button>
          <Button size="sm" flex={1} colorScheme="red" variant="outline" onClick={() => onDelete(person.cpf)} _hover={{ bg: "red.500", color: "white" }}>Deletar</Button>
        </Flex>
      </Box>
    </Box>
  );
}