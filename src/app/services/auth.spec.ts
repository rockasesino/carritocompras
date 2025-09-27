import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', () => {
    const result = service.register({
      username: 'carolina',
      email: 'carolina@test.com',
      password: '1234'
    });
    expect(result.success).toBeTrue();
    expect(service.isLoggedIn()).toBeFalse(); // aún no logueado
  });

  it('should login an existing user', () => {
    service.register({
      username: 'carolina',
      email: 'carolina@test.com',
      password: '1234'
    });
    const login = service.login('carolina', '1234');
    expect(login.success).toBeTrue();
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should not login with wrong credentials', () => {
    const login = service.login('wrong', 'bad');
    expect(login.success).toBeFalse();
  });
});
