import React, { useState } from "react";
  
const ReadMore = (props) => {
  const text = props.children;
  const length = props.length;
  const style = props.style;
  // const [txt, setTxt] = useState()
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className={`fw-500 text-grey-500 ${style} w-100 mb-2`} style={{wordBreak: "break-word"}}>
      {isReadMore ? text.slice(0, length) : text}
      {text.length > length && <span onClick={toggleReadMore} className="fw-600 text-primary ms-2 read-more-less">
        {isReadMore ? " Read more" : " Show less"}
      </span>}
    </p>
  );
};
  
export default ReadMore