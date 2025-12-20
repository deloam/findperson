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
    <Center
      h="100vh"
      bgImage="url('/login_background.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.6)"
        zIndex="0"
      />
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        w="full"
        maxW="sm"
        zIndex="1"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6} color="white">
          Acesso Restrito
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="password" color="gray.200">
              Senha
            </FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="rgba(255, 255, 255, 0.3)"
              _hover={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
              _focus={{ borderColor: "blue.300", boxShadow: "0 0 0 1px #63b3ed" }}
              color="white"
              bg="rgba(0, 0, 0, 0.2)"
              required
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
            width="full"
            mt={4}
            bg="blue.600"
            _hover={{ bg: "blue.500" }}
          >
            Entrar
          </Button>
          {error && (
            <Text color="red.300" textAlign="center" mt={4}>
              {error}
            </Text>
          )}
        </form>
      </Box>
    </Center>
  );
}