//instructions
//write the 4 functions below
//no third party libraries
//try not to use any forEach
//each function should be short and some functions can depend on other functions (hint no function should be more than 10 lines)

//list of products
var products = [{id: 1, price: 5, name: 'foo'}, {id: 2, price: 3, name: 'bar'}, {id: 3, price: 9, name: 'bazz'}];

//list of line items
var lineItems = [{productId: 1, quantity: 1}, {productId: 1, quantity: 1}, {productId: 2, quantity: 1}, {productId: 3, quantity: 1}];
//returns an object
//keys are the ids of products
//the values are the products themselves
function generateProductsMap(products){
    var allProducts = products.reduce(function(all, current) {
      all[current['id']] = current;
      return all;
    }, {})
    return allProducts;
}

//returns an object
//keys are the ids of products
//value is the total revenue for that product
function salesByProduct(products, lineItems){
    var allProducts = generateProductsMap(products);
    var salesProducts = lineItems.reduce(function(sales, current) {
        currentPrice = allProducts[current['productId']]['price'];
        if (current['productId'] in sales) {
            sales[current['productId']] += current['quantity'] * currentPrice;
        } else {
            sales[current['productId']] = current['quantity'] * currentPrice;
        }
        return sales;
    }, {})
    return salesProducts;
}

//return the total revenue for all products
function totalSales(products, lineItems){
    var allProducts = generateProductsMap(products);
    var totalSales = lineItems.reduce(function(total, current) {
        currentPrice = allProducts[current['productId']]['price'];
        total += current['quantity'] * currentPrice;
        return total;
    }, 0)
    return totalSales;
}

//return the product responsible for the most revenue
function topSellerByRevenue(products, lineItems){
    var salesProducts = salesByProduct(products, lineItems);
    var salesIDs = Object.keys(salesProducts);
    console.log(salesIDs)
    highestID = salesIDs.reduce(function(highest, current) {
        if (salesProducts[current] > salesProducts[highest]) {
            highest = current;
        } 
        return highest;
    }, 1)
    return highestID;
}

console.log(`generates product map - should be
{
  1:{
    id: 1,
    name: "foo",
    price: 5
  },
  2:{
    id: 2,
    name: "bar",
    price: 3
  },
  3:{
    id: 3,
    name: "bazz",
    price: 9
  }
}
`, generateProductsMap(products));
console.log(`sales by product - should be
  {
    1: 10,
    2: 3,
    3: 9
}`, salesByProduct( products, lineItems));
console.log('total sales - should be 22', totalSales( products, lineItems));
console.log('top seller by revenue', topSellerByRevenue(products, lineItems ));