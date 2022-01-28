import React, { useState } from "react";
import Button from "../Button/Button";
import { Alert } from "@material-ui/lab";

const WhiteBoard = (props) => {
  const { setMessage } = props;
  const [loading, setLoading] = useState(false);
  const RedirectWhiteBoard = () => {
    setLoading(true);
    setMessage("Redirecting to Whiteboard Crypto...");
    window.location.replace("https://whiteboardcrypto.com/");
  };
  return (
    <Button onClick={RedirectWhiteBoard}>
      {loading ? "Redirecting..." : "Setup WhiteBoard Crypto Account"}
    </Button>
  );
};

export default WhiteBoard;
