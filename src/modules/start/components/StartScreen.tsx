import styled from '@emotion/native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as mobx from 'mobx';
import {useStores} from '../../common/stores/RootStore';
import {Observer} from 'mobx-react-lite';
import {View, FlatList, ScrollView, Image} from 'react-native';
import {VideoPreview} from '../../videos/components/VideoPreview';
import {Chip} from '../../common/components/Chip';
import {H2} from '../../../theme/Typography';
import {LoadingStateSwitcher} from '../../common/components/LoadingStateSwitcher';

export const StartScreen = () => {
	const {videosStore, videoCategoriesStore} = useStores();
	const logoImage = require('../../../assets/logo.png');
	let activeCategoryId: string | undefined;

	const handleCategoryPress = (categoryId: string) => {
		activeCategoryId = activeCategoryId === categoryId ? undefined : categoryId;
		videosStore.getVideos(activeCategoryId);
	};

	useEffect(() => {
		videoCategoriesStore.getCategories();
		videosStore.getVideos();
	}, [videoCategoriesStore, videosStore]);

	return (
		<Observer>
			{() => (
				<Box>
					<View>
						<Logo source={logoImage} resizeMode="contain" />
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
							{videoCategoriesStore.categories.map(category => (
								<Chip
									id={category.id}
									title={category.title}
									isActive={activeCategoryId === category.id}
									key={category.id}
									onPress={handleCategoryPress}
								/>
							))}
						</ScrollView>
					</View>

					<Videos>
						<LoadingStateSwitcher
							loadingState={videosStore.loadingState}
							tryAgainCallback={() => videosStore.getVideos(activeCategoryId)}
						/>

						<InfoMessage>
							{videosStore.fetchedResults} / {videosStore.totalResults}
						</InfoMessage>

						<FlatList
							data={mobx.toJS(videosStore.videos)}
							renderItem={VideoPreview}
							keyExtractor={video => video.id}
							onEndReached={() => {
								videosStore.getVideos(activeCategoryId);
							}}
						/>
					</Videos>
				</Box>
			)}
		</Observer>
	);
};

const Box = styled(SafeAreaView)(({theme}) => ({
	backgroundColor: theme.color.background,
}));

const Videos = styled(View)({
	height: '100%',
});

const Logo = styled(Image)({
	height: 30,
	alignSelf: 'center',
	marginBottom: 10,
});

const InfoMessage = styled(H2)({
	alignSelf: 'center',
});
