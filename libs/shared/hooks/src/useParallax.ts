'use client';

import { useEffect, useRef } from "react";

function useParallax() {
	const containerRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	const frame = useRef(0);

	useEffect(() => () => cancelAnimationFrame(frame.current), []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY } = e;

		cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(() => {
			const container = containerRef.current;
			const child = childRef.current;
			if (!child || !container) return;

			const cx = window.innerWidth / 2;
			const cy = window.innerHeight / 2;

			const rotateY = ((clientX - cx) / cx) * 0;
			const rotateX = ((cy - clientY) / cy) * 0;
			const translateX = ((clientX - cx) / cx) * 90;
			const translateY = ((clientY - cy) / cy) * 90;

			child.style.transform =
				`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${-translateX}px) translateY(${-translateY}px) translateZ(-100px)`;
		});
	};

	return { containerRef, childRef, handleMouseMove };
}

export { useParallax };