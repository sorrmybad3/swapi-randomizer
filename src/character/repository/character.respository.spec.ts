import "reflect-metadata";
import { CharacterRepository } from "./character.repository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { CreateCharacterDto } from "../dto/create.character.dto";
import { v4 as uuidv4 } from "uuid";
import { container } from "tsyringe";
import { DynamoDBClientProvider } from "../../lib/dynamodb/dynamo.client";

jest.mock("@aws-sdk/client-dynamodb");
jest.mock("uuid");

describe("CharacterRepository", () => {
  let characterRepo: CharacterRepository;
  let mockDynamoDBClient: DynamoDBClient = new DynamoDBClient({});

  beforeEach(() => {
    characterRepo = container.resolve(CharacterRepository);
    const mockDbProvider = {
      getClient: jest.fn().mockReturnValue(mockDynamoDBClient),
    };
    container.registerInstance(
      DynamoDBClientProvider,
      mockDbProvider as unknown as DynamoDBClientProvider,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCharacter", () => {
    it("should create a character and retrieve it", async () => {
      const uuid = "mock-uuid";
      (uuidv4 as jest.Mock).mockReturnValue(uuid);
      const dto: CreateCharacterDto = { nombre: "Luke", altura: 175 };
      const mockItem = {
        id: { S: uuid },
        nombre: { S: "Luke" },
        altura: { N: "175" },
      };

      (mockDynamoDBClient.send as jest.Mock)
        .mockImplementationOnce(() => {
          return Promise.resolve({});
        })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            Item: {
              id: { S: "mock-uuid" },
              nombre: { S: "Luke" },
              altura: { N: "175" },
            },
          });
        });

      const result = await characterRepo.createCharacter(dto);
      expect(mockDynamoDBClient.send as jest.Mock).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockItem);
    });
  });

  describe("findOneCharacter", () => {
    it("should retrieve a character by ID", async () => {
      const uuid = "mock-uuid";
      const mockItem = {
        id: { S: uuid },
        nombre: { S: "Leia" },
        altura: { N: "165" },
      };
      (mockDynamoDBClient.send as jest.Mock).mockResolvedValue({
        Item: mockItem,
      });

      const result = await characterRepo.findOneCharacter(uuid);
      expect(mockDynamoDBClient.send as jest.Mock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockItem);
    });
  });
});
