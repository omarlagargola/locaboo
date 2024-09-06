import { tableHeaders, tableItems } from './mocks';

const tableData = {
  headers: tableHeaders,
  items: tableItems,
};

const getRandomWaitingTime = () => {
  return Math. random() * (2000 - 500) + 500
};

export default {
  getTableData() {
    // The data is stored locally, but I am simulating a fake api request
    // with it's corresponding waiting time, to make it more like a real all would do
    return new Promise(resolve => {
      setTimeout(() => resolve(tableData), getRandomWaitingTime());
    })
  }
};
