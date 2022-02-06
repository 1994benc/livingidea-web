import React from 'react';

export default function Avatar({
    imageUrl,
    small,
}: {
    imageUrl: string;
    small?: boolean;
}) {
  return <div
    className={small ? "rounded-full w-8 h-8":"rounded-full w-12 h-12"}
    style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }}
  ></div>;
}
