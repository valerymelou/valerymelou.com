import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, REQUEST } from '@angular/core';

import { CookiesService } from './cookies.service';

describe('CookiesService', () => {
  let service: CookiesService;
  let mockDocument: { cookie: string };

  beforeEach(() => {
    mockDocument = { cookie: '' };

    Object.defineProperty(global, 'document', {
      value: mockDocument,
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });

    service = TestBed.inject(CookiesService);
  });

  afterEach(() => {
    mockDocument.cookie = '';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get cookies', () => {
    service.setCookie('testKey', 'testValue');

    // Simulate the cookie being set in the browser
    mockDocument.cookie = 'testKey=testValue';

    const result = service.getCookie('testKey');
    expect(result).toBe('testValue');
  });

  it('should return null for non-existent cookie', () => {
    mockDocument.cookie = 'existingKey=existingValue';

    const result = service.getCookie('nonExistentKey');
    expect(result).toBeNull();
  });

  it('should set cookie with custom options', () => {
    service.setCookie('customKey', 'customValue', {
      maxAge: 3600,
      path: '/custom',
      secure: false,
    });

    expect(mockDocument.cookie).toContain('customKey=customValue');
    expect(mockDocument.cookie).toContain('Path=/custom');
    expect(mockDocument.cookie).toContain('Max-Age=3600');
    expect(mockDocument.cookie).not.toContain('Secure');
  });

  it('should remove cookies', () => {
    service.removeCookie('testKey');
    expect(mockDocument.cookie).toBe('testKey=; Path=/; Max-Age=0');
  });

  it('should get all cookies', () => {
    mockDocument.cookie = 'key1=value1; key2=value2';

    const result = service.getAllCookies();
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should clear all cookies', () => {
    mockDocument.cookie = 'key1=value1; key2=value2';
    const removeCookieSpy = jest.spyOn(service, 'removeCookie');

    service.clear();

    expect(removeCookieSpy).toHaveBeenCalledWith('key1');
    expect(removeCookieSpy).toHaveBeenCalledWith('key2');
  });

  it('should work on server with request headers', () => {
    const mockRequest = {
      headers: { get: jest.fn().mockReturnValue('serverKey=serverValue') },
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: REQUEST, useValue: mockRequest },
      ],
    });

    service = TestBed.inject(CookiesService);

    const result = service.getCookie('serverKey');
    expect(result).toBe('serverValue');
  });
});
