'use strict';

const crypto = require('crypto');

module.exports = {
  id: function (len) {
    if (len === undefined) {
      len = 24;
    }
    return crypto.createHash("md5").update(Math.random().toString()).digest("hex").substring(0, len);
  },

  getRandomInt: function (min, max) {
    if (min === undefined) {
      min = 1;
    }
    if (max === undefined) {
      max = 10;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  },

  getUserInfo: function (name) {
    let n = this.getRandomInt();
    const res = [];
    while (n-- > 0) {
      res.push({
        "id": this.id()
      });
    }
    return {
      "data": {
        "name": name,
        "projects": res
      }
    };
  },

  getProjectList: function (ids) {
    const res = [];
    const self = this;
    for (let i = 0; i < ids.length; ++i) {
      res.push({
        "id": ids[i],
        "name": "Project " + this.id(3).toUpperCase(),
        "repos": self.getRandomInt(0, 100)
      });
    }
    return {
      "data": res
    };
  }
};