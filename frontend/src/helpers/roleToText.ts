export default function roleToText(role: number): string {
  const roleText = {
    1: 'Elev',
    2: 'Elevhälsoteam',
    4: 'Lärare',
    16: 'Admin',
    32: 'Rektor'
  };
  let text = roleText[role];
  if(!text) {
    text = 'Role: ' + role;
  }
  return text;
}