var X2O = X2O || {};

(function (o) {
	o.XML2OBJECT = function (url, callback, start = "rss") {
		var that = this,
			data = $.Deferred();
		getData(data, url);
		$.when(data).done(function (data) {
			o.xdata = data;
			parseData.call(that, $(data).find(start));
			o.jdata = that;
			callback();
		})
	}

	function getData(def, url) {
		$.ajax({
			url: url,
			cache: false
		}).always(function (dataFeed) {
			def.resolve(dataFeed);
		})
	}

	function parseData(xml) {
		var that = this,
			tempObj = {};
		$.each(xml, function (key, value) {
			var index;
			if (that.hasOwnProperty(value.tagName + "s")) {
				index = that[value.tagName + "s"].push({});
				if (value.children.length > 0) {
					parseData.call(that[value.tagName + "s"][index - 1], value.children);
				} else {
					that[value.tagName + "s"][index - 1][value.tagName] = value.innerHTML;
				}
			} else if (that.hasOwnProperty(value.tagName)) {
				that[value.tagName + "s"] = [];
				if (value.children.length > 0) {
					that[value.tagName + "s"].push(Object.assign({}, that[value.tagName]));
					index = that[value.tagName + "s"].push({});
					parseData.call(that[value.tagName + "s"][index - 1], value.children);
				} else {
					tempObj[value.tagName] = that[value.tagName];
					that[value.tagName + "s"].push(tempObj);
					tempObj = {};
					tempObj[value.tagName] = value.innerHTML;
					that[value.tagName + "s"].push(tempObj);
				}
				delete that[value.tagName];
			} else {
				if (value.children.length > 0) {
					that[value.tagName] = {}
					parseData.call(that[value.tagName], value.children);
				} else {
					that[value.tagName] = value.innerHTML;
				}
			}
		})
	}
}(X2O))
