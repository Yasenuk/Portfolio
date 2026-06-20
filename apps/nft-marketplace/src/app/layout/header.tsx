import { BurgerMenuBackdrop, BurgerMenuTrigger, ButtonMain, Logo, NavMenu } from "@portfolio/nft-marketplace";
import { BurgerMenu, BurgerMenuBody,  } from "@portfolio/nft-marketplace";
import Link from "next/link";

export function Header() {
	return (
		<header>
			<div className="container relative flex items-center justify-between py-[15px] lg:py-5">
				<Logo responsibility />
				<BurgerMenu>
					<BurgerMenuBackdrop />
					<BurgerMenuTrigger />
					<BurgerMenuBody>
						<NavMenu className="lg:flex-row items-center" linkClassName="text-h4 lg:text-body" />
						<ButtonMain icon="user" size="md" px="sm" asChild className="max-md:w-full max-md:max-w-60">
							<Link href='/sing-up'>Sign up</Link>
						</ButtonMain>
					</BurgerMenuBody>
				</BurgerMenu>
			</div>
		</header>
	);
}