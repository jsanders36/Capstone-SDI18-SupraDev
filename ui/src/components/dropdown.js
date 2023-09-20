import { cloneElement, useContext, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';

import { DropdownContext } from './dropdown-context';

export const Dropdown = (props) => {
  const { children, delay = 50 } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const cleanupRef = useRef(null);

  const handleTriggerEnter = useCallback((event) => {
    clearTimeout(cleanupRef.current);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleTriggerLeave = useCallback(
    (_) => {
      cleanupRef.current = setTimeout(() => {
        setAnchorEl(null);
      }, delay);
    },
    [delay]
  );

  const handleMenuEnter = useCallback((_) => {
    clearTimeout(cleanupRef.current);
  }, []);

  const handleMenuLeave = useCallback(
    (_) => {
      cleanupRef.current = setTimeout(() => {
        setAnchorEl(null);
      }, delay);
    },
    [delay]
  );

  const open = !!anchorEl;

  return (
    <DropdownContext.Provider
      value={{
        anchorEl,
        onMenuEnter: handleMenuEnter,
        onMenuLeave: handleMenuLeave,
        onTriggerEnter: handleTriggerEnter,
        onTriggerLeave: handleTriggerLeave,
        open,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

Dropdown.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  delay: PropTypes.number,
};

export const DropdownTrigger = (props) => {
  const { children } = props;
  const { onTriggerEnter, onTriggerLeave } = useContext(DropdownContext);

  return cloneElement(children, {
    onMouseEnter: (event) => {
      children.props.onMouseEnter?.(event);
      onTriggerEnter(event);
    },
    onMouseLeave: (event) => {
      children.props.onMouseLeave?.(event);
      onTriggerLeave(event);
    },
  });
};

DropdownTrigger.propTypes = {
  children: PropTypes.element.isRequired,
};

export const DropdownMenu = (props) => {
  const { anchorEl, children, PaperProps, ...other } = props;
  const ctx = useContext(DropdownContext);

  return (
    <Popover
      anchorEl={anchorEl || ctx.anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      open={ctx.open}
      PaperProps={{
        ...PaperProps,
        onMouseEnter: ctx.onMenuEnter,
        onMouseLeave: ctx.onMenuLeave,
        sx: {
          ...PaperProps?.sx,
          pointerEvents: 'auto',
        },
      }}
      sx={{ pointerEvents: 'none' }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
      {...other}
    >
      {children}
    </Popover>
  );
};

DropdownMenu.propTypes = {
  anchorEl: PropTypes.any,
  anchorOrigin: PropTypes.object,
  children: PropTypes.any,
  disableScrollLock: PropTypes.bool,
  PaperProps: PropTypes.object,
  transformOrigin: PropTypes.object,
};