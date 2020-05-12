import useStore from '../stores/useStore';
import LocaleString from '../locales/LocaleString';
import Locale from '../util/types/Locale';
import EnLocaleStings from '../locales/EnLocaleStrings';
import RuLocaleStings from '../locales/RuLocaleStrings';

export function useCurrentLocale(): Locale {
	const { settings } = useStore();

	return settings.locale;
}

export default function useLocaleString(): LocaleString {
	const locale = useCurrentLocale();

	switch (locale) {
		case Locale.EN:
			return EnLocaleStings;
		case Locale.RU:
			return RuLocaleStings;
		default:
			return RuLocaleStings;
	}
}
