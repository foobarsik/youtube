import React from 'react';
import {Pressable} from 'react-native';
import {H3} from '../../../theme/Typography';
import styled from '@emotion/native';

type Props = {
	id: string;
	title: string;
	isActive: boolean;
	onPress: (id: string) => void;
};

export const Chip = ({id, title, isActive, onPress}: Props) => {
	return (
		<Item isActive={isActive} onPress={() => onPress(id)}>
			<H3>{title}</H3>
		</Item>
	);
};

const Item = styled(Pressable)(({isActive}: {isActive: boolean}) => {
	const activeStyle = isActive ? {backgroundColor: '#cecece'} : {};
	return {
		backgroundColor: '#f6f6f6',
		borderRadius: 40,
		paddingHorizontal: 20,
		margin: 5,
		height: 36,
		justifyContent: 'center',
		...activeStyle,
	};
});
