import { Layout, Text, Page } from '@vercel/examples-ui'
import { useRouter } from 'next/router'
import Lectures from "../components/Lectures";
import AddLectureForm from "../components/AddLectureForm";
import {Chat} from "../components/Chat"
import React, { useEffect, useState } from "react";
import { Button } from '../components/Button'
import { HiOutlinePlus } from 'react-icons/hi';
import { useCookies } from 'react-cookie'

const COOKIE_NAME = 'ask-my-course-user'


function Home() {
  const [baseUrl, setBaseUrl] = useState<string|undefined>(undefined)
  const [workspaceHandle, setWorkspaceHandle] = useState<string|undefined>(undefined)
  const [instanceHandle, setInstanceHandle] = useState<string|undefined>(undefined)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])

  const {query, isReady} = useRouter()
  const router = useRouter();


  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      setCookie(COOKIE_NAME, Math.random().toString(36).substring(7))

    }
  }, [cookie, setCookie])


  const getPublicBaseUrl = async () => {
    const response = await fetch('/api/get_public_base', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspaceHandle: cookie[COOKIE_NAME]
        }),
      });

      if (!response.ok){
        console.log("Error when adding Lecture")
      }
      const {invocationURL, instanceHandle} = await response.json()
      console.log("invocationUrl", invocationURL, instanceHandle)
      setBaseUrl(invocationURL.substring(0, invocationURL.length - 1))
      setWorkspaceHandle(workspaceHandle)
      setInstanceHandle(instanceHandle)
  };


  const makeBaseUrl = (userHandle?: string, instanceHandle?: string, workspaceHandle?: string, isStaging?: boolean) => {
    console.log("makeBaseUrl", userHandle, workspaceHandle, instanceHandle, userHandle && instanceHandle)
    if (userHandle && instanceHandle){
      if (isStaging){
        return `https://${userHandle}.apps.staging.steamship.com/${workspaceHandle}/${instanceHandle}`
    } else {
      return `https://${userHandle}.steamship.run/${workspaceHandle}/${instanceHandle}`
    }
  }
    return null
  }

  const goToSharableInstance = () => {
    console.log("goToSharableInstance")
    router.query.userHandle = "enias"
    router.query.instanceHandle = instanceHandle
    router.query.workspaceHandle = cookie[COOKIE_NAME]
    router.push(router)
  }

  if (isReady && baseUrl === undefined){
    let {userHandle, instanceHandle, workspaceHandle, isStaging} = query
    let baseUrl = makeBaseUrl(userHandle as string, instanceHandle as string, workspaceHandle as string, isStaging === 'true') || process.env.NEXT_PUBLIC_BASE_URL as string;
    console.log("baseUrl", baseUrl)
    if (baseUrl === undefined){
      getPublicBaseUrl()
    } else {
      setBaseUrl(baseUrl)
    }
  

  }
  const errorMessage = (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p>Front-end not connected.</p>
                <br/>
                <p>If this issue persists, please ping us on <a href="https://steamship.com/discord" className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500">Discord</a>. We&apos;re happy to help. </p>
              </div>
            </div>
          </div>
          )

  return (
    <Page className=" max-w-7xl  flex flex-col gap-12 ">
      <div className="grid grid-cols-2 gap-4">
        <div> 
        <AddLectureForm/>
        
        <section className="flex flex-col gap-6 " >
        { baseUrl && <Lectures baseUrl={baseUrl as string}/>}
      </section>

        </div>
        <div>
              
        <Text className="mb-5" variant="h1">Your chatbot: 💬</Text>

      <section className="flex flex-col gap-3">
        <div className="lg">
            { typeof baseUrl == "undefined" && errorMessage}
             <Chat baseUrl={baseUrl as string}/>

             <span className="mt-5 justify-center content-center	mx-auto flex flex-grow clear-both">
        <Button onClick={goToSharableInstance} outline={true} gradientDuoTone="greenToBlue">
  <div className="flex flex-row items-center">
          <HiOutlinePlus className="mr-2 h-5 w-5" /> Share with friends
          </div>
    </Button>
    <Button  outline={true} disabled={true} gradientDuoTone="greenToBlue" className="ml-2">
  <div className="flex flex-row items-center">
          <HiOutlinePlus className="mr-2 h-5 w-5" /> Claim your own
          </div>
    </Button>
        </span>
        </div>
      </section>
      </div>
      </div>
    </Page>
  )
}

Home.Layout = Layout

export default Home
