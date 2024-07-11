import React from "react";

const Footer = (props) => {
  // Define props as a parameter
  return (
    <footer className="text-muted">
      <div>
        <strong>{props.environment}</strong>
      </div>
    </footer>
  );
};

export default Footer;
