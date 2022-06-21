import React from 'react';
import {Dimensions, Image, Pressable, View} from 'react-native';
import {H3} from '../../../theme/Typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from '@emotion/native';
import {Video} from '../types/video';

const imageRatio = 0.5; // just because it's look good with this ratio
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').width * imageRatio;

export const VideoPreview = ({item}: {item: Video}) => (
	<Box key={item.id}>
		<Image source={{uri: item.thumbnail.url}} style={{width: imageWidth, height: imageHeight}} />
		<PlayIcon>
			<MaterialCommunityIcons name="play" color={'white'} size={40} />
		</PlayIcon>
		<Title>{item.title}</Title>
	</Box>
);

const Box = styled(Pressable)(() => ({
	marginBottom: 2,
}));

const PlayIcon = styled(View)(() => ({
	position: 'absolute',
	left: 0,
	right: 0,
	alignItems: 'center',
	width: '100%',
	justifyContent: 'center',
	height: '100%',
}));

const Title = styled(H3)(() => ({
	position: 'absolute',
	zIndex: 99999,
	bottom: 0,
	padding: 10,
	elevation: 99999,
	backgroundColor: '#000000cc',
	borderTopRightRadius: 10,
	color: '#fff',
}));
