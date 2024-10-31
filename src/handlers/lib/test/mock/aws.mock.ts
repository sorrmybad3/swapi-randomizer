import { APIGatewayEvent } from "aws-lambda";

export class AWSMock {
  static generateApiGatewayEvent(
    override: Partial<APIGatewayEvent>,
  ): APIGatewayEvent {
    let event: APIGatewayEvent = {
      body: null,
      headers: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/",
      pathParameters: null,
      queryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: "123456789012",
        apiId: "api-id",
        authorizer: {
          claims: null
        },
        domainName: "testDomainName",
        domainPrefix: "testPrefix",
        extendedRequestId: "requestId",
        httpMethod: "GET",
        identity: {
          accessKey: null,
          accountId: "123456789012",
          apiKey: "testApiKey",
          apiKeyId: "testApiKeyId",
          caller: "testCaller",
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          sourceIp: "127.0.0.1",
          user: "testUser",
          userAgent: "Custom User Agent String",
          userArn: "arn:aws:iam::123456789012:user/testUser",
          principalOrgId: null,
          clientCert: null,
        },
        path: "/",
        protocol: "HTTP/1.1",
        requestId: "c9d9ac36-6575-4f2c-a9f4-b3f7d3e2a207",
        requestTime: "31/Oct/2024:12:00:00 +0000",
        requestTimeEpoch: 1698744000000,
        resourceId: "resource-id",
        resourcePath: "/",
        stage: "test",
      },
      resource: "/",
      multiValueHeaders: {},
      multiValueQueryStringParameters: null,
      ...override,
    };
    return event;
  }
}
