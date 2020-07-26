import React from "react";

export function FakeLink(props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  return <a href={props.href || '#'} {...props} onClick={(e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(e);
    }
  }}/>
}