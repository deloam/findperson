'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'Senha incorreta.');
      }
    } catch {
      setError('Não foi possível conectar ao servidor.');
    }

    setIsLoading(false);
  };

  return (
    <Center h="100vh">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="md" w="full" maxW="sm">
        <Heading as="h1" size="lg" textAlign="center" mb={6} color="gray.700">
          Acesso Restrito
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="password" color="gray.600">
              Senha
            </FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="gray.300"
              focusBorderColor="blue.500"
              required
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
            width="full"
            mt={4}
          >
            Entrar
          </Button>
          {error && (
            <Text color="red.500" textAlign="center" mt={4}>
              {error}
            </Text>
          )}
        </form>
      </Box>
    </Center>
  );
}