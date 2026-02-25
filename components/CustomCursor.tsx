"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        const moveMouse = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (dot) {
                dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        };

        const animate = () => {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;

            if (outline) {
                outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", moveMouse);
        animate();

        // 🧲 MAGNETIC EFFECT
        const magneticElements = document.querySelectorAll(".magnetic");

        magneticElements.forEach((el) => {
            const element = el as HTMLElement;

            element.addEventListener("mousemove", (e: MouseEvent) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            element.addEventListener("mouseleave", () => {
                element.style.transform = "translate(0px, 0px)";
            });
        });

        return () => {
            window.removeEventListener("mousemove", moveMouse);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={outlineRef} className="cursor-outline" />
        </>
    );
}