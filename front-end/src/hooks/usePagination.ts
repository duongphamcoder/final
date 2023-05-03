// Constants
import { RECORD, SEARCH_PARAMS } from '@constants';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = <T>(data: T[], record = RECORD) => {
  const [searchParam] = useSearchParams();

  const pagination = useMemo(() => {
    const size = data.length % record;
    const residual = data.length / record;

    if (!data.length || data.length <= record) return [];

    if (size === 0) {
      return new Array(residual).fill(0);
    }

    return new Array(Math.floor(residual) + 1).fill(0);
  }, [data]);

  const valueOnPage = useMemo(() => {
    const currentPage = parseInt(searchParam.get(SEARCH_PARAMS.PAGE) || '1');

    const value = data.slice(
      currentPage * record - record,
      currentPage * record
    );

    return {
      currentPage,
      value,
    };
  }, [searchParam, data]);

  return {
    ...valueOnPage,
    pagination,
  };
};
