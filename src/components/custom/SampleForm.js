import React, { useState } from "react";
import Form from "../core/Form";
import Text from "../core/TextField";

const SampleForm = () => {
  const onSubmit = (values) => {
    console.log("values", values);
  };

  const [textValue, setTextValue] = useState("");

  const onChangeText = (value) => {
    setTextValue(value);
  };

  return (
    <React.Fragment>
      <Form onSubmit={onSubmit}>
        <Text value={textValue} onChange={onChangeText} label={"Test"} />
      </Form>
    </React.Fragment>
  );
};

export default SampleForm;
