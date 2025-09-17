'use client';

import { useState, FormEvent } from 'react';
import type { Person, Telefone, Endereco } from '@/lib/data'; // Import Telefone and Endereco types
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Checkbox,
  ModalCloseButton,
  InputGroup,
  InputLeftAddon,
  IconButton,
  HStack,
  VStack,
  Text,
  Select,
  Flex,
} from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Icons for add/remove

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (newCard: Omit<Person, 'id' | 'downloaded' | 'createdAt'>) => void;
}

export default function AddCardModal({ isOpen, onClose, onAddCard }: AddCardModalProps) {
  const [formData, setFormData] = useState<Omit<Person, 'id' | 'downloaded' | 'createdAt'>>({
    nome: '',
    cpf: '',
    parentesco: '',
    mae: '',
    nascimento: '',
    profissao: '',
    isPrincipal: false,
    telefones: [], // Initialize as empty arrays
    enderecos: [], // Initialize as empty arrays
  });

  if (!isOpen) return null;

  const handlePhoneChange = (index: number, field: keyof Telefone, value: string) => {
    const newPhones = [...(formData.telefones || [])];
    newPhones[index] = { ...newPhones[index], [field]: value };
    setFormData({ ...formData, telefones: newPhones });
  };

  const addPhone = () => {
    setFormData({ ...formData, telefones: [...(formData.telefones || []), { numero: '', tipo: '' }] });
  };

  const removePhone = (index: number) => {
    const newPhones = [...(formData.telefones || [])];
    newPhones.splice(index, 1);
    setFormData({ ...formData, telefones: newPhones });
  };

  const handleAddressChange = (index: number, field: keyof Endereco, value: string) => {
    const newAddresses = [...(formData.enderecos || [])];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setFormData({ ...formData, enderecos: newAddresses });
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      enderecos: [
        ...(formData.enderecos || []),
        { logradouro: '', numero: '', bairro: '', cidade: '', uf: '', cep: '' },
      ],
    });
  };

  const removeAddress = (index: number) => {
    const newAddresses = [...(formData.enderecos || [])];
    newAddresses.splice(index, 1);
    setFormData({ ...formData, enderecos: newAddresses });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddCard(formData);
    onClose(); // Close modal after submission
    // Reset form for next time
    setFormData({
      nome: '',
      cpf: '',
      parentesco: '',
      mae: '',
      nascimento: '',
      profissao: '',
      isPrincipal: false,
      telefones: [],
      enderecos: [],
    });
  };

  const ufOptions = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl"> {/* Increased size */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Nova Pessoa<ModalCloseButton /></ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} id="add-card-form">
            <Stack spacing={4}>
              {/* Basic Info */}
              <FormControl isRequired>
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="cpf">CPF</FormLabel>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="parentesco">Parentesco</FormLabel>
                <Input
                  id="parentesco"
                  value={formData.parentesco}
                  onChange={(e) => setFormData({ ...formData, parentesco: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="mae">Mãe</FormLabel>
                <Input
                  id="mae"
                  value={formData.mae}
                  onChange={(e) => setFormData({ ...formData, mae: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="nascimento">Nascimento</FormLabel>
                <Input
                  id="nascimento"
                  value={formData.nascimento}
                  onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="profissao">Profissão</FormLabel>
                <Input
                  id="profissao"
                  value={formData.profissao}
                  onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="isPrincipal">É Principal?</FormLabel>
                <Checkbox
                  id="isPrincipal"
                  isChecked={formData.isPrincipal}
                  onChange={(e) => setFormData({ ...formData, isPrincipal: e.target.checked })}
                >
                  Sim
                </Checkbox>
              </FormControl>

              {/* Telefones Section */}
              <Box>
                <HStack justifyContent="space-between" mb={2}>
                  <Text fontWeight="semibold">Telefones</Text>
                  <IconButton
                    icon={<FaPlus />}
                    aria-label="Adicionar Telefone"
                    onClick={addPhone}
                    size="sm"
                    colorScheme="green"
                  />
                </HStack>
                <VStack spacing={3} align="stretch">
                  {(formData.telefones || []).map((phone, index) => (
                    <HStack key={index}>
                      <Input
                        placeholder="Número"
                        value={phone.numero}
                        onChange={(e) => handlePhoneChange(index, 'numero', e.target.value)}
                      />
                      <Select
                        placeholder="Tipo"
                        value={phone.tipo}
                        onChange={(e) => handlePhoneChange(index, 'tipo', e.target.value)}
                      >
                        <option value="">Selecione</option>
                        <option value="celular">Celular</option>
                        <option value="residencial">Residencial</option>
                        <option value="comercial">Comercial</option>
                      </Select>
                      <IconButton
                        icon={<FaTrash />}
                        aria-label="Remover Telefone"
                        onClick={() => removePhone(index)}
                        size="sm"
                        colorScheme="red"
                      />
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Endereços Section */}
              <Box>
                <HStack justifyContent="space-between" mb={2}>
                  <Text fontWeight="semibold">Endereços</Text>
                  <IconButton
                    icon={<FaPlus />}
                    aria-label="Adicionar Endereço"
                    onClick={addAddress}
                    size="sm"
                    colorScheme="green"
                  />
                </HStack>
                <VStack spacing={3} align="stretch">
                  {(formData.enderecos || []).map((address, index) => (
                    <Box key={index} p={3} borderWidth={1} borderRadius="md">
                      <VStack spacing={2} align="stretch">
                        <FormControl>
                          <FormLabel>Logradouro</FormLabel>
                          <Input
                            value={address.logradouro}
                            onChange={(e) => handleAddressChange(index, 'logradouro', e.target.value)}
                          />
                        </FormControl>
                        <HStack>
                          <FormControl flex={1}>
                            <FormLabel>Número</FormLabel>
                            <Input
                              value={address.numero}
                              onChange={(e) => handleAddressChange(index, 'numero', e.target.value)}
                            />
                          </FormControl>
                          <FormControl flex={2}>
                            <FormLabel>Bairro</FormLabel>
                            <Input
                              value={address.bairro}
                              onChange={(e) => handleAddressChange(index, 'bairro', e.target.value)}
                            />
                          </FormControl>
                        </HStack>
                        <HStack>
                          <FormControl flex={2}>
                            <FormLabel>Cidade</FormLabel>
                            <Input
                              value={address.cidade}
                              onChange={(e) => handleAddressChange(index, 'cidade', e.target.value)}
                            />
                          </FormControl>
                          <FormControl flex={1}>
                            <FormLabel>UF</FormLabel>
                            <Select
                              value={address.uf}
                              onChange={(e) => handleAddressChange(index, 'uf', e.target.value)}
                            >
                              <option value="">Selecione</option>
                              {ufOptions.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                            </Select>
                          </FormControl>
                        </HStack>
                        <FormControl>
                          <FormLabel>CEP</FormLabel>
                          <Input
                            value={address.cep}
                            onChange={(e) => handleAddressChange(index, 'cep', e.target.value)}
                          />
                        </FormControl>
                      </VStack>
                      <Flex justifyContent="flex-end" mt={2}>
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Remover Endereço"
                          onClick={() => removeAddress(index)}
                          size="sm"
                          colorScheme="red"
                        />
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="blue" type="submit" form="add-card-form">
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
