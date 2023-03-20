import { Label, TextInput, Button} from "flowbite-react";
import React, { useState } from "react";
import LoadingDots from "./LoadingDots";
import { useCookies } from 'react-cookie'


export default function AddLectureForm(workspaceHandle) {
  const [lecture, setLecture] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies(['ask-my-course-user'])

  console.log("cookie in lectureform", cookie['ask-my-course-user'])

  const addLecture = async (youtube_url) => {
    const response = await fetch('/api/add_lecture', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            youtube_url: youtube_url,
            workspaceHandle: workspaceHandle
          }),
  
      });

      if (!response.ok){
        console.log("Error when adding Lecture")
      }
  
      setLoading(false)
  };

  return (
    <div>
<div className="mt-6 flex flex-col gap-4 clear-both mb-10">
    <div className="mt-6 flex clear-both w-full">
      
    <input
      id="lecture"
      type="text"
      placeholder="https://www.youtube.com/watch?v=iLS_YP1uEK8"
      required={true}
      value={lecture}
      className="min-w-0 flex-auto appearance-none rounded-md bg-white placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          addLecture(lecture)
          setLecture('')
        }
      }}
      onChange={(e) => {
        setLecture(e.target.value)
      }}
    />
  {!loading && (<div><Button 
  gradientDuoTone="greenToBlue"
  className="ml-2 flex-none"
  type="submit" 
  onClick={(e) => {
      addLecture(lecture)
      setLecture('')
    }}>
    Add Lecture
  </Button></div>) }

  {loading && (
                  <Button
                  gradientDuoTone="greenToBlue"
                  className="ml-2 h-20"
                  disabled
                  >
                    <LoadingDots color="white" style="large" />
                  </Button>
                )}

  </div>
</div>
</div>


    )
}

