import { NextResponse } from "next/server";

import { db } from "@/firebase/db";
import { collection, getDoc, doc, addDoc, query, where, getDocs, updateDoc, increment } from "firebase/firestore";
import { isValidUrl, generateRandomString } from "@/helper";

interface RequestData {
    data: string
}

export interface DocumentData {
    URL: string;
    shortURL : string;
    clicks: number;
    createdAt: string;
}

const collectionRef = collection(db, 'url')

export async function POST(request: Request) {     
    const json = await request.json() as RequestData
    const data = json.data
    
    if (!isValidUrl(data)) {
        return new Response('invalid url', {
            status: 400,            
        })
    }
      
    const q = query(collectionRef, where('URL', '==', data))
    const querySnapshot = await getDocs(q);
    // new url
    if (querySnapshot.empty) {
        console.log('new url')
        const shortURL = generateRandomString()
        const newDoc = await addDoc(collectionRef, {
            URL: data,
            shortURL,
            clicks: 0,
            createdAt: new Date(Date.now()).toDateString()
        })
        const docRef = doc(db, 'url', newDoc.id)
        const res = (await getDoc(docRef)).data() as DocumentData
        return NextResponse.json({data: res, type: 'new'})
    }
    // already exist
    let newDoc;
    querySnapshot.forEach(async (docu) => {
        if (docu.exists()) {
            console.log('already exist')
            newDoc = docu.data()
            const id = docu.id;
            const docRef = doc(db, 'url', id)
            await updateDoc(docRef, {
                clicks: increment(1)
            })
        }
    })
    if (newDoc) {        
        return NextResponse.json({data: newDoc, type: 'old'})
    }
    return NextResponse.json({message: 'error'})    
}



  export async function GET() {
    return NextResponse.json({message: 'Hello'})        
}