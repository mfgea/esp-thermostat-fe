import React from "react";
import { Link, NavLink } from "react-router-dom";

export const MuiLink = React.forwardRef((props, ref) => (
  <NavLink {...props} activeClassName="Mui-selected" ref={ref} />
));

export const MuiExternalLink = React.forwardRef((props, ref) => (
  <Link {...props} ref={ref} target="_blank" />
));
