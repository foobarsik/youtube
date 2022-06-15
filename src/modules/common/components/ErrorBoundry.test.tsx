import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {BugsnagErrorTrackingService} from '../../../services/errorTracking/BugsnagErrorTrackingService';
import {ErrorBoundary} from './ErrorBoundry';

const ComponentWithBug = () => {
	throw new Error('Test error');
};
const errorTrackingService = new BugsnagErrorTrackingService();

it('shows errorBoundaryView when children throws error', () => {
	const originalConsoleError = console.error;
	console.error = jest.fn();

	const {queryByTestId} = render(
		<ErrorBoundary errorTracking={errorTrackingService}>
			<ComponentWithBug />
		</ErrorBoundary>,
	);
	expect(queryByTestId('errorBoundaryView')).toBeTruthy();

	console.error = originalConsoleError;
});

it('shows children when there is no error in children renders', () => {
	const {queryByTestId} = render(
		<ErrorBoundary errorTracking={errorTrackingService}>
			<View />
		</ErrorBoundary>,
	);
	expect(queryByTestId('errorBoundaryView')).toBeFalsy();
});
