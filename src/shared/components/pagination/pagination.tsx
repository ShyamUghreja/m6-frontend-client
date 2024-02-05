import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import '../pagination/pagination.sass';

type paginationProps = {
  onPageChange: any;
  totalCount: number;
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
  className: any
};

const Pagination = (props: paginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <i className="ri-arrow-left-line"></i>
      </li>
      {paginationRange.map((pageNumber: any, i: any) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={i}>&#8230;</li>;
        }

        return (
          <li key={i}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <i className="ri-arrow-right-line"></i>
      </li>
    </ul>
  );
};

export default Pagination;
