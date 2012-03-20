exports.config={};

exports.config.localhost ={
	"path": "D:\\"
};

exports.config.local ={
	"path": "D:\\localhost\\views"
};

exports.config.yuanying ={
	"path": "C:\\"
};

exports.config.currentView ="green";

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
		"title": "粉色",
		"cssLink": [
			"pink/pink"
		],
		"jsLink": [
			"pink/pink"
		]
	}
};