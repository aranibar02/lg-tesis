$(".more-info").on('click',function(e){
    e.preventDefault();
    var target = $(this).parent().parent().parent().find('div.details');
    console.log(target);
    target.addClass('open');
    $(this).parent().hide();
})

$(".actions .less-info").on('click', function(e){
    e.preventDefault();

    var target = $(this).parent().parent();

    target.removeClass('open');
    $(this).parent().parent().parent().find('div.buttons').show();
})

$('body').bind("keydown", function(e){
    var column = $('.grid.active').attr('column');
    var row = $('.grid.active').attr('row');
    var item = $('.grid .buttons .grid.active').attr('item');
    var minitem = $('.grid .actions .grid.active').attr('minitem');
    console.log('asdasd',minitem);
    if(e.keyCode === 39){
        if(column == undefined){
            console.log('undefined12');
            $('.grid[column=1][row=1]').addClass('itemselected');
            $('.grid[column=1][row=1]').addClass('active');
        }else if(column == 1){
            column = parseInt(column);
            row = parseInt(row);
            if(column == 1 && row == 1){
                column++;
                $('.grid').removeClass('active');
                $('.grid[column='+column+'][row=1]').addClass('active');
                $('.grid[column='+column+'][row=1] .grid[item=1]').addClass('active');
            }
        }else if(column == 2){
            item = parseInt(item);
            minitem = parseInt(minitem);
            if(item < 2){
                item++;
                $('.grid .grid').removeClass('active');
                $('.grid[column='+column+'][row='+row+'] .grid[item='+item+']').addClass('active');
            }
            console.log('mini',minitem);

            if(minitem < 2){
                minitem++;
                console.log('mini',minitem);
                $('.grid').removeClass('active');
                $('.grid .actions .grid[minitem='+minitem+']').addClass('active');
            }

        }
        console.log('right');
    }else if(e.keyCode === 40){
        console.log('down');
        column = parseInt(column);
        row = parseInt(row);
        if(column == 1){
            row++;
            if(row < 5){
                $('.grid').removeClass('active');
                $('.grid').removeClass('itemselected');
                $('.grid[column=1][row='+row+']').addClass('active');
                $('.grid[column=1][row='+row+']').addClass('itemselected');
            }
        }else if(column == 2){
            row++;
            if(row < 5){
                $('.grid').removeClass('active');
                $('.grid[column=2][row='+row+']').addClass('active');
                $('.grid[column=2][row='+row+'] .grid[item=1]').addClass('active');

                if(row == 3){
                    $("#style-2").animate({ scrollTop: 400 }, 1000);
                }
            }
        }
    }else if(e.keyCode === 37){
        console.log(column);
        if(column == 2 && item == 1){
            console.log('entra aca');
            column = parseInt(column);
            row = parseInt(row);
            column--;
            $('.grid').removeClass('active');
            $('.grid[column='+column+'][row=1]').addClass('active');
            $('.grid[column='+column+'][row=1] .grid[item=1]').addClass('active');
            
        }else if(column == 2 ){
            item = parseInt(item);
            minitem = parseInt(minitem);
            if(item > 0){
                item--;
                $('.grid .grid').removeClass('active');
                $('.grid[column='+column+'][row='+row+'] .grid[item='+item+']').addClass('active');
            }
            if(minitem > 0){
                minitem--;
                $('.grid').removeClass('active');
                $('.grid .actions .grid[minitem='+minitem+']').addClass('active');
            }

        }
    }else if(e.keyCode === 38){
        console.log('up');
        column = parseInt(column);
        row = parseInt(row);
        if(column == 1){
            row--;
            if(row > 0){
                $('.grid').removeClass('active');
                $('.grid').removeClass('itemselected');
                $('.grid[column=1][row='+row+']').addClass('active');
                $('.grid[column=1][row='+row+']').addClass('itemselected');
            }
        }else if(column == 2){
            if(row > 1){
                row--;
                $('.grid').removeClass('active');
                $('.grid[column=2][row='+row+']').addClass('active');
                $('.grid[column=2][row='+row+'] .grid[item=1]').addClass('active');

                if(row == 2){
                    $("#style-2").animate({ scrollTop: -400 }, 1000);
                }
            }
        }
    }else if(e.keyCode === 13){
        console.log('enter');
        
        if(column == 2 && item == 1){
            $('.grid.active a.more-info')[0].click();
            $('.grid.active a.more-info').addClass('openned');
            $('.grid[column=2][row='+row+'] .grid[minitem=1]').addClass('active');
        }else if(column == 2 && item == 2){
            $('.grid.active.reserva')[0].click();
        }

        if(column == 2 && minitem == 1){
            $('.grid.active a.less-info')[0].click();
            $('.grid.active a.more-info').removeClass('openned');
            $('.grid.active .grid[item=1][row='+row+']').addClass('active');
        }
    }
});