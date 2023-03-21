import { Layout, Text, Page } from '@vercel/examples-ui'
import { useRouter } from 'next/router'
import Lectures from "../components/Lectures";
import AddLectureForm from "../components/AddLectureForm";
import {Chat} from "../components/Chat"
import React, { useEffect, useState } from "react";
import { Button } from '../components/Button'
import { HiOutlinePlus } from 'react-icons/hi';
import { useCookies } from 'react-cookie'

export const COOKIE_NAMES = ["userHandle", "workspaceHandle", "instanceHandle", "ownerEmail"]

export type PackageCoordinates = {
  userHandle?: string
  workspaceHandle?: string
  instanceHandle?: string
}


function Home() {
  const [baseUrl, setBaseUrl] = useState<string|undefined>(undefined)
  const [ownerEmail, setOwnerEmail] = useState<string|undefined>(undefined)
  const [packageCoordinates, setPackageCoordinates] = useState<PackageCoordinates|undefined>(undefined)
  const [cookie, setCookie] = useCookies(COOKIE_NAMES)
  const {query, isReady} = useRouter()


  useEffect(() => {
    console.log("useEffect", cookie["ownerEmail"])
    const workspaceHandle = Math.random().toString(36).substring(7) 
    if (!cookie["workspaceHandle"]) {
      setCookie("workspaceHandle", workspaceHandle)
    }
    if (cookie["ownerEmail"]) {
      setOwnerEmail(cookie["ownerEmail"])
    }
  }, [cookie, setCookie])

  const setPackageCoordinatesInCookie = ({ userHandle, workspaceHandle, instanceHandle}: PackageCoordinates) => {
    console.log("setPackageCoordinatesInCookie", userHandle)
    setCookie("userHandle", userHandle)
    setCookie("workspaceHandle", workspaceHandle)
    setCookie("instanceHandle", instanceHandle)
  }

  const getPublicBaseUrl = async () => {
    const response = await fetch('/api/get_public_base', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspaceHandle: cookie["workspaceHandle"]
        }),
      });

      if (!response.ok){
        console.log("Error when adding Lecture")
      }
      const {invocationURL, instanceHandle} = await response.json()
      console.log("invocationUrl", invocationURL, instanceHandle)
      setBaseUrl(invocationURL.substring(0, invocationURL.length - 1))
      const packageCoordinates = {
        userHandle: 'enias',
        workspaceHandle: cookie["workspaceHandle"],
        instanceHandle: instanceHandle
      }
      setPackageCoordinates(packageCoordinates)
      setPackageCoordinatesInCookie(packageCoordinates)
  };


  const makeBaseUrl = (userHandle?: string, instanceHandle?: string, workspaceHandle?: string, isStaging?: boolean) => {
    if (userHandle && instanceHandle){
      if (isStaging){
        return `https://${userHandle}.apps.staging.steamship.com/${workspaceHandle}/${instanceHandle}`
    } else {
      return `https://${userHandle}.steamship.run/${workspaceHandle}/${instanceHandle}`
    }
  }
    return null
  }

  let {userHandle} = query


  if (isReady && baseUrl === undefined){
    let {userHandle, instanceHandle, workspaceHandle, isStaging} = query
    console.log("userHandle", userHandle)
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

      {<div>Instance owned by {ownerEmail}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div className='grid gap-10'> 
        {!userHandle && 
        <div>
          <Text className="mb-5" variant="h2">⚙️ Add Lectures</Text>
          <AddLectureForm ownerEmail={ownerEmail} workspaceHandle={packageCoordinates?.workspaceHandle}/>
        </div>}
        
        <div>
        <section className="flex flex-col gap-6 " >
        <Text className="mb-5" variant="h2">📚 Lectures </Text>

        { baseUrl && <Lectures baseUrl={baseUrl as string}/>}
      </section>

        </div>

        </div>
        <div>
              
        <Text className="mb-5" variant="h2">💬 Your chatbot</Text>

      <section className="flex flex-col gap-3">
        <div className="lg">
            { typeof baseUrl == "undefined" && errorMessage}
             <Chat baseUrl={baseUrl as string}/>

   
        </div>
      </section>
      </div>
      </div>
    </Page>
  )
}

Home.Layout = Layout

export default Home
