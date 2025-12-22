'use client';

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";

export default function MagnifyingTitle() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Use a more robust check that handles font loading and layout shifts
        const updateDimensions = () => {
            if (containerRef.current) {
                // We access the first child (background heading) to get exact dimensions if needed,
                // or just the container. Since the container is inline-block and contains only one Heading, 
                // outerHeight should match.
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        // Initial check
        updateDimensions();

        // Listen for standard resize
        window.addEventListener('resize', updateDimensions);

        // Polling check for a short duration to catch font swaps (FOUC)
        const interval = setInterval(updateDimensions, 100);
        setTimeout(() => clearInterval(interval), 1000);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearInterval(interval);
        };
    }, []);

    const lensSize = 120;
    const { width, height } = dimensions;

    // VARIAVEL PARA AJUSTE DO TAMANHO DO TEXTO NO CELULAR
    // Opções comuns: "lg", "xl", "2xl", "3xl"
    const mobileTextSize = "xl";

    // VARIAVEL PARA AJUSTE DO TAMANHO DO ÍCONE DA LUPA
    const iconSize = 50;

    const headingProps = {
        as: "h1" as const,
        size: { base: mobileTextSize, md: "3xl", lg: "4xl" }, // Responsive sizing to fit mobile
        fontWeight: "black",
        letterSpacing: "tighter",
        whiteSpace: "nowrap" as const, // Prevents wrapping which could cause width mismatch
        lineHeight: "shorter",
    };



    // VARIAVEL PARA AJUSTE VERTICAL MANUAL (DESKTOP)
    // Altere este valor (em pixels) para subir (negativo) ou descer (positivo) o texto da lupa no PC
    const manualOffset = -17;

    // VARIAVEL PARA AJUSTE VERTICAL MANUAL (CELULAR)
    // Altere este valor (em pixels) para ajustar apenas no celular
    const mobileManualOffset = 6;

    // Decide qual offset usar baseado no tamanho da tela
    // ssr: false evita problemas de hidratação
    const currentOffset = useBreakpointValue({ base: mobileManualOffset, md: manualOffset }, { ssr: false }) ?? manualOffset;

    return (
        <Box
            position="relative"
            display="inline-block"
            ref={containerRef}
            py={4}
        >
            {/* Background Layer */}
            <Heading
                {...headingProps}
                color="gray.700"
                opacity={0.3}
                pb="10px"
            >
                A CAÇADA A VERDADE
            </Heading>

            {/* Magnifying Glass Layer */}
            {width > 0 && (
                <motion.div
                    aria-hidden="true"
                    animate={{
                        left: [-lensSize / 2, width - lensSize / 2]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: lensSize,
                        height: lensSize,
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        zIndex: 10,
                        backgroundColor: 'transparent',
                    }}
                >
                    {/* Inner Content - Counter animated + container matching */}
                    <motion.div
                        animate={{
                            x: [lensSize / 2, -(width - lensSize / 2)]
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            position: 'absolute',
                            top: currentOffset, // USANDO O OFFSET RESPONSIVO
                            left: 0,
                            width: width,
                            height: height,
                        }}
                    >
                        {/* 
                            Structural Mirroring:
                            The outer container has `py={4}`.
                            We wrap the Heading in a Box with `py={4}` to match the exact vertical flow.
                            We also ensure width is full to align horizontally.
                         */}
                        <Box py={4} width="100%" height="100%">
                            <Heading
                                {...headingProps}
                                bgGradient="linear(to-r, blue.400, purple.500)"
                                bgClip="text"
                                pb="10px" // Must match background padding exactly
                            >
                                A CAÇADA A VERDADE
                            </Heading>
                        </Box>
                    </motion.div>

                    {/* Glare/Reflection */}
                    <Box
                        position="absolute"
                        top="15%"
                        left="15%"
                        width="25%"
                        height="15%"
                        bg="white"
                        opacity={0.4}
                        borderRadius="50%"
                        filter="blur(5px)"
                    />

                    {/* Icon Handle visual */}
                    <Box position="absolute" bottom="15%" right="15%" color="white" opacity={0.6}>
                        <FaSearch size={iconSize} style={{ transform: 'scaleX(-1)' }} />
                    </Box>
                </motion.div>
            )}
        </Box>
    );
}
