import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {GetItemCommand} from "@aws-sdk/client-dynamodb";
import {marshall} from "@aws-sdk/util-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Ровно та аутентификация, которую юзер использует в AWS
const client = new DynamoDBClient({
    endpoint: process.env.DOCUMENT_API_ENDPOINT,
    region: "ru-central1",
});

export async function isDatabaseAvailable(): Promise<boolean> {
    // Не обязательно это должно быть что-то правильное
    try {
        await client.send(new GetItemCommand({
            TableName: "matching",
            Key: marshall({
                "series_id": 1,
                "title": "title"
            }),
        }))
            .then(data => {
                console.log("Чтение записи успешно:", JSON.stringify(data, null, 2));
            })
            .catch(err => {
                console.error("Не удалось прочитать запись. Ошибка JSON:", JSON.stringify(err, null, 2));
            })
        return true;
    } catch {
        return false;
    }
}

export const docClient =
    DynamoDBDocumentClient.from(client);