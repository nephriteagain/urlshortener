import { NextResponse } from "next/server";

import { db } from "@/firebase/db";
import { collection, getDoc, doc, addDoc, query, where, getDocs } from "firebase/firestore";
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
        return NextResponse.json(res)
    }
    // already exist
    let newDoc;
    querySnapshot.forEach((doc) => {
        if (doc.exists()) {
            console.log('already exist')
            newDoc = doc.data()
        }
    })
    if (newDoc) {
        return NextResponse.json(newDoc)
    }
    return NextResponse.json({message: 'error'})    
}



  export async function GET() {
    return NextResponse.json({message: 'Hello'})        
}