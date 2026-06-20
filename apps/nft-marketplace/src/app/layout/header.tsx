import { BurgerMenuBackdrop, BurgerMenuTrigger, ButtonMain, Logo } from "@portfolio/nft-marketplace";
import { BurgerMenu, BurgerMenuBody,  } from "@portfolio/nft-marketplace";

export function Header() {
	return (
		<header>
			<div className="container relative flex items-center justify-between py-[15px] lg:py-5">
				<Logo />
				<BurgerMenu>
					<BurgerMenuBackdrop />
					<BurgerMenuTrigger />
					<BurgerMenuBody>
						<ButtonMain icon="user" size="md" px="sm">Sign up</ButtonMain>
					</BurgerMenuBody>
				</BurgerMenu>
			</div>
		</header>
	);
}