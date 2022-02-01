import React, {useState} from "react";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import "./FaqCard.css";

const FaqCard = (props) => {
    const { FaqTitle, FaqContent, FaqOpen } = props
    const [open, setOpen] = useState(FaqOpen);
  return (
    <div className={`grandpa__faq_card ${open? "grandpa__card_open": "grandpa__card_close"}`}>
      <div className="grandpa__faq_card_header" onClick={()=>setOpen(!open)}>
        <h4>{FaqTitle}</h4>
        {open?<RemoveIcon />: <AddIcon/>}
      </div>
      {open && 
      <div className="grandpa__faq_card_content">
        {FaqContent}
      </div>}
    </div>
  );
};

export default FaqCard;
