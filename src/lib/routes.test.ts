import { describe, it, expect } from 'vitest';
import { getLocalizedPath, routeMappings } from './routes';

describe('getLocalizedPath', () => {
  it('should return homepage for empty path or slash', () => {
    expect(getLocalizedPath('en', '/')).toBe('/en');
    expect(getLocalizedPath('es', '')).toBe('/es');
  });

  it('should localize properties correctly', () => {
    // en properties -> en properties (mapped from propiedades)
    expect(getLocalizedPath('en', 'propiedades')).toBe('/en/properties');
    // es propiedades -> es propiedades
    expect(getLocalizedPath('es', 'propiedades')).toBe('/es/propiedades');
  });

  it('should localize contact correctly', () => {
    expect(getLocalizedPath('en', 'contact')).toBe('/en/contact');
    expect(getLocalizedPath('es', 'contact')).toBe('/es/contactar');
  });

  it('should handle leading slashes', () => {
    expect(getLocalizedPath('en', '/propiedades')).toBe('/en/properties');
  });

  it('should return original if no mapping exists', () => {
    expect(getLocalizedPath('en', 'unknown')).toBe('/en/unknown');
  });
});

describe('routeMappings', () => {
  it('should contain all required locales', () => {
    expect(routeMappings).toHaveProperty('en');
    expect(routeMappings).toHaveProperty('es');
  });

  it('should have correct mapping for en properties', () => {
    expect(routeMappings.en.properties).toBe('propiedades');
  });
});
