import styled from '@emotion/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as mobx from 'mobx';
import {useStores} from '../../common/stores/RootStore';
import {Observer} from 'mobx-react-lite';
import {FlatList, ScrollView} from 'react-native';
import {VideoPreview} from '../../videos/components/VideoPreview';
import {VideoCategory} from '../../videoCategories/components/VideoCategory';

export const StartScreen = () => {
	const rootStore = useStores();
	let activeCategoryId: string | undefined;

	const handleCategoryPress = (categoryId: string) => {
		activeCategoryId = activeCategoryId === categoryId ? undefined : categoryId;
		rootStore.videosStore.getVideos(activeCategoryId);
	};

	return (
		<Observer>
			{() => (
				<Box>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
						{rootStore.videoCategoriesStore.categories.map(category => (
							<VideoCategory
								id={category.id}
								title={category.title}
								isActive={activeCategoryId === category.id}
								key={category.id}
								pressHandler={handleCategoryPress}
							/>
						))}
					</ScrollView>

					<FlatList
						data={mobx.toJS(rootStore.videosStore.videos)}
						renderItem={VideoPreview}
						keyExtractor={video => video.id}
						onEndReached={() => {
							rootStore.videosStore.getVideos(activeCategoryId);
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
