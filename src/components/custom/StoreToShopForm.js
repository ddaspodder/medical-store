import React, { useState, useMemo } from "react";
import Form from "../core/Form";
import Text from "../core/TextField";
import Button from "./Button";

import {
  InputWrapper,
  SectionOneByThree,
  SectionWrapper,
  PaddedWrapper,
} from "../core/StyledComponents";

import { updateProduct } from "../../apiEndpoint";
import { getUpdatedQty } from "../../helper";

const StoreToShopForm = (props) => {
  const { handleClose, data, unitList, subUnitList, handleAlert, fetchData } =
    props;
  const { id, product, shop, store, unit, subUnit, subUnitPerUnit } = data;

  const [qtyUnit, setQtyUnit] = useState("");
  const [qtySubUnit, setQtySubUnit] = useState("");
  const [disabled, setDisable] = useState(false);

  const onChangeQtyUnit = (value) => {
    setQtyUnit(value);
  };

  const onChangeQtySubUnit = (value) => {
    setQtySubUnit(value);
  };
  const onSubmitForm = () => {
    const [newUnitQtyShop, newSubUnitQtyShop] = getUpdatedQty(
      qtyUnit,
      qtySubUnit,
      subUnitPerUnit,
      subUnit,
      shop
    );

    const [newUnitQtyStore, newSubUnitQtyStore] = getUpdatedQty(
      -qtyUnit,
      -qtySubUnit,
      subUnitPerUnit,
      subUnit,
      store
    );

    const payload = {
      ...data,
      shop: `${newUnitQtyShop}|${newSubUnitQtyShop}`,
      store: `${newUnitQtyStore}|${newSubUnitQtyStore}`,
    };

    (async () => {
      try {
        if (newUnitQtyStore >= 0) {
          setDisable(true);
          const res = await updateProduct(payload, id);
          console.log("res", res);
          handleAlert(
            "Moved product from store to shop successfully!",
            "success",
            true
          );
          fetchData();
          handleClose();
          setDisable(false);
        } else {
          handleAlert("There is not enough product in store!", "error", true);
          setDisable(false);
        }
      } catch (e) {
        console.log(e);
        handleAlert(
          "There was a problem in moving product from store to shop!",
          "error",
          true
        );
        setDisable(false);
      }
    })();
  };

  const getUnitLabel = () => {
    const unitLabelList = unitList.filter((list) => list.id === unit);
    const unitLabel =
      unitLabelList.length > 0 ? unitLabelList[0].value : "Unit";
    return unitLabel;
  };

  const getSubUnitLabel = () => {
    const subUnitLabelList = subUnitList.filter((list) => list.id === subUnit);
    const subUnitLabel =
      subUnitLabelList.length > 0 ? subUnitLabelList[0].value : "Subunit";
    return subUnitLabel;
  };

  const unitLabel = useMemo(() => getUnitLabel(), [unit, unitList]);
  const subUnitLabel = useMemo(() => getSubUnitLabel(), [subUnit, subUnitList]);

  return (
    <Form onSubmit={onSubmitForm}>
      <PaddedWrapper padding={"0px 20px 0px 20px"}>
        <h3>Move Product From Store To Shop</h3>
      </PaddedWrapper>
      <SectionWrapper>
        <SectionOneByThree>
          <InputWrapper>
            <h4>{product}</h4>
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Text
              type="number"
              label={`No of ${unitLabel}`}
              value={qtyUnit}
              onChange={onChangeQtyUnit}
            />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Text
              type="number"
              label={`No of ${subUnitLabel}`}
              value={qtySubUnit}
              onChange={onChangeQtySubUnit}
              disabled={!subUnit}
            />
          </InputWrapper>
        </SectionOneByThree>
      </SectionWrapper>
      <SectionWrapper align="right">
        <InputWrapper>
          <Button
            size={"large"}
            onClick={onSubmitForm}
            disabled={disabled}
            type="submit"
          >
            Done
          </Button>
        </InputWrapper>
        <InputWrapper>
          <Button size={"large"} onClick={handleClose}>
            Cancel
          </Button>
        </InputWrapper>
      </SectionWrapper>
    </Form>
  );
};

export default StoreToShopForm;
