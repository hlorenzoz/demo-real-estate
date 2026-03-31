import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: function NextImage({ fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean | string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} data-fill={fill ? "true" : undefined} alt={props.alt || ""} />;
  },
}));

// Mock framer-motion to simplify rendering for unit tests
vi.mock('framer-motion', () => {
  const createMockComponent = (Tag: string) => {
    const Component = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
      return React.createElement(Tag, { ...props, ref }, children);
    });
    Component.displayName = `Motion${Tag}`;
    return Component;
  };

  return {
    motion: {
      div: createMockComponent('div'),
      h1: createMockComponent('h1'),
      h2: createMockComponent('h2'),
      h3: createMockComponent('h3'),
      p: createMockComponent('p'),
      span: createMockComponent('span'),
      button: createMockComponent('button'),
      section: createMockComponent('section'),
      article: createMockComponent('article'),
      nav: createMockComponent('nav'),
      li: createMockComponent('li'),
      ul: createMockComponent('ul'),
      form: createMockComponent('form'),
    },
    AnimatePresence: function AnimatePresence({ children }: { children: React.ReactNode }) { return <>{children}</>; },
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useSpring: () => 0,
  };
});
