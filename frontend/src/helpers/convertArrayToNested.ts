export default function convertList(payload: any, typeOfId: string) {
  return payload.reduce((acc: any, item: any) => {
    acc[item[typeOfId]] = item;
    return acc;
  }, {});
}
