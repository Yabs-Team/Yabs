export default function roleToText(role: number): string {
  const roleText: {[key: number]: string} = {
    1: 'Elev',
    2: 'Elevhälsoteam',
    4: 'Lärare',
    8: 'Vaktmästare',
    16: 'Admin',
    32: 'Rektor'
  };

  const rolesKeys: number[] = Object.keys(roleText).map(Number);
  const roles: string[] = rolesKeys.filter(
    (bitwise) => role & bitwise).map(
    (bitwise) => roleText[bitwise]);

  return roles.join(', '); 
}