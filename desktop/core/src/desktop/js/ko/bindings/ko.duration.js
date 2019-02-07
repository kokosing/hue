// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import $ from 'jquery';
import ko from 'knockout';
import sprintf from 'sprintf-js';

ko.bindingHandlers.duration = (function() {
  let that;
  return (that = {
    init: function(element, valueAccessor) {
      that.format(element, valueAccessor);
    },
    update: function(element, valueAccessor) {
      that.format(element, valueAccessor);
    },
    format: function(element, valueAccessor) {
      const value = valueAccessor();
      const formatted = that.humanTime(ko.unwrap(value));
      $(element).text(formatted);
    },
    humanTime: function(value) {
      value = value * 1;
      if (value < Math.pow(10, 3)) {
        return value + ' ns';
      } else if (value < Math.pow(10, 6)) {
        value = (value * 1.0) / Math.pow(10, 6);
        return sprintf('%.4f ms', value);
      } else if (value < Math.pow(10, 9)) {
        value = (value * 1.0) / Math.pow(10, 9);
        return sprintf('%.4f s', value);
      } else {
        // get the ms value
        const SECOND = 1000;
        const MINUTE = SECOND * 60;
        const HOUR = MINUTE * 60;
        let value = (value * 1) / Math.pow(10, 6);
        let buffer = '';

        if (value > HOUR) {
          buffer += sprintf('%i h ', value / HOUR);
          value = value % HOUR;
        }

        if (value > MINUTE) {
          buffer += sprintf('%i m ', value / MINUTE);
          value = value % MINUTE;
        }

        if (value > SECOND) {
          buffer += sprintf('%.3f s', (value * 1.0) / SECOND);
        }
        return buffer;
      }
    }
  });
})();
