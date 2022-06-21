import React from 'react';
import {Pressable} from 'react-native';
import {H3} from '../../../theme/Typography';
import styled from '@emotion/native';

export const VideoCategory = ({id, title}: {id: string; title: string}) => {
	return (
		<Chip>
			<H3>{title}</H3>
		</Chip>
	);
};

const Chip = styled(Pressable)(({theme}) => ({
	borderRadius: 30,
	borderColor: theme.color.button,
	borderWidth: 1,
	paddingHorizontal: 10,
	paddingVertical: 5,
	margin: 5,
}));
