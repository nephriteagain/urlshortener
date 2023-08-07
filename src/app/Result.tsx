"use client"

interface DocumentData {
    URL: string;
    shortURL : string;
    clicks: number;
    createdAt: string;
}

interface ResultProps {
    data: DocumentData|null
}

export default function Result({data}: ResultProps) {
    if (data) {
        return (
            <div>
                <p>{data.URL}</p>
                <p>{data.shortURL}</p>
                <p>{data.createdAt}</p>
                <p>{data.clicks}</p>
            </div>
        )
    }
    return (
        <div></div>
    )
}