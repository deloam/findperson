'use client';

import { Box, Flex, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { FaBook, FaHistory, FaGavel, FaMapMarkedAlt, FaBrain } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const NavItem = ({ to, icon, label }: { to: string, icon: React.ElementType, label: string }) => {
    const activeColor = "blue.400";
    const hoverBg = "whiteAlpha.200";

    return (
        <ScrollLink
            to={to}
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
        >
            <Tooltip label={label} placement="top" hasArrow bg="gray.700" color="white">
                <IconButton
                    aria-label={label}
                    icon={<Box as={icon} size="20px" />}
                    variant="ghost"
                    color="gray.400"
                    _hover={{ color: activeColor, bg: hoverBg, transform: "scale(1.1)" }}
                    _active={{ color: activeColor }}
                    size="lg"
                    borderRadius="full"
                    transition="all 0.2s"
                />
            </Tooltip>
        </ScrollLink>
    );
};

export default function StickyNav() {
    return (
        <MotionBox
            position="fixed"
            bottom="20px"
            left="0"
            right="0"
            mx="auto" // Center horizontally
            width="fit-content" // Take only needed width
            maxWidth="95vw" // Prevent overflow on mobile
            zIndex={100}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <Flex
                bg="rgba(23, 25, 35, 0.8)"
                backdropFilter="blur(10px)"
                borderRadius="full"
                px={{ base: 3, md: 6 }} // Less padding on mobile
                py={3}
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.5)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                gap={{ base: 1, md: 2 }} // Smaller gap on mobile
                justifyContent="center"
                overflowX="auto" // Allow scrolling if content is still too wide (unlikely with fit-content but safe)
            >
                <NavItem to="prologue" icon={FaBook} label="Prólogo" />
                <NavItem to="timeline" icon={FaHistory} label="Linha do Tempo" />
                <NavItem to="conclusion" icon={FaGavel} label="Veredito" />
                <NavItem to="map" icon={FaMapMarkedAlt} label="Mapa & Evidências" />
                <NavItem to="profile" icon={FaBrain} label="Perfil Psicológico" />
            </Flex>
        </MotionBox>
    );
}
