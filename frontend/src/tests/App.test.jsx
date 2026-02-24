import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
    it('renders heading without crashing', () => {
        render(<App />);
        const headingElement = screen.getByText(/Ulaşım Analiz Paneli/i);
        expect(headingElement).toBeInTheDocument();
    });
});
