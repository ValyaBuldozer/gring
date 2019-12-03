import { CSSProperties } from 'react';

type JssStyleSheet<S extends {} = {}> = {
    [K: string]: {
        [key in keyof CSSProperties]: CSSProperties[key] | ((state: S) => CSSProperties[key])
    }
}

export default JssStyleSheet;
