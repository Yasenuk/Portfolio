import { lazy, Suspense } from 'react';
import { Seo } from "@portfolio/shared-ui";

import Hero from "./sections/hero";

const Contact = lazy(() => import('./sections/contact'));
const FAQ = lazy(() => import('./sections/faq'));

export default function Contacts() {
	return (
		<>
			<Seo
				title="Контакти — Rhine Media"
				description="Зв’яжіться з Rhine Media. Почніть співпрацю або поставте будь-яке запитання нашій команді."
			/>

			<Hero />

			<Suspense fallback={null}>
				<Contact />
				<FAQ />
			</Suspense>
		</>
	);
}