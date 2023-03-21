import Link from '@vercel/examples-ui/link'
import { Icons } from "../components/Icons"
import {Navbar, Button} from "flowbite-react"
const REPO_URL = 'https://github.com/steamship-core/vercel-examples/tree/main'
import ShareButton from "../components/ShareButton"
import { useCookies } from 'react-cookie'

export interface NavProps {
  path: string
}

export default function Nav({ path }: NavProps) {



  return (
    <div className="border-b border-b-slate-200 dark:border-b-slate-700 ">
      <Navbar
  fluid={true}
  rounded={true}
  className="sticky top-z-40 mx-auto max-w-7xl   bg-white dark:bg-slate-900"
>
  <Navbar.Brand href="/home">
    <Icons.logo className="mr-3 h-6 sm:h-9" />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white mr-1">
      CourseGPT
    </span>
    by Steamship
  </Navbar.Brand>
  <div className="flex md:order-2">



    <ShareButton/>

    <Button gradientDuoTone="purpleToBlue" className="mr-1" disabled={true}>
  <div className="flex flex-row items-center">
          <Icons.claim className="mr-2 h-5 w-5" /> Claim your chatbot
          </div>
    </Button>

    <Button gradientDuoTone="purpleToBlue" outline={true} href="https://www.steamship.com/packages?tab=Running+Instances">
  <div className="flex flex-row items-center">
          Your chatbots
          </div>
    </Button>

    <Navbar.Toggle />
  </div>
    
  <Navbar.Collapse>
    <Navbar.Link
      href="/navbars"
      active={true}
    >
      Create another chatbot
    </Navbar.Link>

  </Navbar.Collapse>
</Navbar>
    </div>
  )
}