import React from 'react';

// @ts-ignore
import classes from './index.css';

type Props = {
  width: string;
  height: string
}

export default (props: Props) => {
  return (
    <svg style={{height: props.height, width: props.width}} className={classes.spinner} viewBox="0 0 50 50">
      <circle className={classes.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
    </svg>
  )
};
