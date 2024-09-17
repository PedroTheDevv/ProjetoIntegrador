import React from 'react';
import '../styles/pagination.css';
import { Button } from '@chakra-ui/react';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button
          colorScheme='teal'
          size='sm'
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1}>
            Página Anterior
          </Button>
        </li>

        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button
          colorScheme='teal'
          size='sm'
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1}>
            {currentPage === 1 ? '' : currentPage - 1}
          </Button>
        </li>

        <li className="page-item active">
          <Button
          colorScheme='teal'
          size='sm'
          className="page-link">
            {currentPage}
          </Button>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button
          colorScheme='teal'
          size='sm'
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          className="page-link"
          disabled={currentPage === totalPages}>
            {currentPage === totalPages ? '' : currentPage + 1}
          </Button>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button
          colorScheme='teal'
          size='sm'
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          className="page-link"
          disabled={currentPage === totalPages}>
            Próxima Página
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
