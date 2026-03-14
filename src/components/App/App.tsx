import { useState, useEffect } from 'react';
import { getProducts, type Product } from '../../services/productsApi';
import { ProductSearchForm } from '../ProductSearchForm/ProductSearchForm';
import { ProductsList } from '../ProductList/ProductList';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  useEffect(() => {
    const showProducts = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setNoResults(false);
        const { products } = await getProducts(searchQuery);
        if (products.length === 0) {
          setNoResults(true);
        }
        setProducts(products);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    showProducts();
  }, [searchQuery]);

  const handleSearch = (searchWord: string) => {
    setSearchQuery(searchWord);
  };

  const onModalOpen = (product: Product) => {
    setSelectedProduct(product);
  };
  const onModalClose = () => {
    setSelectedProduct(null);
  };
  return (
    <>
      <h1>Список продуктів</h1>

      <ProductSearchForm onSearch={handleSearch} />
      {!noResults && (
        <ProductsList products={products} onViewDetails={onModalOpen} />
      )}
      {isLoading && <p>LOADING...</p>}
      {isError && <p>Opps! It's error!</p>}
      {noResults && <p>Результатів не знайдено</p>}
      {selectedProduct && (
        <Modal onClose={onModalClose}>
          <div className="modalContent">
            <h3>{selectedProduct.title}</h3>
            <p>
              <span>Category:</span> {selectedProduct.category}
            </p>
            <p>
              <span>Description:</span> {selectedProduct.description}
            </p>
            <p>
              <span>Brand:</span> {selectedProduct.brand}
            </p>
            <p>
              <span>Price:</span> {selectedProduct.price}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};
