'use client';

import { useState, FormEvent, useEffect } from 'react';
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
  Checkbox,
  ModalCloseButton,
} from '@chakra-ui/react';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person;
  onUpdate: (updatedCard: Person) => void;
}

export default function EditCardModal({ isOpen, onClose, person, onUpdate }: EditCardModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    parentesco: '',
    mae: '',
    nascimento: '',
    profissao: '',
    isPrincipal: false,
  });

  useEffect(() => {
    if (person) {
      setFormData({
        nome: person.nome,
        cpf: person.cpf,
        parentesco: person.parentesco,
        mae: person.mae || '',
        nascimento: person.nascimento || '',
        profissao: person.profissao || '',
        isPrincipal: person.isPrincipal,
      });
    }
  }, [person]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/cards/${person.cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, downloaded: person.downloaded }),
      });

      if (!res.ok) throw new Error('Erro ao atualizar card');

      const updated: Person = await res.json();
      onUpdate(updated);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Editar Card
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <form id="edit-card-form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="nome">Nome</FormLabel>
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
          <Button colorScheme="blue" type="submit" form="edit-card-form">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
