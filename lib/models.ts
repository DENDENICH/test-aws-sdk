import {
    GetCommand,
} from "@aws-sdk/lib-dynamodb";

import { docClient } from "./db";

export async function getMatchingExerciseById(id: string) {
    return docClient.send(
        new GetCommand({
            TableName: "matching",
            Key: {
                id,
            },
        }),
    );
}