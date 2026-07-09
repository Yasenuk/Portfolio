'use client'

import * as React from "react";
import { BurgerMenuBackdrop, BurgerMenuTrigger, ButtonMain, Logo, NavMenu } from "@portfolio/nft-marketplace";
import { BurgerMenu, BurgerMenuBody, } from "@portfolio/nft-marketplace";
import Link from "next/link";
import { useSession } from "../../features/auth/auth-provider";

export function Header() {
	const { user, loading } = useSession();

	return (
		<header>
			<div className="container relative flex items-center justify-between py-[15px] lg:py-5">
				<Logo responsibility />
				<h2>{user?.username}</h2>
				<BurgerMenu>
					<BurgerMenuBackdrop />
					<BurgerMenuTrigger />
					<BurgerMenuBody>
						<NavMenu className="lg:flex-row items-center" linkClassName="text-h4 lg:text-body" />
						{user ? <span>{user.username}</span> : !loading &&
							<ButtonMain icon="user" size="md" px="sm" asChild className="max-md:w-full max-md:max-w-60">
								<Link href='/register'>Sign up</Link>
							</ButtonMain>
						}
					</BurgerMenuBody>
				</BurgerMenu>
			</div>
		</header>
	);
}