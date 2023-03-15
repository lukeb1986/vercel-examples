export interface IModelOutputImage {
  imageUrl: string
}

export interface IModelOutput {
  images: IModelOutputImage[]
}

export interface ModelOutputProps {
  output?: IModelOutput
  error?: string
}

export default function ModelOutput(props: ModelOutputProps) {
  const {output, error} = props;

  let content = <div></div>
  if (error) {
    content = <div>Error: {error}</div>
  } else if (output) {
    content = (
      <div className="w-full mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {output.images.map((image) => (
          <div key={image.imageUrl} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={image.imageUrl}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full py-8 sm:py-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Output:</h2>
      {content}
    </div>      
  )
}

