'use client';

import * as THREE from 'three';

import { useControls } from 'leva';
import { ScrollDamper, useScrollSource } from './scroll-damper';
import { Canvas } from '@react-three/fiber';
import { CameraHUD, Crosshair, HUDOverlay } from './HUD';
import { OrbitControls } from '@react-three/drei';

function Scene() {
	useScrollSource();
	const { debug } = useControls({ debug: false });

	return (
		<>
			<div style={{ position: 'fixed', inset: 0 }}>
				<Canvas dpr={[1, 1.75]} gl={{ antialias: true }}>
					<ScrollDamper />
					{/* <CameraRig debug={debug} path={path} lookPath={lookPath} /> */}
					<CameraHUD />
					<ambientLight intensity={1} />
					<directionalLight position={[3, 5, 10]} intensity={1} />
					<directionalLight position={[3, 5, -10]} intensity={1} />
					<OrbitControls />
				</Canvas>
			</div>

			<HUDOverlay />
			{debug && <Crosshair />}
			<div style={{ height: '300vh', pointerEvents: 'none' }} />
		</>
	);
}

export { Scene };
