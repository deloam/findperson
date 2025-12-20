'use client';

import { Box, VStack, Heading, Text, Flex, Icon, Circle, useColorModeValue, Image, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Link, Wrap, WrapItem, Button } from '@chakra-ui/react';
import { FaFingerprint, FaUserSecret, FaSearch, FaIdCard, FaMapMarkerAlt, FaUsers, FaCrown, FaMobileAlt, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionBox = motion.create(Box);

interface TimelineItemProps {
    date: string;
    title: string;
    children: React.ReactNode;
    icon: React.ElementType;
    isLeft?: boolean;
}

const TimelineItem = ({ date, title, children, icon, isLeft = false }: TimelineItemProps) => {
    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.600', 'gray.300');

    return (
        <Flex mb={10} justify={isLeft ? 'flex-end' : 'flex-start'} align="center" w="full" position="relative">
            {/* Date Desktop - Opposite Side */}
            <Box display={{ base: 'none', md: 'block' }} position="absolute" left={isLeft ? 'auto' : '50%'} right={isLeft ? '50%' : 'auto'} px={4} textAlign={isLeft ? 'left' : 'right'} w="50%">
                <Text fontWeight="bold" fontSize="sm" color="blue.500">{date}</Text>
            </Box>

            {/* Line Indicator */}
            <Circle size="40px" bg="blue.500" color="white" position="absolute" left="50%" transform="translateX(-50%)" zIndex={2}>
                <Icon as={icon} />
            </Circle>

            {/* Content Box */}
            <MotionBox
                w={{ base: 'full', md: '45%' }}
                mr={isLeft ? { base: 0, md: 'auto' } : 0}
                ml={isLeft ? 0 : { base: 0, md: 'auto' }}
                pr={isLeft ? { md: 8 } : 0}
                pl={isLeft ? 0 : { md: 8 }}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Box bg={bg} p={6} borderRadius="lg" shadow="lg" borderLeft="4px solid" borderLeftColor="blue.500" position="relative">
                    <Text display={{ md: 'none' }} fontWeight="bold" fontSize="xs" color="blue.500" mb={2}>{date}</Text>
                    <Heading size="md" mb={2} color={useColorModeValue('gray.800', 'white')}>{title}</Heading>
                    <Box color={color} fontSize="sm">
                        {children}
                    </Box>
                </Box>
            </MotionBox>
        </Flex>
    );
};

export default function StoryTimeline() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (src: string) => {
        setSelectedImage(src);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    const TimelineImage = ({ src, alt }: { src: string; alt: string }) => (
        <Image
            src={src}
            borderRadius="md"
            alt={alt}
            cursor="pointer"
            onClick={() => handleImageClick(src)}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
        />
    );

    return (
        <Box position="relative" w="full" maxW="4xl" mx="auto" p={4}>
            {/* Central Line */}
            <Box position="absolute" left="50%" top={0} bottom={0} w="2px" bg="gray.200" transform="translateX(-50%)" zIndex={0} />

            <VStack spacing={0} w="full">
                <TimelineItem date="14 de Julho de 2025" title="A Queda da Máscara Inicial" icon={FaUserSecret} isLeft={true}>
                    <Text mb={3}>Joyce descobre que &quot;Karoline Dejan&quot; usava fotos de uma tiktoker (Marcela). Através de uma edição de um &quot;álbum de figurinhas&quot; que foi enviado via email para Deloam a identidade de &quot;Izabela&quot; começou a ser descoberta.</Text>
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.02.12%20PM.jpeg" alt="Foto Usada 1" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.02.12%20PM%20(1).jpeg" alt="Foto Usada 2" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.02.12%20PM%20(2).jpeg" alt="Foto Usada 3" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.02.12%20PM%20(3).jpeg" alt="Foto Usada 4" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.06.31%20PM.jpeg" alt="Foto Usada 5" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.06.33%20PM.jpeg" alt="Foto Usada 6" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.06.33%20PM%20(1).jpeg" alt="Foto Usada 7" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.06.33%20PM%20(2).jpeg" alt="Foto Usada 8" />
                        <TimelineImage src="/fotos%20usadas/WhatsApp%20Image%202025-12-19%20at%208.06.33%20PM%20(3).jpeg" alt="Foto Usada 9" />
                    </SimpleGrid>
                </TimelineItem>

                <TimelineItem date="12 de Setembro de 2025" title="O Pulo do Gato (Brecha de Dados)" icon={FaFingerprint} isLeft={false}>
                    <Text fontWeight="bold">O dia mais produtivo.</Text>
                    <Text>Investimento de R$ 36,00 no painel Vex.</Text>
                    <Text mt={2}>🎯 <Text as="span" fontWeight="bold">Identidade Revelada:</Text> Eduardo Ferreira dos Santos.</Text>
                    <Text>📍 <Text as="span" fontWeight="bold">Endereços:</Text> Bairros Julião Ramos e Pantanal (Macapá/AP).</Text>
                    <Text mt={1} fontSize="xs" color="gray.500" mb={3}>Confirmação via CPF da mãe (Raimunda Helena) em bairros Central, Pacoval e São Lázaro.</Text>
                    <SimpleGrid columns={2} spacing={2}>
                        <TimelineImage src="/tela%20do%20pix%20do%20eduardo%20pelo%20email%20.jpeg" alt="Pix Email" />
                        <TimelineImage src="/tela%20pix%20usando%20o%20cpf%20como%20chave.jpeg" alt="Pix CPF" />
                    </SimpleGrid>
                </TimelineItem>

                <TimelineItem date="Estratégia Técnica" title="A Pesca Digital (IP Tracking)" icon={FaMapMarkerAlt} isLeft={true}>
                    <Text fontStyle="italic" mb={2}>&quot;Como uma pesca digital: lançou o anzol e Eduardo mordeu a isca.&quot;</Text>
                    <Text>Deloam enviou links de &quot;isca&quot; (formulários) que Eduardo acessou duas vezes.</Text>
                    <Text mt={2}>📡 <Text as="span" fontWeight="bold">Provedor:</Text> Hostload (Wi-Fi residencial) e Vivo.</Text>
                    <Text mb={3}>🗺️ <Text as="span" fontWeight="bold">Geolocalização:</Text> Confirmou Macapá/AP, invalidando a tese do Sudeste.</Text>
                    <TimelineImage src="/foto%20do%20IP%20que%20motra%20que%20ele%20mora%20em%20macapá.jpeg" alt="Rastreio IP" />
                </TimelineItem>

                <TimelineItem date="13 a 16 de Setembro" title="Mais Sobre Eduardo" icon={FaSearch} isLeft={true}>
                    <Text mt={2}>Descobrem o &quot;hiperfoco&quot; em genealogia e Família Real.</Text>
                    <Text>Rastros de chip vinculado a terceiro (Klecio William).</Text>
                </TimelineItem>

                <TimelineItem date="19 de Setembro de 2025" title="A Prova Final (O Rosto)" icon={FaIdCard} isLeft={false}>
                    <Text>Deloam encontra o perfil da tia, Rosineide.</Text>
                    <Text mt={2} fontStyle="italic">&quot;MENTIRA! VSF!&quot; - Reação de Joyce ao ver a foto de Eduardo criança.</Text>
                    <Text mb={3}>Confirmação do padrão de mentira sobre a idade.</Text>
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                        <TimelineImage src="/fotos%20reais%20do%20eduardo/WhatsApp%20Image%202025-12-19%20at%208.02.11%20PM.jpeg" alt="Eduardo Real 1" />
                        <TimelineImage src="/fotos%20reais%20do%20eduardo/WhatsApp%20Image%202025-12-19%20at%208.02.11%20PM%20(1).jpeg" alt="Eduardo Real 2" />
                        <TimelineImage src="/fotos%20reais%20do%20eduardo/WhatsApp%20Image%202025-12-19%20at%208.02.11%20PM%20(2).jpeg" alt="Eduardo Real 3" />
                        <TimelineImage src="/fotos%20reais%20do%20eduardo/WhatsApp%20Image%202025-12-19%20at%208.02.11%20PM%20(3).jpeg" alt="Eduardo Real 4" />
                        <TimelineImage src="/fotos%20reais%20do%20eduardo/WhatsApp%20Image%202025-12-19%20at%208.02.11%20PM%20(4).jpeg" alt="Eduardo Real 5" />
                    </SimpleGrid>

                    <Text fontWeight="bold" fontSize="sm" mt={4} mb={2}>Perfis do Facebook:</Text>
                    <Wrap spacing={2}>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/profile.php?id=100009302618179" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Perfil 1
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/eduardo.pactw" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Eduardo Pactw
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/profile.php?id=100009248285695" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Perfil 3
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/profile.php?id=100009223362611" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Perfil 4
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/eduardo.ferreiradossantos.1213" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Eduardo Ferreira
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/profile.php?id=100010899007104" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Perfil 6
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button as={Link} href="https://www.facebook.com/profile.php?id=100009735691627" isExternal size="xs" colorScheme="facebook" variant="outline" leftIcon={<Icon as={FaFacebook} />}>
                                Perfil 7
                            </Button>
                        </WrapItem>
                    </Wrap>
                </TimelineItem>

                <TimelineItem date="Final de Setembro de 2025" title="O Fim da caçada" icon={FaUsers} isLeft={true}>
                    <Text>Joyce decide parar a caçada. &quot;É apenas alguém meio dodói&quot;.</Text>
                    <Text mt={2}>Decidimos não falar nada sobre a real identidade da Izabela/Carol/Catherinhe, no final é uma pessoa que nunca fez mal a ninguém e apenas se esconde atrás de um perfil fake, talvez um dia a gente fale a verdade, talvez não, o foco da caçada era descobrir a verdade e não expor.</Text>
                    <Text fontSize="xs" color="gray.500" mt={2}>(Clique nas fotos para ampliar)</Text>
                </TimelineItem>
            </VStack>

            <Modal isOpen={!!selectedImage} onClose={handleClose} size="4xl" isCentered>
                <ModalOverlay backdropFilter="blur(5px)" bg="blackAlpha.800" />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalCloseButton color="white" zIndex={10} />
                    <ModalBody p={0} display="flex" justifyContent="center" alignItems="center" onClick={handleClose}>
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="Zoomed Image"
                                maxH="90vh"
                                objectFit="contain"
                                borderRadius="md"
                                cursor="pointer"
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
