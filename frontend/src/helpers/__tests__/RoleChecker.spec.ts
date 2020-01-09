import UsersModule from '@/store/modules/UsersModule';
import RoleChecker from '../RoleChecker';

describe('RoleChecker.ts', () => {
  const baseUser = {
    role: 1, 
    uid: 1111, 
    created_at: '', //eslint-disable-line camelcase
    email: '', 
    google_token: '', //eslint-disable-line camelcase
    klass: '', 
    name: '', 
    photo_path: '', //eslint-disable-line camelcase
    updated_at: '' //eslint-disable-line camelcase
  }; 

  it('translates current user roles correctly', () => {
    UsersModule.setUser(baseUser);
    UsersModule.setCurrentUser(baseUser.uid);
    expect(RoleChecker.roleAsText()).toBe('Elev');

    baseUser.role = 32;
    UsersModule.setUser(baseUser);
    expect(RoleChecker.roleAsText()).toBe('Rektor');

    baseUser.role = 36;
    UsersModule.setUser(baseUser);
    expect(RoleChecker.roleAsText()).toBe('Rektor');

    baseUser.role = 4;
    UsersModule.setUser(baseUser);
    expect(RoleChecker.roleAsText()).toBe('Lärare');

    baseUser.role = 2;
    UsersModule.setUser(baseUser);
    expect(RoleChecker.roleAsText()).toBe('Elevhälsoteam');
  });

  it('translates input users correctly', () => {
    baseUser.role = 8;
    expect(RoleChecker.roleAsText(baseUser)).toBe('Vaktmästare');
    
    baseUser.role = 1;
    expect(RoleChecker.roleAsText(baseUser)).toBe('Elev');

    baseUser.role = 36;
    expect(RoleChecker.roleAsText(baseUser)).toBe('Rektor');
  });
});
