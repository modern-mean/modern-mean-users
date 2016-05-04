(function () { 
 return angular.module("users.config")
.constant("MODULES", {"users":{"enable":"true","api":{"hostname":"","endpoints":{"me":"/api/me","auth":"/api/auth"}}},"admin":{"enable":"true","api":{"hostname":"","endpoint":"/api/users"}}})
.constant("SOCIAL", {"facebook":{"enable":"false","callback":"/api/auth/facebook/callback"},"twitter":{"enable":"false","callback":"/api/auth/twitter/callback"},"google":{"enable":"false","callback":"/api/auth/google/callback"},"linkedin":{"enable":"false","callback":"/api/auth/google/callback"},"github":{"enable":"false","callback":"/api/auth/google/callback"}});

})();
