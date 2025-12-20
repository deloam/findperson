'use client';

import { Box, SimpleGrid, Heading, Text, Icon, VStack, HStack, Tag, Badge } from '@chakra-ui/react';
import { FaDatabase, FaKey, FaTerminal, FaNetworkWired } from 'react-icons/fa';

interface ToolCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    tags: string[];
}

const ToolCard = ({ icon, title, description, tags }: ToolCardProps) => (
    <Box
        bg="gray.900"
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.700"
        _hover={{ borderColor: 'blue.500', transform: 'translateY(-2px)', boxShadow: '0 4px 20px rgba(66, 153, 225, 0.3)' }}
        transition="all 0.3s"
    >
        <VStack align="start" spacing={3}>
            <Icon as={icon} boxSize={8} color="blue.400" />
            <Heading size="md" color="white">{title}</Heading>
            <Text color="gray.400" fontSize="sm">{description}</Text>
            <HStack spacing={2} pt={2}>
                {tags.map((tag: string) => (
                    <Tag key={tag} size="sm" colorScheme="blue" variant="subtle">{tag}</Tag>
                ))}
            </HStack>
        </VStack>
    </Box>
);

export default function DetectiveTools() {
    return (
        <Box py={10}>
            <Heading size="lg" mb={8} textAlign="center" color="white">
                Ferramentas usadas na investigação
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                <ToolCard
                    icon={FaKey}
                    title="Chave Pix (E-mail)"
                    description="O erro fatal. O e-mail usado como chave Pix permitiu cruzar os dados financeiros com a identidade civil."
                    tags={['CRUCIAL', 'OSINT']}
                />
                <ToolCard
                    icon={FaDatabase}
                    title="Painel Vex para dados"
                    description="Acesso a bancos de dados vazados que revelaram CPF, filiação e empresas em nome do alvo."
                    tags={['R$ 36,00', 'LEAK']}
                />
                <ToolCard
                    icon={FaNetworkWired}
                    title="Rastreio de IP"
                    description="Localização técnica que invalidou a tese de moradia no Sudeste, apontando para Macapá/AP."
                    tags={['TECH', 'GEO']}
                />
                <ToolCard
                    icon={FaTerminal}
                    title="Engenharia Social"
                    description="Planejamento de disfarces e análise de comportamento digital (hiperfocos)."
                    tags={['PSYCH', 'HUMINT']}
                />
            </SimpleGrid>
        </Box>
    );
}
