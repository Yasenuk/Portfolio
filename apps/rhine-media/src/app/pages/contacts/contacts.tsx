import { Seo } from "@portfolio/shared-ui";
import Contact from "./sections/contact";
import FAQ from "./sections/faq";
import Hero from "./sections/hero";

export default function Contacts() {
	return (
		<>
			<Seo
        title="Контакти — Rhine Media"
        description="Зв’яжіться з Rhine Media. Почніть співпрацю або поставте будь-яке запитання нашій команді."
			/>
			
			<Hero />
			<Contact />
			<FAQ />
		</>
	);
}