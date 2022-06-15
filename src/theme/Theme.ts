import {Theme as ITheme} from '@emotion/react';
import {Platform} from 'react-native';
import {Color} from './Color';

export const Theme: ITheme = {
	color: {
		background: Color.PRIMARY_WHITE,
		button: Color.PRIMARY_BLACK,
		buttonText: Color.PRIMARY_WHITE,
		text: Color.PRIMARY_BLACK,
	},
	text: {fontFamily: Platform.select({android: 'Roboto', default: 'Helvetica'})},
};
