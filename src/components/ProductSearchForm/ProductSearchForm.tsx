import css from './ProductSearchForm.module.css';

interface Props {
  onSearch: (searchWord: string) => void;
}

export const ProductSearchForm = ({ onSearch }: Props) => {
  const searchProduct = (formData: FormData) => {
    const product = formData.get('product-title') as string;
    if (!product.trim()) {
      return;
    }
    onSearch(product);
  };

  return (
    <form action={searchProduct} className={css.form}>
      <input type="text" name="product-title" className={css.input} />
      <button className={css.button}>Пошук</button>
    </form>
  );
};
