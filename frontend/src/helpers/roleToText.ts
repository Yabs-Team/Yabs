export default function roleToText(role: number): string {
  const roleList = [];
  const roleText = {
    1: 'Elev',
    2: 'Elevhälsoteam',
    4: 'Lärare',
    8: 'vaktmästare',
    16: 'Admin',
    32: 'Rektor'
  };

  while(role > 0) {
    let k = Math.floor(Math.log(role) / Math.log(2));
    let result = Math.pow(2, k);
    roleList.push(roleText[result]);
    role -= result;
  }
  
  return roleList.join(', '); 
}