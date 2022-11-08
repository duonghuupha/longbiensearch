$(function(){
    $.resize.throttleWindow = false;
    var placeholder = $('#piechart-placeholder').css({ 'width': '90%', 'min-height': '150px' });
    /*fetch(baseUrl + '/index/percent_student')
        .then((r)=>{
            r.text()
            .then(
                (d)=>{
                    drawPieChart(placeholder, d);
                    placeholder.data('chart', d);
                }
            )
        });*/
    fetch(baseUrl + '/index/percent_student').then((r)=>{r.text().then((d)=>{
        var data = d.split(','); console.log(data);
        drawPieChart(placeholder, data);
        placeholder.data('chart', data);
    })});
    placeholder.data('draw', drawPieChart);
    var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
    var previousPoint = null;
    placeholder.on('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint != item.seriesIndex) {
                previousPoint = item.seriesIndex;
                var tip = item.series['label'] + " : " + item.series['percent'] + '%';
                $tooltip.show().children(0).text(tip);
            }
            $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
        } else {
            $tooltip.hide();
            previousPoint = null;
        }

    });
});

function drawPieChart(placeholder, data, position) {
    $.plot(placeholder, data, {
        series: {
            pie: {
                show: true,
                tilt: 0.8,
                highlight: {
                    opacity: 0.25
                },
                stroke: {
                    color: '#fff',
                    width: 2
                },
                startAngle: 2
            }
        },
        legend: {
            show: true,
            position: position || "ne",
            labelBoxBorderColor: null,
            margin: [-30, 15]
        }
        ,
        grid: {
            hoverable: true,
            clickable: true
        }
    })
}