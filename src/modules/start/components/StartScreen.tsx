import styled from '@emotion/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {H1} from '../../../theme/Typography';
import {VersionLabel} from '../../common/components/VersionLabel';

export const StartScreen = () => {
	const {t} = useTranslation('start');

	return (
		<Box>
			<H1>{t('title')}</H1>
			<VersionLabel />
		</Box>
	);
};

const Box = styled(SafeAreaView)(({theme}) => ({
	alignItems: 'center',
	justifyContent: 'center',
	flex: 1,
	backgroundColor: theme.color.background,
}));
