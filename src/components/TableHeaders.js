import React from 'react';
import PropTypes from 'prop-types';

function TableHeaders({ handleSort, activeSort }) {
  const tableTH = [
    <th key={10} />,
    <th key={11} />,
    <th key={12} style={{ width: '60px' }} />,
    <th key={13} style={{ width: '85px' }} />,
  ];
  const headers = [
    { medal: 'gold' },
    { medal: 'silver' },
    { medal: 'bronze' },
  ];

  for (let i = 0; i < headers.length; i += 1) {
    const { medal } = headers[i];

    tableTH.push(
      <th
        key={i}
        className={
                    activeSort === medal ? 'active-sort points' : 'points'
                }
        onClick={() => handleSort(medal)}
      >
        <div
          className={activeSort === medal ? 'sort top-dark' : 'sort top-white'}
        >
          <span
            className={`bg-${medal} medal-color`}
          />
        </div>
      </th>,
    );
  }
  tableTH.push(
    <th key={7} onClick={() => handleSort('total')}>
      <div
        id="total"
        className={activeSort === 'total' ? 'top-dark' : 'top-white'}
      >
        <span>TOTAL</span>
      </div>
    </th>,
  );
  return tableTH;
}

TableHeaders.propTypes = {
  activeSort: PropTypes.string.isRequired,
};

export default TableHeaders;
