import React, { useState } from "react";
import Form from "../core/Form";
import Button from "./Button";

import {
  InputWrapper,
  SectionWrapper,
  PaddedWrapper,
} from "../core/StyledComponents";
import { deleteProduct } from "../../apiEndpoint";

const DeleteProductForm = (props) => {
  const { handleClose, data, handleAlert, fetchData } = props;
  const { product, id } = data;
  const [disabled, setDisable] = useState(false);

  const onSubmitForm = () => {
    (async () => {
      try {
        setDisable(true);
        let res = await deleteProduct(id);
        console.log("res", res);
        handleAlert("The product was removed successfully!", "success", true);
        fetchData();
        handleClose();
        setDisable(false);
      } catch (e) {
        console.log(e);
        handleAlert(
          "There was a problem in removing the product!",
          "success",
          true
        );
        setDisable(false);
      }
    })();
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <PaddedWrapper padding={"0px 20px 0px 20px"}>
        <h3>Delete Product</h3>
      </PaddedWrapper>
      <SectionWrapper>
        <InputWrapper>
          <h4>Are you sure you want to delete the product "{product}" ?</h4>
        </InputWrapper>
      </SectionWrapper>
      <SectionWrapper align="right">
        <InputWrapper>
          <Button
            size={"large"}
            onClick={onSubmitForm}
            disabled={disabled}
            type="submit"
          >
            Yes
          </Button>
        </InputWrapper>
        <InputWrapper>
          <Button size={"large"} onClick={handleClose}>
            No
          </Button>
        </InputWrapper>
      </SectionWrapper>
    </Form>
  );
};

export default DeleteProductForm;
