import CardDashboard from "@/app/components/CardDashboard";
import { Container, Heading, Text, Box } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="xl" color="gray.700">
          Painel Eduardo
        </Heading>
        <Text fontSize="md" color="gray.500" mt={2}>
          Dados organizados dos parentes.
        </Text>
      </Box>

      <CardDashboard />
    </Container>
  );
}
