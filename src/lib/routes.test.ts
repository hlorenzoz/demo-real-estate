import { describe, it, expect } from 'vitest';
import { getLocalizedPath, routeMappings } from './routes';

describe('getLocalizedPath', () => {
  it('should return homepage for empty path or slash', () => {
    expect(getLocalizedPath('en', '/')).toBe('/en');
    expect(getLocalizedPath('es', '')).toBe('/es');
  });

  it('should localize properties (unified) correctly', () => {
    // /en/properties -> unified page (sale + rent)
    expect(getLocalizedPath('en', 'properties')).toBe('/en/properties');
    // /es/propiedades -> unified page (sale + rent)
    expect(getLocalizedPath('es', 'properties')).toBe('/es/propiedades');
  });

  it('should localize listings (sales-only) correctly', () => {
    // /en/listings -> sales-only page
    expect(getLocalizedPath('en', 'listings')).toBe('/en/listings');
    // /es/listados -> sales-only page
    expect(getLocalizedPath('es', 'listings')).toBe('/es/listados');
  });

  it('should localize rentals correctly', () => {
    expect(getLocalizedPath('en', 'rentals')).toBe('/en/rentals');
    expect(getLocalizedPath('es', 'rentals')).toBe('/es/alquiler');
  });

  it('should localize contact correctly', () => {
    expect(getLocalizedPath('en', 'contact')).toBe('/en/contact');
    expect(getLocalizedPath('es', 'contact')).toBe('/es/contacto');
  });

  it('should handle leading slashes', () => {
    expect(getLocalizedPath('en', '/properties')).toBe('/en/properties');
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

  it('should map en/properties to internal properties (unified page)', () => {
    expect(routeMappings.en.properties).toBe('properties');
  });

  it('should map en/listings to internal listings (sales-only page)', () => {
    expect(routeMappings.en.listings).toBe('listings');
  });

  it('should map es/propiedades to internal properties (unified page)', () => {
    expect(routeMappings.es.propiedades).toBe('properties');
  });

  it('should map es/listados to internal listings (sales-only page)', () => {
    expect(routeMappings.es.listados).toBe('listings');
  });

  it('should have correct mapping for services', () => {
    expect(routeMappings.en.services).toBe('services');
  });
});
