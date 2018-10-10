import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loading from './components/Loading';
import TableRow from './components/TableRow';
import TableHeaders from './components/TableHeaders';

class App extends Component {
  constructor(props) {
    super(props);

    const { sortBy } = this.props;
    this.state = {
      data: [],
      isLoading: true,
      activeSort: sortBy,
    };

    this.handleSort = this.handleSort.bind(this);
    // timeout 2 seconds to demonstrate the loading...
    setTimeout(() => {
      this.fetchData();
    }, 2000);
  }

  setStateData(data) {
    this.setState(() => ({ data }));
  }

  sortTable(sortBy) {
    // values to sort after the sortBy to break ties
    const sortByVales = {
      gold: 'silver',
      silver: 'gold',
      total: 'gold',
      bronze: 'gold',
    };
    const { data } = this.state;
    data.sort((a, b) => {
      // if eaqul we sort by value set to break tie
      if (b[sortBy] === a[sortBy]) {
        return b[sortByVales[sortBy]] - a[sortByVales[sortBy]];
      }
      // sort by the sortBy value
      return b[sortBy] - a[sortBy];
    });
    this.setStateData(data);
  }

  fetchData() {
    // Json provided return cros origin error
    // const jsonUrl = "https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json";
    // json from a diffent aws s3 with cross set correctly
    const jsonUrl = 'https://s3-us-west-2.amazonaws.com/fun-files/medals.json';
    axios
      .get(jsonUrl)
      .then((response) => {
        this.handleResponse(response.data);
      })
      .catch(() => {
        // display error loading message
        this.setState({ isLoading: false, errorLoading: true });
      });
  }

  handleResponse(dataJson) {
    const sortBy = this.props;
    // remove loading ...
    this.setState({ isLoading: false });

    // sort by country code to get postionY of flags image
    dataJson.sort((a, b) => (`${a.code}`).localeCompare(b.code));
    const data = dataJson.map((row, index) => {
      // setting total, key and flag postion
      const dataTotal = Object.assign({}, row);
      dataTotal.total = row.gold + row.silver + row.bronze;
      dataTotal.key = index;
      dataTotal.postionY = `-${index * 22.5}px`;
      return dataTotal;
    });

    this.setState({ data });
    // sorting table by default value or value passed by props
    this.sortTable(sortBy);
  }

  handleSort(sortBy) {
    this.sortTable(sortBy);
    this.setState({ activeSort: sortBy });
  }


  render() {
    const {
      data, isLoading, errorLoading, activeSort,
    } = this.state;
    return (
      <div className="App">
        <Loading isLoading={isLoading} errorLoading={errorLoading} />
        <div
          className={errorLoading === true || isLoading === true ? 'hide' : ''}
        >
          <h2 className="title">MEDAL COUNT</h2>
          <table className="medals">
            <thead>
              <tr><TableHeaders handleSort={this.handleSort} activeSort={activeSort} /></tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={item.code} rank={index + 1} {...item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  sortBy: 'gold',
};

App.propTypes = {
  sortBy: PropTypes.string,
};

export default App;
