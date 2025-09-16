'use client';

import { useState, FormEvent } from 'react';
import type { Person } from '@/lib/data';
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
} from '@chakra-ui/react';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (newCard: Omit<Person, 'downloaded' | 'id' | 'createdAt'>) => void;
}

export default function AddCardModal({ isOpen, onClose, onAddCard }: AddCardModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    parentesco: '',
    mae: '',
    nascimento: '',
    profissao: '',
    isPrincipal: false,
  });

  if (!isOpen) return null;

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
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Novo Card<ModalCloseButton /></ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} id="add-card-form">
            <Stack spacing={4}>
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