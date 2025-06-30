import { NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

// Check for GROQ_API_KEY but don't throw during build time
const groqApiKey = process.env.GROQ_API_KEY

const client = groqApiKey ? new Groq({
  apiKey: groqApiKey,
}) : null

export async function POST(req: NextRequest) {
  try {
    if (!groqApiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY environment variable is not configured" },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      )
    }

    const transcription = await client!.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      language: "en",
      response_format: "json",
      temperature: 0.0,
    })

    return NextResponse.json({ text: transcription.text })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    )
  }
}
