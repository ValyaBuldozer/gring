import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useStore from '../../stores/useStore';
import { List, ListItem, ListItemSecondaryAction, ListSubheader, MenuItem, Select, Switch } from '@material-ui/core';
import Locale, { LOCALES } from '../../util/types/Locale';
import ListItemText from '@material-ui/core/ListItemText';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({}));

const localeLabels: Record<Locale, string> = {
	[Locale.RU]: 'Русский',
	[Locale.EN]: 'English'
};

function SettingsScreen() {
	const { settings } = useStore();

	const localeOnChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		settings.setLocale(e.target.value as Locale);
		window.location.reload();
	};

	return (
		<List subheader={<ListSubheader>Настройки</ListSubheader>}>
			<ListItem>
				<ListItemText>Темная тема</ListItemText>
				<ListItemSecondaryAction>
					<Switch
						edge='end'
						onChange={() => settings.switchTheme()}
						checked={settings.theme == 'dark'}
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText>Язык</ListItemText>
				<ListItemSecondaryAction>
					<Select
						value={settings.locale}
						onChange={localeOnChange}>
						{
							LOCALES.map(locale => (
								<MenuItem value={locale}>
									{localeLabels[locale]}
								</MenuItem>
							))
						}
					</Select>
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	)
}

export default observer(SettingsScreen);
