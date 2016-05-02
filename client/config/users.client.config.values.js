(function () { 
 return angular.module("users.config")
.value("UPLOAD", {"profile":{"destination":"./public/img/profile/uploads/","public":"/img/profile/uploads/","limits":{"fileSize":"1045876"}}});

})();
