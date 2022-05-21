export const fixClassNameForTailwind = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};
