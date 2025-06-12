"use server"

import Replicate from "replicate"
import {v2 as cloudinary} from "cloudinary"
import {nanoid} from "nanoid"
import fetch from "node-fetch"

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY
})

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET

})

export async function generateImageAi(imagePrompt: string) {
    try {
        const input = {
            prompt: imagePrompt,
            output_format: "url",
            output_quality: 80,
            aspect_ration: '1:1'
        }


        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
            {input}
        );


        const imageUrl = output[0]
        const response = await fetch(imageUrl)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResponse: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                    folder: 'ai_video_images',
                    public_id: nanoid()
                }, (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            ).end(buffer)
        })

        const cloudinaryUrl = uploadResponse.secure_url
        console.log("cloudinary image =>", cloudinaryUrl)
        return cloudinaryUrl
    } catch (err: any) {
        console.log(err)
        throw new Error(err.message)
    }
}