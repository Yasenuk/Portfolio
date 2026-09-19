'use client';

import * as THREE from 'three';

import { Environment, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	CameraHUD,
	CameraRig,
	Crosshair,
	HUDOverlay,
	scroll,
	ScrollDamper,
	useScrollSource
} from '@/libs/features';
import { Bottle, Church, Info, lookPath, path } from '@/libs/components';

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
					{/* <fogExp2 attach="fog" args={['#0d1b2e', 0.0082]} /> */}
					{/* <Environment files={'/church/enviroment/PHONAI.hdr'} background /> */}
					{/* <Church /> */}
					<ambientLight intensity={1} />
					<directionalLight position={[3, 5, 10]} intensity={1} />
					<directionalLight position={[3, 5, -10]} intensity={1} />
					<OrbitControls />
					<Bottle />
				</Canvas>
			</div>

			<HUDOverlay />
			{debug && <Crosshair />}
			<div style={{ height: '300vh', pointerEvents: 'none' }} />
		</>
	);
}

export { Scene };
