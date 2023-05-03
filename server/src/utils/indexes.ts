export const computeIndex = (insertIndex: number, lastOrder: number) => {
  return Math.min(Math.max(0, insertIndex), lastOrder);
};
