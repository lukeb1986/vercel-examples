import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useCookies } from 'react-cookie'
import {COOKIE_NAMES} from "../pages/index"
import {Icons} from "../components/Icons"
import { useRouter } from 'next/router'

export default function ShareButton() {
  const [cookie] = useCookies(COOKIE_NAMES)
  const [showModal, setShowModal] = useState<boolean>(false)
  const {isReady} = useRouter();


  const getSharableUrl = () => {
    return `https://ask-my-course.vercel.app/?userHandle=${cookie["userHandle"]}&workspaceHandle=${cookie["workspaceHandle"]}&instanceHandle=${cookie["instanceHandle"]}`
  }


  return (
    <React.Fragment>
      {
    typeof document !== 'undefined'  && <React.Fragment>

    <Button onClick={() => setShowModal(true)} gradientDuoTone="purpleToBlue" className="mr-1">
    <div className="flex flex-row items-center">
            <Icons.share className="mr-2 h-5 w-5" /> Share
            </div>
      </Button>
      <Modal
    show={showModal}
    onClose={() => setShowModal(false)}
  >
    <Modal.Header>
      Share your chatbot 
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {getSharableUrl()}
        </p>
      </div>
    </Modal.Body>
  </Modal>

      </React.Fragment>
      }
      </React.Fragment>




    )
}

