'use client';

import { Box, VStack, Heading, Text, Flex, Icon, Circle, useColorModeValue, Image, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Link, Wrap, WrapItem, Button } from '@chakra-ui/react';
import { FaFingerprint, FaUserSecret, FaSearch, FaIdCard, FaMapMarkerAlt, FaUsers, FaCrown, FaMobileAlt, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
        <Flex mb={10} direction={{ base: 'column', md: 'row' }} justify={{ base: 'center', md: isLeft ? 'flex-end' : 'flex-start' }} align="center" w="full" position="relative">
            {/* Line Indicator */}
            <Circle
                size="40px"
                bg="blue.500"
                color="white"
                position={{ base: 'relative', md: 'absolute' }}
                left={{ base: 'auto', md: '50%' }}
                transform={{ base: 'none', md: 'translateX(-50%)' }}
                mb={{ base: 4, md: 0 }}
                zIndex={2}
            >
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
                    <Text fontWeight="bold" fontSize="sm" color="blue.500" mb={1}>{date}</Text>
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
                <TimelineItem date="30 de Outubro de 2024" title="O Início da Caçada" icon={FaUsers} isLeft={false}>
                    <Text mb={3}>Depois de muito tempo conversando apenas por texto com &quot;Karoline Dejan&quot;, alguns amigos se organizaram e decidiram buscar a verdade sobre quem realmente ela era.</Text>
                    <Text mb={3}>Criação do grupo com intuito de descobrir quem está por trás do fake.</Text>
                    <TimelineImage src="/foto do grupo.png" alt="Foto do Grupo" />
                </TimelineItem>

                <TimelineItem date="14 de Julho de 2025" title="A Queda da Máscara Inicial" icon={FaUserSecret} isLeft={true}>
                    <Text mb={3}>Joyce descobre que &quot;Karoline Dejan&quot; usava fotos de uma tiktoker (Marcela).</Text>
                    <Text mb={3}>🕵🏼‍♂️ Através de uma edição de um &quot;álbum de figurinhas&quot; que foi enviado via email para Deloam a identidade de &quot;Carol&quot; começou a ser descoberta.</Text>
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
                    <Text>Com o email que Carol/Izabela enviou, foi possível conectá-la a uma pessoa, Eduardo Ferreira dos Santos, pois ela usava esse email como chave Pix pessoal.</Text>
                    <Text mt={2} mb={3}>🎯 <Text as="span" fontWeight="bold">Identidade Revelada:</Text> Eduardo Ferreira dos Santos.</Text>
                    <SimpleGrid columns={2} spacing={2}>
                        <TimelineImage src="/tela%20do%20pix%20do%20eduardo%20pelo%20email%20.jpeg" alt="Pix Email" />
                        <TimelineImage src="/tela%20pix%20usando%20o%20cpf%20como%20chave.jpeg" alt="Pix CPF" />
                    </SimpleGrid>
                </TimelineItem>

                <TimelineItem date="Estratégia Técnica" title="A Pesca Digital (IP Tracking)" icon={FaMapMarkerAlt} isLeft={true}>
                    <Text fontStyle="italic" mb={2}>&quot;Como uma pesca digital: lançou o anzol e Eduardo mordeu a isca.&quot;</Text>
                    <Text>Deloam enviou links de &quot;isca&quot; (formulários) que Eduardo acessou duas vezes.</Text>
                    <Text mt={2}>📡 <Text as="span" fontWeight="bold">Provedor:</Text> Você Telecom (Wi-Fi residencial) e Vivo como internet móvel.</Text>
                    <Text mb={3}>🗺️ <Text as="span" fontWeight="bold">Geolocalização:</Text> Confirmou Macapá/AP, invalidando a tese que é uma pessoa do Sudeste ou Uruguai.</Text>
                    <TimelineImage src="/foto%20do%20IP%20que%20motra%20que%20ele%20mora%20em%20macapá.jpeg" alt="Rastreio IP" />
                </TimelineItem>

                <TimelineItem date="13 a 16 de Setembro" title="Mais Sobre Eduardo" icon={FaSearch} isLeft={true}>
                    <Text mb={2}>Até aqui não tínhamos um rosto e era o que faltava na caçada.</Text>
                    <Text mt={2} mb={2}>Descobrem o &quot;hiperfoco&quot; em genealogia e Família Real.</Text>
                    <TimelineImage src="/hiperfoco.jpeg" alt="Hiperfoco em Genealogia" />
                    <Text mb={2} mt={4}>O atual número de whatsapp (2024 a 2025) está no nome de terceiros (Klecio William) que nada tem a ver com Eduardo.</Text>
                    <Text mb={3}> Foto do endereço atual dele: Av. Marcílio Dias, 995 - Julião Ramos - Macapá - AP.</Text>
                    <TimelineImage src="/foto do endereço.jpeg" alt="Foto do endereço atual de Eduardo" />
                    <Box mt={4} w="full" h="450px" borderRadius="xl" overflow="hidden" boxShadow="md" border="1px solid" borderColor="whiteAlpha.200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!4v1766434115232!6m8!1m7!1sTyiS82i1BZ6BLxPg67bBuA!2m2!1d0.05069409783892826!2d-51.05857998696101!3f210.25252151790812!4f-2.8530010823492518!5f0.7820865974627469"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Box>
                </TimelineItem>

                <TimelineItem date="19 de Setembro de 2025" title="A Prova Final (O Rosto)" icon={FaIdCard} isLeft={false}>
                    <Text>Deloam encontra o perfil da tia, Rosineide, pesquisando o nome eduardo nos amigos, encontram finalmente ele, temos um rosto!</Text>
                    <Text mt={2} mb={3} fontStyle="italic">&quot;MENTIRA! VSF!&quot; - Reação de Joyce ao ver a foto de Eduardo criança.</Text>
                    <Text mb={3}>Confirmação da idade e da data de nascimento também no perfil do Facebook, além do jeito de se expressar quando alguém dúvida de uma mentira que ele conta.</Text>
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

            <Modal isOpen={!!selectedImage} onClose={handleClose} size="full" isCentered motionPreset="scale">
                <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.900" />
                <ModalContent bg="transparent" boxShadow="none" my={0}>
                    <ModalCloseButton color="white" zIndex={20} size="lg" position="fixed" top={4} right={4} bg="blackAlpha.400" borderRadius="full" />
                    <ModalBody p={0} display="flex" justifyContent="center" alignItems="center" h="100vh" w="100vw" overflow="hidden">
                        {selectedImage && (
                            <TransformWrapper
                                initialScale={1}
                                minScale={0.5}
                                maxScale={4}
                                centerOnInit
                                wheel={{ step: 0.2 }}
                            >
                                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Image
                                        src={selectedImage}
                                        alt="Zoomed Image"
                                        maxH="95vh"
                                        maxW="95vw"
                                        objectFit="contain"
                                        borderRadius="md"
                                        cursor="grab"
                                        boxShadow="2xl"
                                        _active={{ cursor: "grabbing" }}
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
