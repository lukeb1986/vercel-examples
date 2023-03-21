import type { FC, ReactNode } from 'react'
import { NavProps } from './Nav'

import { ComponentType } from 'react'

export interface LayoutProps extends NavProps {
  children?: ReactNode
  title?: string
  description?: string
}

const EmptyLayout: FC<LayoutProps> = ({
  children,
}) => {

  return (
    <div className="h-screen flex flex-col">
      {children}
    </div>
  )
}

export default EmptyLayout


const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export interface LayoutProps extends NavProps {
    children?: ReactNode;
    title?: string;
    description?: string;
}

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop
}