import styled from '@emotion/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {H3} from '../../../theme/Typography';
import {useStores} from '../../common/stores/RootStore';
import {Observer} from 'mobx-react-lite';
import {Pressable, FlatList} from 'react-native';
import {VideoPreview} from '../../videos/components/VideoPreview';
import * as mobx from 'mobx';

export const StartScreen = () => {
	const rootStore = useStores();

	return (
		<Observer>
			{() => (
				<Box>
					<Categories>
						{rootStore.videoCategoriesStore.categories.map(category => (
							<Category key={category.id}>
								<H3>{category.title}</H3>
							</Category>
						))}
					</Categories>

					<FlatList
						data={mobx.toJS(rootStore.videosStore.videos)}
						renderItem={VideoPreview}
						keyExtractor={video => video.id}
						onEndReached={() => {
							rootStore.videosStore.getVideos();
						}}
					/>
				</Box>
			)}
		</Observer>
	);
};

const Box = styled(SafeAreaView)(({theme}) => ({
	backgroundColor: theme.color.background,
}));

const Categories = styled(SafeAreaView)(({theme}) => ({
	justifyContent: 'center',
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
