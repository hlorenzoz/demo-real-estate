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
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} fill={props.fill ? "true" : undefined} />;
  },
}));

// Mock framer-motion to simplify rendering for unit tests
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref) => (
      <div {...props} ref={ref}>{children}</div>
    )),
    h1: React.forwardRef(({ children, ...props }: any, ref) => (
      <h1 {...props} ref={ref}>{children}</h1>
    )),
    h2: React.forwardRef(({ children, ...props }: any, ref) => (
      <h2 {...props} ref={ref}>{children}</h2>
    )),
    h3: React.forwardRef(({ children, ...props }: any, ref) => (
      <h3 {...props} ref={ref}>{children}</h3>
    )),
    p: React.forwardRef(({ children, ...props }: any, ref) => (
      <p {...props} ref={ref}>{children}</p>
    )),
    span: React.forwardRef(({ children, ...props }: any, ref) => (
      <span {...props} ref={ref}>{children}</span>
    )),
    button: React.forwardRef(({ children, ...props }: any, ref) => (
      <button {...props} ref={ref}>{children}</button>
    )),
    section: React.forwardRef(({ children, ...props }: any, ref) => (
      <section {...props} ref={ref}>{children}</section>
    )),
    article: React.forwardRef(({ children, ...props }: any, ref) => (
      <article {...props} ref={ref}>{children}</article>
    )),
    nav: React.forwardRef(({ children, ...props }: any, ref) => (
      <nav {...props} ref={ref}>{children}</nav>
    )),
    li: React.forwardRef(({ children, ...props }: any, ref) => (
      <li {...props} ref={ref}>{children}</li>
    )),
    ul: React.forwardRef(({ children, ...props }: any, ref) => (
      <ul {...props} ref={ref}>{children}</ul>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
  useSpring: () => 0,
}));
