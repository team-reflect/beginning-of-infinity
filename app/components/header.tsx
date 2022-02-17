import React from 'react'

export const Header: React.FC = () => (
  <div className="flex-none h-[60px] space-x-5 flex items-center justify-between border-b select-none md:px-8 px-5">
    <h1 className="md:text-xl text-sm font-medium">
      <a href="/">The Beginning of Infinity</a>
    </h1>

    <h3 className="md:text-base text-sm font-normal">
      <a href="/About">About these notes</a>
    </h3>
  </div>
)
