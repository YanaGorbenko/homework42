import { type Product } from '../../services/productsApi';
import css from './ProductsList.module.css';

interface Props {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

export const ProductsList = ({ products, onViewDetails }: Props) => {
  return (
    <ul className={css.list}>
      {products.map(product => (
        <li key={product.id} className={css.item}>
          <h3 className={css.title}>{product.title}</h3>
          <button
            className={css.detailsButton}
            type="button"
            onClick={() => onViewDetails(product)}
          >
            Переглянути деталі
          </button>
        </li>
      ))}
    </ul>
  );
};
