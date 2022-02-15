import React from 'react'

export const Layout: React.FC = ({children}) => (
  <div className="absolute inset-0 overflow-hidden flex flex-col">{children}</div>
)
