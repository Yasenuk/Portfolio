'use client'

import { AuthForm, ProfileHeader } from '@portfolio/nft-marketplace';
import * as React from 'react';

export default function ProfileCreateForm() {
	

	return (
		<AuthForm
			title='Create a profile'
			description='Select a background image for your profile and an avatar. Write a bio about yourself.'
			imageSrc='form_img.png'
		>
			<ProfileHeader />
		</AuthForm>
	);
}