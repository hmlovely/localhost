exports.config={};

exports.config.localhost ={
	"path": "F:"
};

exports.config.local ={
	"path": "F:\\localhost\\views"
};

exports.config.currentView ="pink";

exports.config.views ={
	"default": {
		"title": "默认主题",
		"cssLink": [
			"default/default",
			"default/default2"
		],
		"jsLink": [
			"default/default"
		]
	},
	"green": {
		"title": "绿色心情",
		"cssLink": [
			"green/green"
		],
		"jsLink": [
			"green/green"
		]
	},
	"pink": {
		"title": "pink",
		"cssLink": [
			"pink/pink"
		],
		"jsLink": [
			"pink/pink"
		]
	}
};