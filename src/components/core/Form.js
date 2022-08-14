import React from "react";

const Form = ({ onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  // useEffect(() => {
  //   document.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") onSubmit();
  //   });
  //   return () =>
  //     document.removeEventListener("keypress", (e) => {
  //       if (e.key === "Enter") onSubmit();
  //     });
  // }, [onSubmit]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>{children}</form>
    </React.Fragment>
  );
};

export default Form;
