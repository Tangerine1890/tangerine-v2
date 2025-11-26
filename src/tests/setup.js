import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock Telegram WebApp
global.window = global.window || {};
global.window.Telegram = {
    WebApp: {
        ready: vi.fn(),
        expand: vi.fn(),
        enableClosingConfirmation: vi.fn(),
        disableVerticalSwipes: vi.fn(),
        setHeaderColor: vi.fn(),
        setBackgroundColor: vi.fn(),
        MainButton: {
            show: vi.fn(),
            hide: vi.fn(),
            setText: vi.fn(),
            onClick: vi.fn(),
            offClick: vi.fn(),
            showProgress: vi.fn(),
            hideProgress: vi.fn(),
        },
        HapticFeedback: {
            impactOccurred: vi.fn(),
            notificationOccurred: vi.fn(),
            selectionChanged: vi.fn(),
        },
        CloudStorage: {
            getItem: vi.fn((key, callback) => callback(null, null)),
            setItem: vi.fn((key, value, callback) => callback(null, true)),
            removeItem: vi.fn((key, callback) => callback(null, true)),
        },
        platform: 'web',
        initDataUnsafe: {
            user: {
                id: 123456,
                first_name: 'Test',
                last_name: 'User',
                username: 'testuser',
            },
        },
        themeParams: {
            bg_color: '#1a1a1a',
            text_color: '#ffffff',
            hint_color: '#999999',
            link_color: '#f97316',
            button_color: '#f97316',
            button_text_color: '#ffffff',
        },
    },
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    disconnect() { }
    observe() { }
    takeRecords() {
        return [];
    }
    unobserve() { }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
global.localStorage = localStorageMock;
