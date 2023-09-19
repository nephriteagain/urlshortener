"use client"
import { Dispatch, SetStateAction, useRef,  } from 'react'
import { MouseEvent } from 'react'

import { RxClipboardCopy } from 'react-icons/rx'
import { TbClipboardCheck } from 'react-icons/tb'
import type { FetchTypes } from "./page"

interface ResultProps {
    data : FetchTypes|null;
    canCopy: boolean;
    setCanCopy: Dispatch<SetStateAction<boolean>>
}



export default function Result({data, canCopy, setCanCopy}: ResultProps) {
    const copyRef = useRef<HTMLParagraphElement>(null)
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    async function copyLink(e: MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
    
        if (copyRef) {
            const text = copyRef.current?.innerText as string
            try {
                await navigator.clipboard.writeText(text)            
            } catch (error) {
                console.error(error)
            } finally {
                setCanCopy(false)
            }
        }
    }

    if (data) {
        return (
            <div className="w-[90%] max-w-[480px] mx-auto bg-slate-200 px-4 py-2 rounded-lg shadow-lg flex flex-col truncate">
                <p className="font-bold mx-auto mb-3">LINK: {data.data.URL}</p>
                <p className='mx-auto'>

                {
                    data.type === 'new' ?
                    "success! your new shortURL is now ready.":
                    `URL already has shortURL and was created at ${data.data.createdAt}`
                }
                </p>
                <p className="mx-auto text-lg font-semibold my-4">YOUR SHORTURL</p>
                <p className='mx-auto font-semibold text-xl mb-1' ref={copyRef}>
                    {origin}/s/{data.data.shortURL}
                    <span className='cursor-pointer'
                        onClick={(e) => copyLink(e)}
                    >
                        {canCopy ?
                        <RxClipboardCopy className="inline ms-2"/> :
                        <TbClipboardCheck className="inline ms-2" />
                        }
                    </span>
                </p>
                <p className='mx-auto'>total clicks: {data.data.clicks}</p>
            </div>
        )
    }
    return (
        <div></div>
    )
}