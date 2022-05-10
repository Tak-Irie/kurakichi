type ObjectInArray = {
  id: string;
}[];

export const getIdFromObjectInArray = (array: ObjectInArray): string[] => {
  const ids = array.map((object) => object.id);
  return ids;
};
