import buildResponse from "../utils/buildResponse";
import { PRODUCTS } from "../mockData";

export const handler = async (event: any) => {
  try {
    return buildResponse(200, PRODUCTS);
  } catch (err: any) {
    return buildResponse(500, { message: err.message });
  }
};
