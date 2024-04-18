// @ts-nocheck
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useEffect } from 'react';

export const Myimage = ({
  src,
  placeholderSrc,
  width = "100%",
  ...props
}) => {

  const [imageSrc, setImageSrc] = useState(placeholderSrc);

  const cn = `progressive ${imageSrc === placeholderSrc ? "loading" : "loaded"}`

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        setImageSrc(src)
    }
  }, [src])
  

  return (
    <img
    className={cn}
    src={imageSrc}
    alt={props.alt || ''}
    width={width}
    />
  )
}
