/**
 * @desc join tailwind className without templateLiteral
 */
export const tailwindJoin = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};
