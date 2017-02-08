const _ = require('lodash');

const errList = {
  api: {
    default: {
      code: 1000,
      description: 'Unknown api error'
    },
    bad_params: {
      code: 1001,
      description: 'Wrong input parameters'
    },
    not_found: {
      code: 1002,
      description: 'Route not found'
    },
    object_not_found: {
      code: 1006,
      description: 'Object not found'
    }
  },
  user: {
    default: {
      code: 2000,
      description: 'Unknown user error'
    },
  },
  dbo: {
    default: {
      code: 3000,
      description: 'Unknown dbo error'
    }
  }
};
module.exports = errList;
