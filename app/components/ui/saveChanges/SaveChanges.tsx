import React, {useState} from 'react';

import classes from './index.css'

type Props = {
  onSave: () => void;
}

const SaveChanges: React.FC<Props> = ({onSave}) => {
  const [timeOut, setTime] = useState(0);
  let ref = React.createRef();
  const clickHandle = () => {
    const node: any = ref.current;
    node.style.opacity = 0;
    setTimeout(() => {
      node.style.display = 'none';
    }, 200);
    let timeout;

    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeout = setTimeout(() => {
      onSave();
      node.style.display = "none";
    }, 1500);
    setTime(timeout);
  };
  return (
    <div className={classes.fixedPosition}>
      <div className={classes.saveChanges} ref={ref} onClick={clickHandle}>
        <i style={{color: "#fff", fontSize: "2.2rem"}} className="fal fa-save"/>
        {/*<i className="fas fa-save"/>*/}
      </div>
    </div>
  );
};

export default SaveChanges;
