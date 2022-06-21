import styled from '@emotion/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as mobx from 'mobx';
import {useTranslation} from 'react-i18next';
import {useStores} from '../../common/stores/RootStore';
import {Observer} from 'mobx-react-lite';
import {ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {VideoPreview} from '../../videos/components/VideoPreview';
import {VideoCategory} from '../../videoCategories/components/VideoCategory';
import {H2} from '../../../theme/Typography';

export const StartScreen = () => {
	const rootStore = useStores();
	const videosStore = rootStore.videosStore;
	const videoCategoriesStore = rootStore.videoCategoriesStore;
	const {t} = useTranslation('general');
	let activeCategoryId: string | undefined;

	const handleCategoryPress = (categoryId: string) => {
		activeCategoryId = activeCategoryId === categoryId ? undefined : categoryId;
		videosStore.getVideos(activeCategoryId);
	};

	return (
		<Observer>
			{() => (
				<Box>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
						{videoCategoriesStore.categories.map(category => (
							<VideoCategory
								id={category.id}
								title={category.title}
								isActive={activeCategoryId === category.id}
								key={category.id}
								pressHandler={handleCategoryPress}
							/>
						))}
					</ScrollView>

					{videosStore.isLoading && <ActivityIndicator size="large" color="red" />}

					<InfoMessage>
						{videosStore.fetchedResults} / {videosStore.totalResults}
					</InfoMessage>

					{videosStore.isError && <Error>{t('errorHappened')}</Error>}

					<FlatList
						data={mobx.toJS(videosStore.videos)}
						renderItem={VideoPreview}
						keyExtractor={video => video.id}
						onEndReached={() => {
							videosStore.getVideos(activeCategoryId);
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

const Error = styled(H2)(() => ({
	alignSelf: 'center',
	color: 'red',
}));

const InfoMessage = styled(H2)(() => ({
	alignSelf: 'center',
}));
