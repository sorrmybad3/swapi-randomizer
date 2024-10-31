import { DynamoDocumentItemType } from "../../lib/types/dynamo.types";
import { CharacterSchema } from "../entity/character.entity";

export class CharacterUtils {
  static fromItemTo(character: DynamoDocumentItemType): CharacterSchema | null {
    if (!character) return null;
    return new CharacterSchema(
      character?.id?.S || "",
      character?.nombre?.S || "",
      Number(character.altura.N),
    );
  }
}
