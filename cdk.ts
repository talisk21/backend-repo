import * as cdk from "aws-cdk-lib";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigatewayv2-alpha";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import "source-map-support/register";

const app = new cdk.App();

const stack = new cdk.Stack(app, "ProductServiceStack", {
  env: { region: "us-east-1" },
});

const sharedLambdaProps: Partial<NodejsFunctionProps> = {
  runtime: lambda.Runtime.NODEJS_16_X,
  environment: {
    PRODUCT_AWS_REGION: "us-east-1",
  },
};

const getProductList = new NodejsFunction(stack, "GetProductListLambda", {
  ...sharedLambdaProps,
  functionName: "getProductList",
  entry: "src/handlers/getProductsList.ts",
});

const getProductById = new NodejsFunction(stack, "GetProductByIdLambda", {
  ...sharedLambdaProps,
  functionName: "getProductById",
  entry: "src/handlers/getProductById.ts",
});

const api = new apiGateway.HttpApi(stack, "ProductApi", {
  corsPreflight: {
    allowHeaders: ["*"],
    allowOrigins: ["*"],
    allowMethods: [apiGateway.CorsHttpMethod.ANY],
  },
});

api.addRoutes({
  integration: new HttpLambdaIntegration(
    "GetProductListIntegration",
    getProductList
  ),
  path: "/products",
  methods: [apiGateway.HttpMethod.GET],
});

api.addRoutes({
  integration: new HttpLambdaIntegration(
    "GetProductByIdIntegration",
    getProductById
  ),
  path: "/products/{productId}",
  methods: [apiGateway.HttpMethod.GET],
});
