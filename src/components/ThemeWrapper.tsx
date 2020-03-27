import * as React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";
import { CssBaseline } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import useStore from "../stores/useStore";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

type Props = React.PropsWithChildren<{}>;

function ThemeWrapper({ children }: Props) {
    const { settings } = useStore();

    const currentTheme = createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
            type: settings.theme
        }
    });

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default observer(ThemeWrapper);
