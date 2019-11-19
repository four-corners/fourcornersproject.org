import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
	.use(Backend)
	.use(LngDetector)
	.use(reactI18nextModule)
	.init({
		fallbackLng: 'en',
		debug: true,
		react: {
			wait: true,
			bindI18n: 'languageChanged loaded',
			bindStore: 'added removed',
			nsMode: 'default',
		},
		detection: {
			order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'subdomain'],
			lookupQuerystring: 'lang',
			lookupCookie: 'i18n',
			lookupLocalStorage: 'i18nextLng',

		},
		backend: {
			loadPath: siteSettings.url.api+'{{ns}}/{{lng}}'
		}
	});

export default i18n;