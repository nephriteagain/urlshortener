import { NextResponse } from "next/server";
import { URL } from "url";

import { db } from "@/firebase/db";
import { query, where, collection, getDocs, updateDoc, doc, increment } from "firebase/firestore";

const collectionRef = collection(db, 'url')
export async function GET(req: Request) {    
    const url = req.url
    const urlObj = new URL(url)
    const path = urlObj.pathname
    const origin = urlObj.origin
    const shortURL = path.replace('/s/', '').trim()
    
    console.log(shortURL)    

    try {
        const q = query(collectionRef, where('shortURL', '==', shortURL))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
            console.log('empty')
            return NextResponse.redirect(`${origin}/`)
        }
        let result;
        let docRef;
        querySnapshot.forEach(async (document) => {
            result = document.data().URL
            docRef = doc(db,'url',document.id)
            await updateDoc(docRef, {
                clicks: increment(1)
            })
        })
        return NextResponse.redirect(result || origin)
        
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(`${origin}/`)
    }

}