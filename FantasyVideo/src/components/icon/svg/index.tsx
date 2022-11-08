import React, { FC, PropsWithChildren, ComponentProps } from 'react'

// interface SvgIconProps {
//     path: string
// }

type SvgIconProps = FC<PropsWithChildren<ComponentProps<"svg">>>;

const SvgIcon: SvgIconProps = (props) => <svg {...props}>{props.children}</svg>

SvgIcon.defaultProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024",
    "aria-hidden": "true",
    fill: "currentColor",
    width: 18,
    height: 18,
}