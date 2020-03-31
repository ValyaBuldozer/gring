import { action, computed, observable } from "mobx";
import Locale from "../util/types/Locale";

const LOCALE_STORAGE_PATH = 'locale';
const THEME_STORAGE_PATH = 'theme';

type Theme = 'light' | 'dark';

export default class SettingsStore {

    @observable
    private currentLocale: Locale;

    @observable
    private currentTheme: Theme;

    constructor() {
        this.currentLocale = (
            window.localStorage.getItem(LOCALE_STORAGE_PATH) ??
            window.navigator.language.substring(0, 2).toLowerCase()
        ) as Locale;

        this.currentTheme = (
            window.localStorage.getItem(THEME_STORAGE_PATH) as Theme ??
            (window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light')
        );
    }

    @computed
    get locale(): Locale {
        return this.currentLocale;
    }

    @computed
    get theme(): Theme {
        return this.currentTheme;
    }

    @action
    setLocale(locale: Locale) {
        window.localStorage.setItem(LOCALE_STORAGE_PATH, locale);
        this.currentLocale = locale;
    }

    @action
    setTheme(theme: Theme) {
        window.localStorage.setItem(THEME_STORAGE_PATH, theme);
        this.currentTheme = theme;
    }

    @action
    switchTheme() {
        if (this.currentTheme == 'light') {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }
}