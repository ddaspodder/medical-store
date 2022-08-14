import React, { useState, useEffect } from "react";
import Form from "../core/Form";
import Text from "../core/TextField";
import Button from "../custom/Button";
import Select from "../core/Select";
import {
  InputWrapper,
  SectionOneByTwo,
  SectionOneByThree,
  SectionWrapper,
  PaddedWrapper,
} from "../core/StyledComponents";
import { updateProduct } from "../../apiEndpoint";
import { getUpdatedQtyOnSubUnitPerUnitChange } from "../../helper";

const EditProductForm = (props) => {
  const {
    handleClose,
    data,
    unitList,
    subUnitList,
    typeList,
    handleAlert,
    fetchData,
  } = props;
  const {
    id,
    product,
    type: typeData,
    rack: rackData,
    unit: unitData,
    subUnit: subUnitData,
    subUnitPerUnit: subUnitPerUnitData,
    manufacturer: manufacturerData,
    supplier: supplierData,
    stock,
    store,
    shop,
  } = data;
  const [pName, setPName] = useState(product || "");
  const [type, setType] = useState(typeData || "");
  const [rack, setRack] = useState(rackData || "");
  const [unit, setUnit] = useState(unitData || "");
  const [subUnit, setSubUnit] = useState(subUnitData || "");
  const [subUnitPerUnit, setSubUnitPerUnit] = useState(subUnitPerUnitData);
  const [manufacturer, setManufacturer] = useState(manufacturerData || "");
  const [supplier, setSupplier] = useState(supplierData || "");
  const [disabled, setDisable] = useState(false);

  const onChangePName = (value) => {
    setPName(value);
  };

  const onChangeType = (value) => {
    setType(value);
  };

  const onChangeRack = (value) => {
    setRack(value);
  };

  const onChangeUnit = (value) => {
    setUnit(value);
  };

  const onChangeSubUnit = (value) => {
    setSubUnit(value);
  };

  const onChangeSubUnitPerUnit = (value) => {
    setSubUnitPerUnit(value);
  };

  const onChangeManufacturer = (value) => {
    setManufacturer(value);
  };

  const onChangeSupplier = (value) => {
    setSupplier(value);
  };

  const onSubmitForm = () => {
    const [newUnitQtyStore, newSubUnitQtyStore] =
      getUpdatedQtyOnSubUnitPerUnitChange(
        subUnitPerUnitData,
        subUnitPerUnit,
        subUnitData,
        store
      );

    const [newUnitQtyStock, newSubUnitQtyStock] =
      getUpdatedQtyOnSubUnitPerUnitChange(
        subUnitPerUnitData,
        subUnitPerUnit,
        subUnitData,
        stock
      );
    const [newUnitQtyShop, newSubUnitQtyShop] =
      getUpdatedQtyOnSubUnitPerUnitChange(
        subUnitPerUnitData,
        subUnitPerUnit,
        subUnitData,
        shop
      );

    const payload = {
      ...data,
      product: pName,
      type: type,
      unit: unit,
      subUnit: subUnit,
      subUnitPerUnit: subUnitPerUnit,
      rack: rack,
      manufacturer: manufacturer,
      supplier: supplier,
      store: `${newUnitQtyStore}|${newSubUnitQtyStore}`,
      stock: `${newUnitQtyStock}|${newSubUnitQtyStock}`,
      shop: `${newUnitQtyShop}|${newSubUnitQtyShop}`,
    };

    (async () => {
      try {
        setDisable(true);
        let res = await updateProduct(payload, id);
        console.log("res", res);
        handleAlert("The product was updated successfully!", "success", true);
        fetchData();
        handleClose();
        setDisable(false);
      } catch (e) {
        handleAlert(
          "There was a problem in updating the product!",
          "error",
          true
        );
        console.log(e);
        setDisable(false);
      }
    })();
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <PaddedWrapper padding={"0px 20px 0px 20px"}>
        <h3>Edit Product</h3>
      </PaddedWrapper>
      <SectionWrapper>
        <SectionOneByThree>
          <InputWrapper>
            <Text
              label={"Product Name"}
              value={pName}
              onChange={onChangePName}
            />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Select
              label={"Type"}
              value={type}
              onChange={onChangeType}
              list={typeList}
            />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Text label={"Rack Number"} value={rack} onChange={onChangeRack} />
          </InputWrapper>
        </SectionOneByThree>
      </SectionWrapper>
      <SectionWrapper>
        <SectionOneByThree>
          <InputWrapper>
            <Select
              label={"Unit"}
              value={unit}
              onChange={onChangeUnit}
              list={unitList}
            />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Select
              label={"Sub Unit"}
              value={subUnit}
              onChange={onChangeSubUnit}
              list={subUnitList}
            />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Text
              type="number"
              label={"Sub Unit Per Unit"}
              value={subUnitPerUnit}
              onChange={onChangeSubUnitPerUnit}
              disabled={subUnit ? false : true}
              onBlur={() =>
                (!subUnitPerUnit || subUnitPerUnit < 1) && setSubUnitPerUnit(1)
              }
            />
          </InputWrapper>
        </SectionOneByThree>
      </SectionWrapper>
      <SectionWrapper>
        <SectionOneByTwo>
          <InputWrapper>
            <Text
              label={"Manufacturer"}
              value={manufacturer}
              onChange={onChangeManufacturer}
            />
          </InputWrapper>
        </SectionOneByTwo>
        <SectionOneByTwo>
          <InputWrapper>
            <Text
              label={"Supplier"}
              value={supplier}
              onChange={onChangeSupplier}
            />
          </InputWrapper>
        </SectionOneByTwo>
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

export default EditProductForm;
