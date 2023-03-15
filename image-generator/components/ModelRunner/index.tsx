import { useState } from "react";
import ModelInput from "./ModelInput"
import ModelOutput, { IModelOutput } from "./ModelOutput"

export default function ModelRunner() {
  let [output, setOutput] = useState<IModelOutput | undefined>({
    images: [
      {
        imageUrl: 'https://picsum.photos/200'
      },
      {
        imageUrl: 'https://picsum.photos/200'
      },
      {
        imageUrl: 'https://picsum.photos/200'
      }
    ]
  });
  let [error, setError] = useState(undefined);


  const runModelSync = () => {

  }  

  return (
    <div>
      <ModelInput></ModelInput>
      <ModelOutput output={output} error={error}></ModelOutput>
    </div>
  )
}