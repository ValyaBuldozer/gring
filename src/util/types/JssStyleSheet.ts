import { CSSProperties } from 'react';
import theme from "../../styles/theme";

type CSSProps<S> = {
    [key in keyof CSSProperties]: CSSProperties[key] | ((state: S) => CSSProperties[key])
}

type PseudoElementsList = '&:after' | '&:before' | '&:hover' | '&:first-of-type';

type PseudoElements<S> = {
    [key in PseudoElementsList]?: CSSProperties
}

type StyleSheet<S> = {
    [className: string]: CSSProps<S> | PseudoElements<S>  
}

export type ThemedStyleSheet<S extends {} = {}> = (rootTheme: typeof theme) => StyleSheet<S>;

type JssStyleSheet<S extends {} = {}> = StyleSheet<S> | ThemedStyleSheet<S>;

export default JssStyleSheet;
