'use client';

import { Box, Heading, Text, Container, UnorderedList, ListItem, Link } from '@chakra-ui/react';

export default function PsychologicalProfile() {
    return (
        <Box bg="gray.800" py={12} borderRadius="xl" mt={10}>
            <Container maxW="container.md">
                <Heading size="lg" mb={6} textAlign="center" color="white">
                    Perfil Psicológico & Padrões
                </Heading>
                <Box color="gray.300" fontSize="lg" lineHeight="tall">
                    <Text mb={6}>
                        A investigação revelou que a persona criada não era apenas uma mentira aleatória, mas uma
                        complexa <strong>fuga da realidade</strong>.
                    </Text>
                    <UnorderedList spacing={4} pl={4}>
                        <ListItem>
                            <strong>Obsessão Genealógica:</strong> Um hiperfoco na Família Real e em árvores genealógicas falsas,
                            talvez na tentativa de criar uma linhagem &quot;nobre&quot; para si mesmo.
                        </ListItem>
                        <ListItem>
                            <strong>O Mundo Minecraft:</strong> O uso do nome &quot;Catherine&quot; em servidores jogos indicava que a
                            construção da identidade feminina já existia muito antes do contato com Joyce.
                        </ListItem>
                        <ListItem>
                            <strong>O Padrão da Idade:</strong> O uso consistente da data de nascimento real (29 de abril),
                            apenas alterando o ano, sugere uma dificuldade em abandonar completamente a própria identidade.
                        </ListItem>
                    </UnorderedList>
                    <Text mt={6} fontStyle="italic" textAlign="center" color="gray.500">
                        &quot;Um jogo de xadrez onde o xeque-mate não foi a exposição, mas a verdade.&quot;
                    </Text>

                    <Box mt={10} pt={6} borderTop="1px solid" borderColor="gray.700">
                        <Heading size="md" mb={4} color="gray.300">
                            Fontes da Persona (Material Original)
                        </Heading>
                        <Text fontSize="sm" color="gray.500" mb={4}>
                            Perfis reais utilizados para roubo de fotos e construção da identidade visual de "Caroline Dejan".
                        </Text>
                        <UnorderedList spacing={2} pl={4} color="blue.400">
                            <ListItem>
                                <Link href="https://www.tiktok.com/@marceintosh?_t=8rB1MGGDWH2&_r=1" isExternal>
                                    TikTok: @marceintosh
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.instagram.com/marceintosh?igsh=aG91NDdpanZ1Mjdn" isExternal>
                                    Instagram: @marceintosh
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.instagram.com/juf?igsh=MXBiOW9ma3VjeHk1ag==" isExternal>
                                    Instagram: @juf
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.instagram.com/alane?igsh=ZGUza3J2OHpxNzdj" isExternal>
                                    Instagram: @alane
                                </Link>
                            </ListItem>
                        </UnorderedList>

                        <Heading size="md" mt={8} mb={4} color="gray.300">
                            Perfis Reais Encontrados (Eduardo)
                        </Heading>
                        <UnorderedList spacing={2} pl={4} color="green.400">
                            <ListItem>
                                <Link href="https://www.facebook.com/profile.php?id=100009302618179" isExternal>
                                    Facebook: Perfil 1
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/eduardo.pactw" isExternal>
                                    Facebook: Eduardo Pactw
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/profile.php?id=100009248285695" isExternal>
                                    Facebook: Perfil 3
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/profile.php?id=100009223362611" isExternal>
                                    Facebook: Perfil 4
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/eduardo.ferreiradossantos.1213" isExternal>
                                    Facebook: Eduardo Ferreira
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/profile.php?id=100010899007104" isExternal>
                                    Facebook: Perfil 6
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/profile.php?id=100009735691627" isExternal>
                                    Facebook: Perfil 7
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://eduardonewsgames.weebly.com/" isExternal>
                                    Site: Eduardo News Games (Pokemon)
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.youtube.com/@magg3303" isExternal>
                                    YouTube: @magg3303
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://www.facebook.com/rosineide.rosarioferreira.9" isExternal>
                                    Facebook (Tia): Rosineide Rosario Ferreira
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
