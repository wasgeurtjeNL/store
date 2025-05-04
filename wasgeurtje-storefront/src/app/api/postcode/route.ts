import { NextRequest, NextResponse } from "next/server"

export async function GET(req: any) {
  const { searchParams } = new URL(req.url)
  const postcode = searchParams.get("postcode")
  const houseNumber = searchParams.get("houseNumber")

  if (!postcode || !houseNumber) {
    return NextResponse.json(
      { error: "Postcode and house number are required" },
      { status: 400 }
    )
  }

  const apiUrl = `${
    process.env.NEXT_PUBLIC_ADDRESS_VALIDATE_BASE_URL
  }${encodeURIComponent(postcode)}/${encodeURIComponent(houseNumber)}`

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_ADDRESS_VALIDATE_API_KEY}:${process.env.NEXT_PUBLIC_ADDRESS_VALIDATE_API_SECRET}`
        )}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message || "API error" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error fetching address:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
