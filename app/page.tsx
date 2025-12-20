'use client';

import { Container, Box, Heading, Text, VStack, Button, Divider, useColorModeValue } from "@chakra-ui/react";
import StoryTimeline from "@/app/components/StoryTimeline";
import DetectiveTools from "@/app/components/DetectiveTools";
import PsychologicalProfile from "@/app/components/PsychologicalProfile";
import Link from "next/link";
import { FaDatabase } from "react-icons/fa";

export default function HomePage() {
  const bg = useColorModeValue('gray.900', 'gray.900');
  const textColor = useColorModeValue('white', 'white');

  return (
    <Box bg={bg} minH="100vh" color={textColor} pb={20}>
      {/* Hero Section */}
      <Box
        w="full"
        h={{ base: "60vh", md: "70vh" }}
        bgGradient="linear(to-b, gray.900, black)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="radial-gradient(circle at 50% 50%, rgba(66, 153, 225, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
        />

        <Container maxW="container.lg" textAlign="center" zIndex={10}>
          <VStack spacing={6}>
            <Heading
              as="h1"
              size="4xl"
              fontWeight="black"
              letterSpacing="tighter"
              paddingBottom="10px"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              A CAÇADA A VERDADE
            </Heading>
            <Text fontSize="xl" maxW="2xl" mx="auto" color="gray.400">
              A história real da investigação que desmascarou uma mentira de quatro anos.
            </Text>
            <Button
              as={Link}
              href="/database"
              leftIcon={<FaDatabase />}
              colorScheme="blue"
              variant="solid"
              size="lg"
              rounded="full"
              px={8}
            >
              Acessar Banco de Dados
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>

        {/* Timeline Section */}
        <Box id="timeline" py={16}>
          <Heading size="2xl" textAlign="center" mb={16} color="white">
            Linha do Tempo
          </Heading>
          <StoryTimeline />
        </Box>

        <Divider borderColor="gray.800" my={10} />

        {/* Infographic Section */}
        <Box py={16} textAlign="center">
          <Heading size="2xl" mb={10} color="white">
            Mapa da Investigação
          </Heading>
          <Box
            p={4}
            bg="gray.800"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.700"
            display="inline-block"
            boxShadow="2xl"
          >
            <Box
              as="img"
              src="/infografico.png"
              alt="Infográfico da Investigação"
              maxW="100%"
              h="auto"
              borderRadius="lg"
            />
          </Box>
        </Box>

        <Divider borderColor="gray.800" my={10} />

        {/* Tools Section */}
        <Box py={10}>
          <DetectiveTools />
        </Box>

        {/* Profile Section */}
        <Box py={10}>
          <PsychologicalProfile />
        </Box>

        {/* Footer Note */}
        <Box textAlign="center" pt={20} color="gray.600">
          <Text fontSize="sm">
            Operação FindPerson Caroline Dejan · 2025
          </Text>
        </Box>

      </Container>
    </Box >
  );
}
