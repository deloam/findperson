'use client';

import { Box, Heading, Text, VStack, List, ListItem, ListIcon, Divider, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaFingerprint, FaMapMarkedAlt, FaBrain, FaUserFriends, FaCheckCircle } from 'react-icons/fa';

import TypewriterText from './TypewriterText';

export default function Prologue() {
    const textColor = useColorModeValue('gray.300', 'gray.300');
    const headingColor = useColorModeValue('white', 'white');
    const highlightColor = 'blue.400';

    return (
        <Box py={10} maxW="4xl" mx="auto">
            <VStack spacing={8} align="stretch">

                {/* Main Title Section */}
                <Box textAlign="center" mb={6}>
                    <TypewriterText
                        text="Deloam & Joyce: Como Dois Amigos Desmascaram um Catfish"
                        as="h2"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        color={headingColor}
                        mb={4}
                        speed={40}
                        cursorColor="blue.500"
                    />
                    <Text fontSize="lg" color={textColor} lineHeight="tall">
                        No teatro de identidades que é a internet, todos nós somos, em algum grau, atores e audiência.
                        A dúvida sobre quem está do outro lado da tela é uma constante antropológica da nossa era, um eco da curiosidade e do receio que definem as interações humanas em espaços virtuais.
                        Questionamos a veracidade de perfis não apenas por segurança, mas por um desejo inato de decifrar as máscaras que a cultura digital nos permite construir.
                    </Text>
                    <Text fontSize="lg" color={textColor} mt={4} lineHeight="tall">
                        Esta história, no entanto, transcende o roteiro clássico de "catfishing". Ela se desdobra como uma peça de etnografia digital, a crônica de uma caçada que serve como um microcosmo das novas dinâmicas de poder, vigilância e justiça informal.
                        A seguir, mergulhamos nos bastidores dessa investigação para entender como a amizade e a obsessão mútua, equipadas com ferramentas surpreendentes, transformaram dois amigos em exemplares de uma nova estirpe de detetives com uma intuição forense quase nativa para os rastros que deixamos online.
                    </Text>
                </Box>

                <Divider borderColor="gray.700" />

                {/* Bastidores Section */}
                <Heading as="h3" size="lg" color={headingColor} mt={4}>
                    Os Bastidores da Caçada
                </Heading>
                <Text color={textColor}>
                    A investigação de Deloam e Joyce revela um fascinante manual de táticas investigativas na era digital. Cada descoberta não apenas os aproximava da verdade, mas também expunha as vulnerabilidades inerentes à performance de identidade em um ambiente onde cada clique pode se tornar uma pista.
                </Text>

                {/* Point 1 */}
                <Box>
                    <Heading as="h4" size="md" color={highlightColor} display="flex" alignItems="center" mb={2}>
                        <Icon as={FaFingerprint} mr={2} />
                        1. O Maior Inimigo do Catfish? Seus Próprios Rastros Digitais.
                    </Heading>
                    <Text color={textColor} mb={3}>
                        O sucesso da caçada não se deveu apenas à astúcia dos detetives, mas a falhas clássicas de OPSEC (Operational Security) por parte do alvo. A pessoa por trás do perfil falso, talvez por húbris ou pela carga cognitiva de manter uma farsa complexa, deixou um rastro de migalhas digitais. Os três principais erros foram fatais:
                    </Text>
                    <List spacing={2} ml={6} color="gray.400">
                        <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Enviar uma foto por um e-mail pessoal.</ListItem>
                        <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Cadastrar esse mesmo e-mail como chave PIX.</ListItem>
                        <ListItem display="flex" alignItems="center"><ListIcon as={FaCheckCircle} color="green.500" />Usar a mesma data de nascimento em diferentes cadastros online.</ListItem>
                    </List>
                    <Text color={textColor} mt={3}>
                        Isoladamente, cada deslize é um erro humano comum. Juntos, eles formam um data trail inequívoco, uma trilha que conecta a persona fictícia à identidade real.
                    </Text>
                </Box>

                {/* Point 2 */}
                <Box>
                    <Heading as="h4" size="md" color={highlightColor} display="flex" alignItems="center" mb={2}>
                        <Icon as={FaMapMarkedAlt} mr={2} />
                        2. A Caçada Não Termina na Tela: O Plano de Ir a Campo
                    </Heading>
                    <Text color={textColor}>
                        A obsessão pela verdade era tão intensa que a investigação ameaçou transbordar do mundo digital para o físico, demonstrando o colapso do binário online/offline.
                        Após levantarem possíveis endereços, Deloam não hesitou em planejar o próximo passo: <Text as="span" fontStyle="italic">"Eu vou anotar ainda todos os endereços e ver se passo em alguns pra ver se ainda existem"</Text>.
                        A caçada estava prestes a se tornar uma expedição. Joyce, mesmo distante, compartilhou o ímpeto: <Text as="span" fontStyle="italic">"se eu morasse mais perto eu ia nesses endereços ai com vc"</Text>.
                    </Text>
                </Box>

                {/* Point 3 */}
                <Box>
                    <Heading as="h4" size="md" color={highlightColor} display="flex" alignItems="center" mb={2}>
                        <Icon as={FaBrain} mr={2} />
                        3. Construindo um Monstro: A Psicologia por Trás da Farsa
                    </Heading>
                    <Text color={textColor}>
                        Além do "quem", os investigadores se dedicaram ao "porquê", realizando uma análise psicológica amadora, mas perspicaz. Eles teorizaram que o alvo era alguém "viciado em se passar por outras pessoas", cuja performance de identidade dependia da validação externa e do prazer de "fazer todo mundo acreditar nele".
                        Essa necessidade de manter a farsa se manifestava em reações agressivas quando a construção era questionada. Joyce relembra: <Text as="span" fontStyle="italic" fontWeight="bold">"LEMBRO QUE QUANDO alguém falava algo ela ficava possessa"</Text>.
                    </Text>
                    <Text color={textColor} mt={2}>
                        Essa performance não nasceu pronta. Eles especularam que a persona foi cuidadosamente construída e testada ao longo do tempo, possivelmente em ambientes de menor risco como jogos online (Minecraft e Pokémon).
                    </Text>
                </Box>

                {/* Point 4 */}
                <Box>
                    <Heading as="h4" size="md" color={highlightColor} display="flex" alignItems="center" mb={2}>
                        <Icon as={FaUserFriends} mr={2} />
                        4. "Somos o Sherlock Holmes e Watson": A Parceria é a Chave
                    </Heading>
                    <Text color={textColor}>
                        Acima de tudo, esta foi uma história de colaboração. A investigação se desenrolou em um fluxo frenético de screenshots compartilhados e mensagens especulativas, um quebra-cabeça digital em tempo real onde a descoberta de um alimentava imediatamente a próxima busca do outro.
                    </Text>
                    <Text color="blue.300" fontStyle="italic" fontWeight="bold" my={2} textAlign="center">
                        "SOMOS O sherlock holmes e watson"
                    </Text>
                    <Text color={textColor}>
                        A parceria funcionou pela complementaridade. De um lado, a curiosidade incansável de Joyce e do outro, a capacidade técnica e a disposição de Deloam para agir.
                    </Text>
                </Box>

                <Divider borderColor="gray.700" />

                {/* Conclusion */}
                <Box bg="whiteAlpha.100" p={6} borderRadius="lg" borderLeft="4px solid" borderColor="blue.500">
                    <Heading as="h3" size="lg" color={headingColor} mb={3}>
                        Conclusão: A Caçada e o Espelho
                    </Heading>
                    <Text color={textColor} fontStyle="italic">
                        A jornada de Joyce e Deloam é mais do que uma história sobre desmascarar um perfil falso. É um artefato cultural que reflete nossa era, onde a fronteira entre o online e o offline se dissolveu e ferramentas simples capacitam qualquer um a conduzir sua própria etnografia digital.
                        A caçada revela não apenas as fragilidades de quem se esconde, mas também a tenacidade de quem busca a verdade. A história deles funciona como um espelho, forçando-nos a perguntar: até onde iríamos para descobrir a verdade por trás de um perfil online? E o que essa jornada revela, no fim, sobre nós mesmos?
                    </Text>
                </Box>

            </VStack>
        </Box>
    );
}
