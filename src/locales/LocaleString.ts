type CONSTANTS = 'PLACES' |
	'ROUTES' |
	'REVIEWS' |
	'MAP' |
	'CABINET' |
	'ALL' |
	'SEARCH' |
	'SORT' |
	'SHOW_ALL' |
	'NO_REVIEWS_PLACEHOLDER' |
	'REGISTER_PLACEHOLDER' |
	'ADD_REVIEW' |
	'ALL_REVIEWS' |
	'SIGN_ON' |
	'SIGN_IN' |
	'NAME' |
	'PASSWORD' |
	'EMAIl' |
	'FAVORITES' |
	'MY_REVIEWS' |
	'VISITED_PLACES' |
	'CONFIRM_EXIT' |
	'YES' |
	'NO' |
	'MINUTES' |
	'METERS' |
	'KILOMETERS' |
	'OBJECTS' |
	'SETTINGS' |
	'DARK_MODE' |
	'LANGUAGE';


type LocaleString = {
	[K in CONSTANTS]: string
};

export default LocaleString;
