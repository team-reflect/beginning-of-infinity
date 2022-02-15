import React from 'react'

export const Header: React.FC = () => (
  <div className="flex-none h-[60px] space-x-5 flex items-center border-b">
    <h1 className="text-xl font-medium px-8">
      <a href="/">The Beginning of Infinity</a>
    </h1>

    <h3 className="text-base font-normal px-8">
      <a href="/About">About these notes</a>
    </h3>
  </div>
)
