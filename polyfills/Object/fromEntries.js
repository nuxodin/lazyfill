if (!Object.fromEntries) {
    Object.fromEntries = function (arr) {
        var obj = {}, item, i;
        for (i=0; item=arr[i++];) {
            obj[item[0]] = item[1];
        }
        return obj;
    };
}