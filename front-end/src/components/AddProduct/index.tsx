import { useFetch } from 'hooks';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';

// HOCs
import { withErrorBoundary } from 'HOCS';

// Constants
import { ENDPOINT } from '@constants';

// Components
import { Button, Input } from 'components/commons';

// Styles
import styles from 'components/AddProduct/index.module.css';
import container from 'styles/commons/index.module.css';

// Types
import { Category } from 'types';

export type AddProductType = {
  name: string;
  price: string;
  category_id: string;
  imageURL: string;
};

type AddProductProps = {
  product: AddProductType;
  isUpload: boolean;
  isUpdateForm?: boolean;
  isDeleted?: boolean;
  handleChange: (_e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClose?: () => void;
  onSubmit?: (_e: FormEvent) => void;
  onDelete?: (_e: MouseEvent) => void;
  onUpdate?: (_e: MouseEvent) => void;
  onActive?: (_e: MouseEvent) => void;
};

const AddProduct = (props: AddProductProps) => {
  const {
    product,
    isUpload,
    isUpdateForm,
    isDeleted = true,
    handleChange,
    onSubmit,
    onClose,
    onDelete,
    onActive,
    onUpdate,
  } = props;

  const { data: categories = [] } = useFetch<Category[]>(ENDPOINT.CATEGORIES);

  return (
    <section className={container.overlay} onClick={onClose}>
      <form
        action="#"
        method="POST"
        className={styles.addProduct}
        onSubmit={onSubmit}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <div className={styles.formItem}>
          <Input
            className={styles.input}
            value={product.name}
            placeholder="Enter name..."
            name="name"
            onChange={handleChange}
          />
          <Input
            className={styles.input}
            type="number"
            value={product.price}
            placeholder="Enter price..."
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formItem}>
          <select
            className={styles.select}
            value={product.category_id}
            name="category_id"
            onChange={handleChange}
          >
            <option value="">Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className={styles.file}>
            {!isUpload && (
              <label htmlFor="imageURL" className={styles.image}>
                {!product.imageURL && <span>Choose image...</span>}

                {product.imageURL && !isUpload && (
                  <img src={product.imageURL} className={styles.showImage} />
                )}

                <input
                  hidden
                  type="file"
                  name="imageURL"
                  id="imageURL"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleChange}
                />
              </label>
            )}

            {isUpload && (
              <div className={`${styles.spinner} ${styles.image}`}></div>
            )}
          </div>
        </div>
        <div className={styles.formItem}>
          {!isUpdateForm ? (
            <Button type="submit" label="Submit" variant="success" />
          ) : (
            <>
              <Button label="update" onClick={onUpdate} variant="secondary" />
              <Button
                label={isDeleted ? 'delete' : 'active'}
                onClick={isDeleted ? onDelete : onActive}
                variant={isDeleted ? 'primary' : 'success'}
              />
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default withErrorBoundary(AddProduct);
