'use client';

import { Box, Heading, Text, UnorderedList, ListItem, VStack, Container, useColorModeValue } from "@chakra-ui/react";

export default function InvestigationConclusion() {
    const bgColor = useColorModeValue('gray.800', 'gray.800');
    const borderColor = useColorModeValue('gray.700', 'gray.700');

    return (
        <Container maxW="4xl">
            <Box
                bg={bgColor}
                p={{ base: 6, md: 10 }}
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="2xl"
            >
                <Heading size="xl" mb={6} textAlign="center" color="blue.400">
                    Conclusão dos Investigadores
                </Heading>

                <VStack spacing={6} align="stretch">
                    <Text fontSize="lg" lineHeight="tall" color="gray.300">
                        Deloam e Joyce veem Eduardo não como um criminoso articulado, mas como uma pessoa psicologicamente fragilizada e profundamente dependente das personas virtuais que criou. Eles enxergam nele alguém que possui uma grande "distorção de imagem" e que encontrou na criação de perfis femininos, como Carol e Izabela, um refúgio para obter a atenção e a aceitação que acredita que não teria como homem.
                    </Text>

                    <Text fontSize="lg" lineHeight="tall" color="gray.300">
                        Deloam observa que Eduardo entra "100% no personagem" e que esse comportamento se tornou um vício alimentado pelos anos de farsa. Joyce, embora sinta o impacto da mentira após anos de convivência, afirma que ainda gosta da "essência" e da alma da pessoa por trás do perfil, descrevendo Eduardo como alguém "meio dodói" e digno de pena.
                    </Text>

                    <Box py={4}>
                        <Heading size="md" mb={4} color="purple.400">
                            A decisão de não expô-lo publicamente baseia-se nos seguintes pontos principais:
                        </Heading>
                        <UnorderedList spacing={3} pl={4} color="gray.300">
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="white">Risco à integridade de Eduardo:</Text> Ambos temem que uma exposição pública possa destruir o mundo virtual onde ele vive há anos, levando-o a uma reação extrema ou até a atentar contra a própria vida.
                            </ListItem>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="white">Ausência de má-fé financeira:</Text> Eles reconhecem que, apesar da falsidade ideológica, Eduardo não faz mal físico a ninguém, não pede dinheiro e não aplica golpes financeiros.
                            </ListItem>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="white">Arrependimento e Invasão de Privacidade:</Text> Joyce expressou um profundo arrependimento por ter invadido tanto a vida privada dele, sentindo-se mal por ter ido tão longe na investigação.
                            </ListItem>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="white">Finalidade da "Caçada":</Text> Para eles, o objetivo era apenas descobrir a verdade para satisfazer a própria curiosidade e entender quem era a pessoa com quem conversavam; uma vez alcançado esse objetivo, a exposição tornou-se desnecessária.
                            </ListItem>
                            <ListItem>
                                <Text as="span" fontWeight="bold" color="white">Preservação da paz:</Text> Deloam acredita que, como as informações obtidas eram tecnicamente públicas e a investigação foi apenas pela busca da verdade, o melhor é deixar o assunto de lado e focar em suas próprias vidas.
                            </ListItem>
                        </UnorderedList>
                    </Box>

                    <Text fontSize="lg" fontStyle="italic" borderLeft="4px solid" borderColor="blue.500" pl={4} py={2} bg="whiteAlpha.50" color="gray.200">
                        Para os dois investigadores, Eduardo é como um personagem que se perdeu dentro do próprio cenário: embora saibam que a peça é uma farsa, eles escolheram não derrubar as cortinas para não ferir o ator que não sabe mais como viver fora do palco.
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
}
