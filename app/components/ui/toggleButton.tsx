import React from 'react';

type Props = {
  isOn: boolean;
  clickHandler: () => void;
};

const ToggleButton: React.FC<Props> = props => {
  const { isOn, clickHandler } = props;

  const style = isOn
    ? 'bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-on'
    : 'bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-off';
  return (
    <div className={style} style={{ width: '72px' }} onClick={clickHandler}>
      <div
        className="bootstrap-switch-container"
        style={{ width: '122px', marginLeft: '0px' }}
      >
        <span
          className="bootstrap-switch-handle-on bootstrap-switch-primary"
          style={{ width: '50px' }}
        >
          ON
        </span>
        <span
          className="bootstrap-switch-label"
          style={{ width: '26px', background: isOn ? '#f96332' : '#fff' }}
        >
          &nbsp;
        </span>
        <span
          className="bootstrap-switch-handle-off bootstrap-switch-default"
          style={{ width: '50px', fontSize: '9px' }}
        >
          OFF
        </span>
        <input
          type="checkbox"
          name="checkbox"
          className="bootstrap-switch"
          data-on-label="ON"
          data-off-label="OFF"
        />
      </div>
    </div>
  );
};

export default ToggleButton;
