import React, {useEffect, useState} from "react";
import ReactDOM from"react-dom";

import classes from "./index.css";

type Props = {
  fadeStyle: string;
  onDismiss: () => void;
  show: boolean;
  renderTitle: () => void;
  renderBody: () => React.FC;
  renderFooter: () => React.FC;
}

const JSX_MODAL: React.FC<Props> = props => {
  const [getFade, setFade] = useState(props.fadeStyle);
  const [shouldRender, setRender] = useState(props.show);

  useEffect(() => {
    setFade(props.fadeStyle);
    setRender(props.show)
  }, [props.fadeStyle, props.show]);

  const onDismissClick = () => {
    props.onDismiss();
  };
  return (
    <div className={`modal show ${classes.fadeOut} ${classes.backgroundFade}`}
         style={{display: "block", paddingRight: "15px", backgroundColor: "rgba(0, 0, 0, 0.5)", opacity: shouldRender? "1": "0"}}
         onClick={onDismissClick}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-content ${classes[getFade]}`}>
          <div className="modal-header">
            {props.renderTitle()}
            <button onClick={onDismissClick} className="close">
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {props.renderBody()}
          </div>
          <div className="modal-footer">
            {props.renderFooter()}
          </div>
        </div>
      </div>
    </div>
  )
};

const Modal  = (props: any) =>{
  return ReactDOM.createPortal(<JSX_MODAL {...props} />, document.querySelector("#modal"));
};

export default Modal;
