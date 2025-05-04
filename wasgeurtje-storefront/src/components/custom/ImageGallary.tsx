"use client"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const ImageGallary: React.FC<any> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  useEffect(() => {
    if (images?.length > 0) {
      setSelectedImage(images[0])
    }
  }, [images])
  const handleSelectImage = (image: any) => {
    setSelectedImage(image)
  }
  return (
    <div className="flex flex-col gap-3 max-w-[350px] lg:max-w-[580px] w-full mx-auto">
      <div className="flex items-center justify-center border border-yellow-400 rounded-lg max-w-[450px] max-h-[450px] w-full h-full">
        {selectedImage?.url && (
          <Image
            src={selectedImage?.url}
            alt="product"
            width={450}
            height={450}
            className="rounded-lg cursor-pointer group-hover:scale-110 transition-all duration-300"
          />
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        {images?.length > 0 &&
          images?.map((image: any, index: number) => (
            <div
              key={index}
              className="border border-yellow-400/90 rounded-lg p-1 drop-shadow-lg group"
              onClick={() => handleSelectImage(image)}
            >
              {image?.url && (
                <Image
                  src={image?.url}
                  alt="product"
                  width={50}
                  height={50}
                  className="rounded-lg cursor-pointer group-hover:scale-110 transition-all duration-300"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
export default ImageGallary
