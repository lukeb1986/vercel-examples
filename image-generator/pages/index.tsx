import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'
import Header from '../components/Header'
import ModelRunner from '../components/ModelRunner'

function Home() {

  const makeAskUrl = (userHandle: string, workspaceHandle: string, packageInstanceHandle: string) => {
    return `https://${userHandle}.steamship.run/${workspaceHandle}/${packageInstanceHandle}/ask`
  }

  const makeAddBookUrl = (userHandle: string, workspaceHandle: string, packageInstanceHandle: string) => {
    // TODO: How do manage a book upload from the auto-generated web interfafce.
    return `https://steamship.com/workspaces/${workspaceHandle}/packages/${packageInstanceHandle}/POST/addBook`
  }

  const askBook = async (question: string) => {
      // Default options are marked with *
      const response = await fetch(makeAskUrl(a, b, c), {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // WE DO NOT NEED AN API KEY! :) 
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          // The arguments to the method call
        }), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }


  return (
    <Page className="flex flex-col gap-12">
      <Header />

      <ModelRunner />

    </Page>
  )
}

Home.Layout = Layout

export default Home
