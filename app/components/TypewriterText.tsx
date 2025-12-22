'use client';

import { Text, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps extends TextProps {
    text: string;
    speed?: number;
    delay?: number;
    cursorColor?: string;
}

export default function TypewriterText({ text, speed = 50, delay = 0, cursorColor = "blue.400", ...props }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let currentIndex = 0;
        // Ensure we start clean
        setDisplayedText("");

        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                // Use slice to be deterministic about what is displayed based on current index
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [started, text, speed]);

    return (
        <Text {...props}>
            {displayedText}
        </Text>
    );
}
