import React from 'react';
import PropTypes from 'prop-types';

function MedalTable({
  rank, code, postionY, gold, silver, bronze, total,
}) {
  return (
    <tr className={rank > 10 ? 'hide' : 'row'}>
      <td>{rank}</td>
      <td>
        <div
          className="flag"
          id={`flag-${code}`}
          style={{ backgroundPositionY: postionY }}
        />
      </td>
      <td>
        <strong className="code-name">
          {code}
        </strong>
      </td>
      <td />
      <td>{gold}</td>
      <td>{silver}</td>
      <td>{bronze}</td>
      <td>
        <strong>{total}</strong>
      </td>
    </tr>
  );
}

MedalTable.propTypes = {
  rank: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  postionY: PropTypes.string.isRequired,
  gold: PropTypes.number.isRequired,
  silver: PropTypes.number.isRequired,
  bronze: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default MedalTable;
