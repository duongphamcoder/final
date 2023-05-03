export type Convert<T> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'>;
