import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		color: {
			background: string;
			button: string;
			buttonText: string;
			text: string;
		};
		text: {
			fontFamily: string;
		};
	}
}
