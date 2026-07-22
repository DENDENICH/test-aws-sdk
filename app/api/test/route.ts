import { NextResponse } from "next/server";
import { getMatchingExerciseById } from "@/lib/models";

export async function GET() {
    try {
        const result = await getMatchingExerciseById("1");

        return NextResponse.json(result);
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                error: String(err),
            },
            {
                status: 500,
            },
        );
    }
}