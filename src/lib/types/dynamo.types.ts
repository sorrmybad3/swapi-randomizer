import { AttributeValue } from "@aws-sdk/client-dynamodb";

export type DynamoDocumentItemType = Record<string, AttributeValue> | undefined