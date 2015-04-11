define([], function () {

    function controller($scope, $websocket) {

        $scope.stateData = [];
        $scope.numOnline = 0;
        $scope.numOffline = 0;
        $scope.connected = false;

        var ws = $websocket.$new({
            url: "ws://"+location.host+"/ws",
            protocols: []
        });

        ws.$on('$open', function () {
            console.log('connected');
            $scope.connected = true;
        });

        ws.$on('$message', function (data) {
            $scope.$apply(function() {

                $scope.stateData = data;

                //reset
                $scope.numOnline = 0;
                $scope.numOffline = 0;

                //update online/offline
                angular.forEach(data, function(row) {
                    if (row.HostUp) {
                        $scope.numOnline++;
                    } else {
                        $scope.numOffline++;
                    }
                });
            });
        });

        ws.$on('$close', function () {
            console.log('disconnected');
            $scope.connected = false;
        });
    }

    controller.$inject=['$scope', '$websocket'];

    return controller;
});
