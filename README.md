Service is done.
Link to list of products: https://3v70jdgt00.execute-api.us-east-1.amazonaws.com/products

Link to product by id: https://3v70jdgt00.execute-api.us-east-1.amazonaws.com/products/id08
To test you can use IDs: id01, id02 ... id08, incorrect id will give you error 404 and message "Product not found"

Please, check whole repository. I mistakenly pushed all code to main branch and am unable to create full PR with my changes.
Code is contained in "scr" folder and cdk.ts file.

There are changes in Frontend code to receive product list from https://3v70jdgt00.execute-api.us-east-1.amazonaws.com/products
Link to front-end repository: https://github.com/talisk21/nodejs-aws-shop-react-fork-1

Additional scope:
Lambda handlers (getProductsList, getProductsById) code are written in separate files.
Error for wrong ID gives message "Product not found" and 404 status.
NO unit test and documentation, unfortunately.

Thank you!
