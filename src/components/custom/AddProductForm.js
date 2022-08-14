import React, { useEffect, useState } from "react";
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
import { addProduct } from "../../apiEndpoint";

const AddProductForm = (props) => {
  const {
    handleClose,
    unitList,
    typeList,
    subUnitList,
    handleAlert,
    fetchData,
  } = props;
  const [pName, setPName] = useState("");
  const [type, setType] = useState("");
  const [rack, setRack] = useState("");
  const [unit, setUnit] = useState(unitList[0].id);
  const [subUnit, setSubUnit] = useState("");
  const [subUnitPerUnit, setSubUnitPerUnit] = useState(1);
  const [limit, setLimit] = useState(1);
  const [manufacturer, setManufacturer] = useState("");
  const [supplier, setSupplier] = useState("");
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

  const onChangeLimit = (value) => {
    setLimit(value);
  };

  const onChangeManufacturer = (value) => {
    setManufacturer(value);
  };

  const onChangeSupplier = (value) => {
    setSupplier(value);
  };

  const onSubmitForm = () => {
    const payload = {
      type: type,
      product: pName,
      stock: "0|0",
      store: "0|0",
      shop: "0|0",
      unit: unit,
      subUnit: subUnit,
      subUnitPerUnit: subUnitPerUnit,
      rack: rack,
      limit: limit,
      manufacturer: manufacturer,
      supplier: supplier,
    };

    (async () => {
      try {
        setDisable(true);
        let res = await addProduct(payload);
        console.log("res", res);
        handleAlert("Product added successfully!", "success", true);
        fetchData();
        handleClose();
        setDisable(false);
      } catch (e) {
        console.log(e);
        handleAlert("There was some problem in adding product!", "error", true);
        setDisable(false);
      }
    })();
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <PaddedWrapper padding={"0px 20px 0px 20px"}>
        <h3>Add Product</h3>
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
        <SectionOneByThree>
          <InputWrapper>
            <Text label={"Limit"} value={limit} onChange={onChangeLimit} />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Text
              label={"Manufacturer"}
              value={manufacturer}
              onChange={onChangeManufacturer}
            />
          </InputWrapper>
        </SectionOneByThree>
        <SectionOneByThree>
          <InputWrapper>
            <Text
              label={"Supplier"}
              value={supplier}
              onChange={onChangeSupplier}
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

export default AddProductForm;
