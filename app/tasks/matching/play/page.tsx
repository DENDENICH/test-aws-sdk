import { notFound } from "next/navigation";
import { isDatabaseAvailable } from "@/lib/db";
import { getMatchingExerciseById } from "@/lib/models";
import { mockMatchingExercises } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

async function getExercise(id: string) {
    if (await isDatabaseAvailable()) {
        try {
            const exercise = await getMatchingExerciseById(id);

            if (exercise) {
                return exercise;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const mock = mockMatchingExercises.find(
        (e) => e.id === id,
    );

    if (mock) {
        return mock;
    }

    return null;
}

export default async function MatchingPlayPage() {
    const exercise = await getExercise("1");

    if (!exercise) {
        notFound();
    }

    return (
        <pre>
            {JSON.stringify(exercise, null, 2)}
        </pre>
    );
}