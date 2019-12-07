import { CSSProperties } from 'react';

type CSSProps<S> = {
    [key in keyof CSSProperties]: CSSProperties[key] | ((state: S) => CSSProperties[key])
}

type PseudoElementsList = '&:after' | '&:before' | '&:hover';

type PseudoElements<S> = {
    [key in PseudoElementsList]: CSSProperties
}

type JssStyleSheet<S extends {} = {}> = {
    [className: string]: CSSProps<S> | PseudoElements<S>  
}

export default JssStyleSheet;
