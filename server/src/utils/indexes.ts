export const computeIndex = (insertIndex: number, lastOrder: number) => {
  return Math.max(Math.max(0, insertIndex), lastOrder);
};
