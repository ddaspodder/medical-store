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

const AddToStoreForm = (props) => {
  const { handleClose, data, unitList, subUnitList, handleAlert, fetchData } =
    props;
  const { id, product, store, stock, unit, subUnit, subUnitPerUnit } = data;

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
    const [newUnitQtyStore, newSubUnitQtyStore] = getUpdatedQty(
      qtyUnit,
      qtySubUnit,
      subUnitPerUnit,
      subUnit,
      store
    );

    const [newUnitQtyStock, newSubUnitQtyStock] = getUpdatedQty(
      qtyUnit,
      qtySubUnit,
      subUnitPerUnit,
      subUnit,
      stock
    );

    const payload = {
      ...data,
      store: `${newUnitQtyStore}|${newSubUnitQtyStore}`,
      stock: `${newUnitQtyStock}|${newSubUnitQtyStock}`,
    };

    (async () => {
      try {
        setDisable(true);
        let res = await updateProduct(payload, id);
        console.log("res", res);
        handleAlert("Added product to shop successfully!", "success", true);
        handleClose();
        fetchData();
        setDisable(false);
      } catch (e) {
        console.log(e);
        handleAlert(
          "There was some problem in adding product to shop!",
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
        <h3>Add Product To Store</h3>
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

export default AddToStoreForm;
