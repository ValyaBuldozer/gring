import * as React from 'react';
import {Link, useLocation} from "react-router-dom";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PlaceIcon from "@material-ui/icons/Place";
import PersonIcon from '@material-ui/icons/Person';
import MapIcon from "./icons/MapIcon";
import RouteIcon from "./icons/RouteIcon";
import BottomNavigation from "@material-ui/core/BottomNavigation";

interface Props {
	className?: string;
}

function getValueByLocation(location: string): number | null {
	const path = location.split('/')[1];

	switch (path) {
		case '':
		case 'objects':
			return 0;
		case 'routes':
			return 1;
		case 'map':
			return 2;
		case 'user':
			return 3;
		default:
			return null;
	}
}

export default function NavBar({ className = '' }: Props) {
	const { pathname } = useLocation();

	React.useEffect(() => {
		setValue(getValueByLocation(pathname));
	}, [pathname]);

	const [value, setValue] = React.useState<number | null>(getValueByLocation(pathname));

	return (
		<BottomNavigation
			value={value}
			showLabels
			onChange={(e, v) => setValue(v)}
			className={className}>
			<BottomNavigationAction
				component={Link}
				to={'/objects'}
				label="Места"
				icon={<PlaceIcon/>}/>
			<BottomNavigationAction
				component={Link}
				to={'/routes'}
				label="Маршруты"
				icon={<RouteIcon/>}/>
			<BottomNavigationAction
				component={Link}
				to={'/map'}
				label="Карта"
				icon={<MapIcon/>}/>
			<BottomNavigationAction
				component={Link}
				to={'/user'}
				label="Кабинет"
				icon={<PersonIcon/>}/>
		</BottomNavigation>
	)
}


