"use client"
import {
    ChangeEvent,
    createContext, Dispatch, ReactNode, SetStateAction, useContext, useState,
} from "react"
import {createVideoAi} from "@/actions/geminiai";
import {generateImageAi} from "@/actions/replicateai";

const initialState = {
    script: "Script...",
    images: [] as string[],
    audio: "",
    captions: [] as object[],
    loading: false,
    selectedStory: "Inspirational Story",
    selectedStyle: "gta",
};

interface VideoContextType {
    script: string;
    setScript: Dispatch<SetStateAction<string>>;
    images: string[];
    setImages: Dispatch<SetStateAction<string[]>>;
    audio: string;
    setAudio: Dispatch<SetStateAction<string>>;
    captions: object[];
    setCaptions: Dispatch<SetStateAction<object[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    selectedStory: string;
    selectedStyle: string;
    customPrompt: string;
    handleStorySelect: (story: string) => void;
    handleStyleSelect: (style: string) => void;
    handleCustomPromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

interface VideoScriptItem {
    imagePrompt: string
    textContend: string
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export const VideoProvider = ({children}: {
    children: ReactNode
}) => {
    const [script, setScript] = useState(initialState.script);
    const [images, setImages] = useState(initialState.images);
    const [audio, setAudio] = useState(initialState.audio);
    const [captions, setCaptions] = useState(initialState.captions);
    const [loading, setLoading] = useState(initialState.loading);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [selectedStory, setSelectedStory] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const [customPrompt, setCustomPrompt] = useState("");

    const handleStorySelect = (story: string) => {
        setSelectedStory(story);
        if (story !== "Custom Prompt") {
            setCustomPrompt("");
        }
    };

    const handleStyleSelect = (style: string) => {
        setSelectedStyle(style);
    };

    const handleCustomPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCustomPrompt(e.target.value);
        setSelectedStory("Custom Prompt");
    };

    const handleSubmit = async () => {
        console.log('handleSubmit')
        try {
            setLoading(true)
            setLoadingMessage("Generating video script...")
            const videoResponse: any = await createVideoAi(
                `Create a 30 second log
                ${customPrompt || selectedStory}
                video script. Include AI imagePrompts for each scene in ${selectedStyle} format. Provide the result in JSON format with 'imagePrompt' and 'textContend' fields`
            )
            if (!videoResponse.success) {
                setLoading(false)
                setLoadingMessage("Failed to generate video script")
                return
            }
            if (videoResponse.data.length >= 1) {
                setLoadingMessage("Generating images from the script...")
                console.log('Generating images from the script..."')
                const imageGenerationPromises: Promise<string | null>[] = videoResponse.data.map(async (item: VideoScriptItem): Promise<string | null> => {
                    try {
                        const imageUrl: string = await generateImageAi(item.imagePrompt)
                        return imageUrl
                    } catch (err) {
                        console.error(err)
                        return null
                    }
                })

                const images: (string | null)[] = await Promise.all(imageGenerationPromises)
                const validImages:any = images.filter((image) => image !== null)
                setImages(validImages)
            }

        } catch (err) {
            console.log(err)
            setLoadingMessage("Failed to generate video script")
        } finally {
            setLoading(false)
            setLoadingMessage("")
        }
    }

    return <VideoContext.Provider value={{
        script,
        setScript,
        images,
        setImages,
        audio,
        setAudio,
        captions,
        setCaptions,
        loading,
        setLoading,
        selectedStory,
        selectedStyle,
        customPrompt,
        handleStyleSelect,
        handleStorySelect,
        handleCustomPromptChange,
        handleSubmit
    }}>{children}</VideoContext.Provider>
}

export const useVideo = () => {
    const context = useContext(VideoContext)
    if (context === undefined) {
        throw new Error("useVideo must be use within a VideoProvider")
    }
    return context
}