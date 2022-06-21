import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {H3} from '../../../theme/Typography';
import styled from '@emotion/native';

export const VideoCategory = ({
	id,
	title,
	isActive,
	pressHandler,
}: {
	id: string;
	title: string;
	isActive: boolean;
	pressHandler: (categoryId: string) => void;
}) => {
	return (
		<Chip style={[isActive && styles.activeCategory]} onPress={() => pressHandler(id)}>
			<H3 style={[isActive && styles.activeCategoryTitle]}>{title}</H3>
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

const styles = StyleSheet.create({
	activeCategory: {
		backgroundColor: '#333',
	},
	activeCategoryTitle: {
		color: '#fff',
	},
});
