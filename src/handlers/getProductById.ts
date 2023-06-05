import buildResponse from "../utils/buildResponse";
import { PRODUCTS } from "../mockData";

export const handler = async (event: any) => {
  try {
    const queryData = event.pathParameters;
    const requestedProduct = PRODUCTS.find(
      (item: any) => item.id == queryData?.productId
    );
    if (requestedProduct !== undefined) {
      return buildResponse(200, requestedProduct);
    }
    return buildResponse(404, { message: "Product not found" });
  } catch (err: any) {
    return buildResponse(500, { message: err.message });
  }
};
