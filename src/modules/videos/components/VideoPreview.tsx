import React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import {H3} from '../../../theme/Typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from '@emotion/native';
import {Video} from '../types/video';

const imageRatio = 0.5; // just because it's look good with this ratio
const imageWidth = Dimensions.get('window').width;
const imageHeight = imageWidth * imageRatio;

export const VideoPreview = ({item}: {item: Video}) => (
	<Box key={item.id}>
		<PreviewImage source={{uri: item.thumbnail.url}} imageWidth={imageWidth} imageHeight={imageHeight} />
		<PlayIcon>
			<MaterialCommunityIcons name="play" color={'white'} size={40} />
		</PlayIcon>
		<Title>{item.title}</Title>
	</Box>
);

const Box = styled(Pressable)({
	marginBottom: 2,
});

const PreviewImage = styled(Image)(({imageWidth, imageHeight}: {imageWidth: number; imageHeight: number}) => ({
	width: imageWidth,
	height: imageHeight,
}));

const PlayIcon = styled(View)({
	...StyleSheet.absoluteFillObject,
	justifyContent: 'center',
	alignItems: 'center',
});

const Title = styled(H3)({
	position: 'absolute',
	zIndex: 99999,
	bottom: 0,
	padding: 10,
	elevation: 99999,
	backgroundColor: '#000000cc',
	borderTopRightRadius: 10,
	color: '#fff',
});
