type libNavigatorType = typeof window.navigator;

export interface ShareOptions {
	title: string;
	text: string;
	url: string;
}

export interface Navigator extends libNavigatorType {
	canShare: boolean;
	share: (options: ShareOptions) => Promise<void>;
}
