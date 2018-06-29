import React from "react";
const required = (value) => {
  console.log("value is b4 if::"+value);
  if (value.toString().trim().length==0) {
    // We can return string or jsx as the 'error' prop for the validated Component
    console.log("value is inside if::"+value);
    return 'require';
  }
};

export default required;
 