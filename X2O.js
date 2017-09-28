var X2O = X2O || {};

(function (o) {

	o.XML2OBJECT = function (url, callback, start) {
		var that = this.constructor == o.XML2OBJECT ? this : {},
			data = $.Deferred().done(function (data) {
				console.log(data);
				o.xdata[o.xdata.length] = data;
				parseData.call(that, $(data).find(startNode));
				$.extend(o.jdata, that)
				callback();
			}),
			startNode = start !== undefined ? start : ":first";
		o.jdata = {};
		o.xdata = [];
		getData(data, url);
	}

	function getData(def, url) {
		$.ajax({
			url: url,
			cache: false,
			converters: {
				"text xml": jQuery.parseXML
			},
		}).always(function (dataFeed) {
			def.resolve(dataFeed);
		})
	}

	function parseData(xml) {
		var that = this,
			tempObj = {};
		$.each(xml, function (key, value) {
			var hasChildren = $(value).children().length > 0 ? true : false;
			var index;
			if (that.hasOwnProperty(value.tagName + "s")) {
				index = that[value.tagName + "s"].push({});
				if (hasChildren) {
					parseData.call(that[value.tagName + "s"][index - 1], $(value).children());
				} else {
					that[value.tagName + "s"][index - 1][value.tagName] = value.textContent;
				}
			} else if (that.hasOwnProperty(value.tagName)) {
				that[value.tagName + "s"] = [];
				if (hasChildren) {
					that[value.tagName + "s"].push($.extend({}, that[value.tagName]));
					index = that[value.tagName + "s"].push({});
					parseData.call(that[value.tagName + "s"][index - 1], $(value).children());
				} else {
					tempObj[value.tagName] = that[value.tagName];
					that[value.tagName + "s"].push(tempObj);
					tempObj = {};
					tempObj[value.tagName] = value.textContent;
					that[value.tagName + "s"].push(tempObj);
				}
				delete that[value.tagName];
			} else {
				if (hasChildren) {
					that[value.tagName] = {}
					parseData.call(that[value.tagName], $(value).children());
				} else {
					that[value.tagName] = value.textContent;
				}
			}
		})
	}

}(X2O))
