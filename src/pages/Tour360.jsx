import React from "react";

const Tour360 = ({ data }) => {
  const preventIframeRedirect = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className="full-container developer-container">
      <iframe
        title="360 tour"
        src={data?.video}
        width={"100%"}
        height={"100%"}
        className="tour-iframe"
        onDoubleClick={preventIframeRedirect}
        allow="xr-spatial-tracking fullscreen"
      />
    </div>
  );
};

export default Tour360;
