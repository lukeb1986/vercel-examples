import type { FC, ReactNode } from 'react'
import Head from 'next/head.js'
import Nav, { NavProps } from './Nav'
import Link from '@vercel/examples-ui/link'

import { ComponentType } from 'react'
import { Icons } from "./Icons"

export interface LayoutProps extends NavProps {
  children?: ReactNode
  title?: string
  description?: string
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  path,
  children,
}) => {
  return (
    <div className="mx-auto h-screen flex flex-col">
      <Head>
        {title && <title>{`${title} - Steamship + Vercel Examples`}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav path={path} />

      <div className="px-8 bg-accents-0">{children}</div>

      <footer className="py-10 w-full mt-auto border-t flex items-center justify-center bg-accents-1 z-20">
        <span className="text-primary">Built with</span>
        <a
          href="https://steamship.com"
          aria-label="Steamship.com Link"
          target="_blank"
          rel="noreferrer"
          className="text-black "
        >
          <Icons.logo
            className="inline-block h-6 ml-2 text-primary"
          /> <span className='text-blue-800'>Steamship</span>
        </a>. Come say hi {"->"}
        <div className="flex md:order-2">
  <Link
              href="https://github.com/steamship-core/vercel-examples/tree/main/ask-my-book-chatbot"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="text-slate-700 dark:text-slate-400"
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href="https://twitter.com/GetSteamship"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="text-slate-700 dark:text-slate-400"
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href="https://steamship.com/discord"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="text-slate-700 dark:text-slate-400"
              >
                <Icons.discord className="h-5 w-5 fill-current" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
  </div>
      </footer>
    </div>
  )
}

export default Layout


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