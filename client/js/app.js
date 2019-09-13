function getRRKList(success, error) {
  var soql = "Select Id, Name, RRK_NM__c, RRK_SEIKYU__c, RRK_KISHU__c, RRK_KYOTEN__c From RRK__c Where RRK_ANKEJOTAI__c = '技術承認'";
  force.query(soql, success, error);
}

function getRRKDetails(rrkid, success, error) {
  var soql = "SELECT Id, " +
  "Name, " +
  "RRK_NM__c, " +
  "RRK_SEIKYU__c " +
  "FROM RRK__c " +
  "WHERE Id = '" + rrkid + "'";
  force.query(soql, success, error);
}

function showRRKList() {
    getRRKList(
        function (data) {
            var rrks = data.records,
                html = '';
            for (var i=0; i<rrks.length; i++) {
                html += '<li class="table-view-cell"><a href="#connectTables/'+ rrks[i].Id +'">' + rrks[i].Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">RRK</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showRRKDetails(rrkid) {

    getRRKDetails(rrkid,
        function (data) {
            var rrk = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + rrk.Name + '</h4>' +
                                '<p>' + (rrk.Id || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Speaker: ' +
                                rrk.RRK_NM__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (rrk.RRK_SEIKYU__c || 'No description yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showRRKList);
router.addRoute('sessions/:id', showRRKDetails);
