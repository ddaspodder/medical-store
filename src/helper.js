export const getUpdatedQty = (
  qtyUnit,
  qtySubUnit,
  subUnitPerUnit,
  subUnit,
  s
) => {
  const qtyUnitN = Number(qtyUnit);
  const qtySubUnitN = Number(qtySubUnit);
  const subUnitPerUnitN = Number(subUnitPerUnit);
  if (!!s && !!subUnit) {
    const [currentShopUnitQty, currentShopSubUnitQty] = s.split("|");
    const currentShopUnitQtyN = Number(currentShopUnitQty);
    const currentShopSubUnitQtyN = Number(currentShopSubUnitQty);

    const newShopSubUnitQty =
      (currentShopSubUnitQtyN + qtySubUnitN + subUnitPerUnitN) %
      subUnitPerUnitN;

    const newShopUnitQty =
      currentShopUnitQtyN +
      qtyUnitN +
      Math.floor((currentShopSubUnitQtyN + qtySubUnitN) / subUnitPerUnit);

    return [newShopUnitQty, newShopSubUnitQty];
  } else if (!!s) {
    const [currentShopUnitQty] = s.split("|");
    const currentShopUnitQtyN = Number(currentShopUnitQty);
    const newShopUnitQty = currentShopUnitQtyN + qtyUnitN;
    return [newShopUnitQty, 0];
  }
  return [0, 0];
};

export const getUpdatedQtyOnSubUnitPerUnitChange = (
  currentSubUnitPerUnit,
  newSubUnitPerUnit,
  subUnit,
  s
) => {
  const currentSubUnitPerUnitN = Number(currentSubUnitPerUnit);
  const newSubUnitPerUnitN = Number(newSubUnitPerUnit);
  if (!!s) {
    const [currentShopUnitQty, currentShopSubUnitQty] = s.split("|");
    const currentShopUnitQtyN = Number(currentShopUnitQty);
    const currentShopSubUnitQtyN = Number(currentShopSubUnitQty);
    const totalQty =
      currentShopUnitQtyN * currentSubUnitPerUnitN + currentShopSubUnitQtyN;
    if (!!subUnit) {
      const newSubUnitQty = totalQty % newSubUnitPerUnitN;
      const newUnitQty = Math.floor(totalQty / newSubUnitPerUnitN);
      return [newUnitQty, newSubUnitQty];
    }
    return [currentShopUnitQtyN, 0];
  }
  return [0, 0];
};
