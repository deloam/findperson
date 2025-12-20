import CardDashboard from "@/app/components/CardDashboard";
import { Container, Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function DatabasePage() {
    return (
        <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
            <Box textAlign="center" mb={10}>
                <Heading as="h1" size="xl" color="gray.700">
                    Painel Eduardo
                </Heading>
                <Text fontSize="md" color="gray.500" mt={2}>
                    Dados organizados dos parentes.
                </Text>
                <Button as={Link} href="/" colorScheme="blue" variant="outline" mt={4} size="sm">
                    Voltar para a História
                </Button>
            </Box>

            {/* Grid wrapper com w-full */}
            <Box w="full">
                <CardDashboard />
            </Box>
        </Container>
    );
}
