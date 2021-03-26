import React from 'react';
import { render, screen } from '@testing-library/react';
import BubblePage from './BubblePage';

test('Renders BubblePage without errors', () => {
	// Setup test for basic rendering of component
	render(<BubblePage />);
});

test('Fetches data and renders the bubbles on mounting', async () => {
	render(<BubblePage />);

	// Setup test for initial rendering of bubbles on loading
	const bubbles = await screen.findByText('bubbles');
	expect(bubbles).toBeInTheDocument();
});
