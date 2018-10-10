import React from 'react';
import PropTypes from 'prop-types';

function Loading({ isLoading, errorLoading }) {
  return (
    <div>
      <div className={isLoading === true ? '' : 'hide'}>
                Loading...
      </div>
      <div className={errorLoading === true ? '' : 'hide'}>
                Error loading data, Please contact support
      </div>
    </div>
  );
}

Loading.defaultProps = {
  errorLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  errorLoading: PropTypes.bool,
};

export default Loading;
