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

type JssStyleSheet<S extends {} = {}> = StyleSheet<S> | ((rootTheme: typeof theme) => StyleSheet<S>);

export default JssStyleSheet;
