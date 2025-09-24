// Implementation of React "Thinking in React" Searchable Product Table

// Takes input JSON structure containing product information
// - each entry looks like {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"}
// UI features to allow the user to filter what is displayed
// - search bar by product name
// - check box to filter for only products in stock

// Product Row component
// - displays a row for each product

function ProductRow (product) {
  console.log("  ProductRow " + product.name);
  return (
    <li
      key={product.id}
      className={product.stocked ? 'Product_In_Stock' : 'Product_Not_In_Stock'}
    >{product.name} {product.price}</li>
  );
}

// Product Category Row component
// - displays a heading for each category

function ProductCategoryRow(category) {
  return (<div className="Category">{category}</div>);
}

// Product Table component
// - displays and filters the data collection based on user input

function ProductTable(props) {

  // Function to create a list of all products in a given category

  function createListOfProducts(list_of_products, category) {  
    console.log("createListOfProducts " + category);
    let listOfProductRows = [];
    for (let i = 0; i < list_of_products.length; i++) {
      const product = list_of_products[i];
      if (product.category === category) {
        const productRow = ProductRow (product);
        listOfProductRows.push (productRow);
      }
    }
    return (listOfProductRows);
  }

  // Create an array of all unique categories
  const uniqueCategories = [];
  props.list_of_products.map(product => {
    if (uniqueCategories.indexOf(product.category) === -1) {
        uniqueCategories.push(product.category)
    }});

  // Create an array that forms the table content
  let productTableContent = [];
  for (let i = 0; i < uniqueCategories.length; i++) {
    const category = uniqueCategories[i];
    const categoryProducts = createListOfProducts(props.list_of_products, category);
    const categoryHeader = ProductCategoryRow(category);
    productTableContent.push (
      <div key={i}>
        {categoryHeader}
        {categoryProducts}
      </div>
    );
  }

  return (
    <div>
      <h1>Name Price</h1>
      <div>{productTableContent}</div>
    </div>
  );
}

// Search Bar component
// - receives all user input

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Search..." />
        </form>
        <label className="Check_Box_Text">
          <input type="checkbox" />
          Only show products in stock
        </label>
      </div>
    );
  }
}

// Filterable Product Table component
// - contains the entirety of the example

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable list_of_products={this.props.list_of_products} />
      </div>
    );
  }
}

// Searchable Product Table Application

function App() {

  //const list_of_products = JSON.parse('{id: 17, category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"}');

  const list_of_products = [
    {id: 17, category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {id: 56, category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {id:  8, category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {id: 27, category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {id: 41, category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {id: 33, category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

  return (
    <div className="App">
      <FilterableProductTable list_of_products={list_of_products} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);