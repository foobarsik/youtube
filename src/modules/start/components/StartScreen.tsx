import styled from '@emotion/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {H3} from '../../../theme/Typography';
import {useStores} from '../../common/stores/RootStore';
import {Observer} from 'mobx-react-lite';
import {Pressable} from 'react-native';

export const StartScreen = () => {
	const rootStore = useStores();

	return (
		<Observer>
			{() => (
				<Box>
					{rootStore.videoCategoriesStore.categories.map(category => (
						<Category key={category.id}>
							<H3>{category.title}</H3>
						</Category>
					))}
				</Box>
			)}
		</Observer>
	);
};

const Box = styled(SafeAreaView)(({theme}) => ({
	alignItems: 'center',
	justifyContent: 'center',
	flex: 1,
	flexDirection: 'row',
	flexWrap: 'wrap',
	backgroundColor: theme.color.background,
}));

const Category = styled(Pressable)(({theme}) => ({
	borderRadius: 30,
	borderColor: theme.color.button,
	borderWidth: 1,
	paddingHorizontal: 10,
	paddingVertical: 5,
	margin: 5,
}));
