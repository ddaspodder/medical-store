import React from "react";
import ButtonComp from "../core/Button";

const Button = (props) => {
  const { size } = props;

  const style = (() => {
    switch (size) {
      case "large":
        return { padding: "10px 50px 10px 50px" };
      default:
        return {};
    }
  })();

  return (
    <div>
      <ButtonComp {...props} style={style} />
    </div>
  );
};

export default Button;
