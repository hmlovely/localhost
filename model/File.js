exports.file_obj = function(feilds) {
    var da = feilds;
    this.getHref = function() {
        return da.href;
    };
    this.getText = function() {
        return da.text;

    };
    this.isDirecotory = function() {
        return da.isDirecotory;
    };
    this.getTime = function() {
        return da.time;
    };
    this.getSize = function() {
        return da.size;
    };
    this.getFilename = function() {
        return da.filename;
    };
    this.isImg = function() {
        return da.isImg;
    };
    this.getPath = function() {
        return da.path;
    };
    this.getIndex = function() {
        return da.index;
    };

    this.setText = function(text) {
        da.text = text;
    };
    this.setIsDirecotory = function(isDirecotory) {
        da.isDirecotory = isDirecotory;
    };
    this.setTime = function(time) {
        da.time = time;
    };
    this.setSize = function(size) {
        da.size = size;
    };
    this.setFilename = function(filename) {
        da.filename = filename;
    };
    this.setIsImg = function(isImg) {
        da.isImg = isImg;
    };
    this.setPath = function(path) {
        da.path = path;
    };
    this.setIndex = function(index) {
        da.index = index;
    };

};