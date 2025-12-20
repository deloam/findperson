'use client';

import CardDashboard from "@/app/components/CardDashboard";
import { Container, Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function DatabaseClient() {
    return (
        <Box
            minH="100vh"
            bgGradient="linear(to-b, gray.900, black)"
            color="white"
            position="relative"
            overflow="hidden"
            pb={20}
        >
            {/* Background Effect */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                bg="radial-gradient(circle at 50% 0%, rgba(66, 153, 225, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
                pointerEvents="none"
            />

            <Container maxW="container.xl" p={{ base: 4, md: 8 }} position="relative" zIndex={10}>
                <Box textAlign="center" mb={12} mt={8}>
                    <Heading
                        as="h1"
                        size="2xl"
                        mb={4}
                        bgGradient="linear(to-r, blue.400, purple.500)"
                        bgClip="text"
                        fontWeight="black"
                        letterSpacing="tight"
                    >
                        Painel de Dados
                    </Heading>
                    <Text fontSize="lg" color="gray.400" maxW="2xl" mx="auto">
                        Base de dados centralizada da investigação.
                    </Text>
                    <Button
                        as={Link}
                        href="/"
                        colorScheme="blue"
                        variant="outline"
                        mt={6}
                        size="md"
                        _hover={{ bg: "whiteAlpha.200" }}
                    >
                        &larr; Voltar para a História
                    </Button>
                </Box>

                <Box w="full">
                    <CardDashboard />
                </Box>
            </Container>
        </Box>
    );
}
