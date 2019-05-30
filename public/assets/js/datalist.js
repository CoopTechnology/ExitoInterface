var dataLisTimer;
var dataLisTimerOut;
function DataList(container, order, offset, limit, eventIni, eventGetData, eventOnSelected) {
    this.container = $(container);
    this.input = this.container.find('.datalist_input');
    this.content = this.container.find('.datalist_content');
    this.model = this.container.find('.datalist_model');
    this.loading = this.container.find('.datalist_loading');
    this.url = this.container.attr('url');
    this.order = (order == undefined || order == null) ? '' : order;
    this.offset = isNaN(parseInt(offset)) ? 0 : parseInt(offset);
    this.limit = isNaN(parseInt(limit)) ? 5 : parseInt(limit);
    this.postActual = null;
    this.eventGetData = eventGetData;
    this.itemSelected = 0;

    this.container.find('.datalist_model').remove();
    this.model.removeClass('datalist_model');
    this.loading.css('display', 'none');
    this.content.css('display', 'none');

    //functions
    this.getData = function () {
        if (this.postActual == null) {
            var obj = this;
            obj.content.css('display', '');
            obj.loading.css('display', '');
            obj.itemSelected = 0;
            //NOTA: Llamada al servidor
            this.postActual = $.post(this.url, {buscar: this.input.val(), page: 1, json: 'json', modeSort: 'ASC', namec: 'nombre', /*order: this.order,*/ limit: this.limit/*, offset: this.offset*/}, function (data) {

                //var data = $.parseJSON(dataserver);
                if (data['estado'] == '0') {//parar si hay error
                    alert(data['mensaje']);
                    obj.loading.css('display', 'none');
                    return;
                }


                var newData = [];
                obj.content.html('<div class="labelBuscadorGlobal col-2"><p>Socio(a)</p></div><div class="listaSociosResultados col-10"></div>');
                for (var i = 0; i < data['options'].length; i++) {

                    var pag = obj.model.clone();
                    var html = pag.html();
                    pag.css({'display': ''});
                    pag.addClass('item');

                    for (var index in data['options'][i]) {

                        var exp = new RegExp("\\|" + index + "\\|", 'g');
                        html = html.replace(exp, data['options'][i][index]);

                        var value = pag.attr('value').replace(exp, data['options'][i][index]);
                        //console.log('Index: '+index+' ,Value:'+value);
                        pag.attr('value', value);
                    }

                    pag.html(html.trim());
                    //obj.content.append(pag);
                    $('.listaSociosResultados').append(pag);
                    newData.push(pag);
                    pag.click(function (event) {
                        obj.selectItem();
                    });

                    pag.mouseenter(function (event) {
                        var itemS = this;

                        $.each(obj.container.find('.item'), function (i, item) {
                            if (itemS == item) {

                                obj.itemSelected = i;
                                obj.changeItem();
                                return false;
                            }
                        });
                    });
                }

                obj.loading.css('display', 'none');
                //obj.offset += data['options'].length;
                obj.postActual = null;
                obj.changeItem();

                if (obj.eventGetData != null)
                    obj.eventGetData(newData);
            }, 'json');
        }
    };

    this.postAbort = function () {
        if (this.postActual != null) {
            this.postActual.abort();
            this.postActual = null;
        }
    };

    this.selectItem = function () {
        this.input.val(this.container.find('.selected').text());
        this.content.css('display', 'none');
        //console.log(this.container.find('.selected').text());
        eventOnSelected(this.container.find('.selected'));
    };

    this.changeItem = function () {
        if (this.itemSelected < 0)
            this.itemSelected = this.container.find('.item').length - 1;
        else if (this.itemSelected >= this.container.find('.item').length)
            this.itemSelected = 0;

        var obj = this;
        $.each(container.find('.item'), function (i, item) {
            if (i == obj.itemSelected)
                $(item).addClass('selected');
            else
                $(item).removeClass('selected');
        });
    };

    //events
    this.input.click({obj: this}, function (event) {
        if (container.find('.item').length > 0) {
            event.data.obj.content.css('display', '');
            //console.log('klk');

        }
    });

    this.input.keyup({obj: this}, function (event) {
        var code = event.which || event.keyCode;
        //Caracteres permitidos -- OJO --Si se cambia un caracter cambiar tambien en [buscar] si aplica
        if ((code > 47 && code < 58) || // numeric (0-9)
                (code > 64 && code < 91) || // upper alpha (A-Z)
                (code > 95 && code < 123) // lower alpha (a-z)
                || code === 13 || code === 8 || code === 46 || code === 32 || code === 190 || code === 188 || code === 38 || code === 40) {

            if (dataLisTimer !== null)
            {
                clearTimeout(dataLisTimer);
            }

            if (event.keyCode === 13) {
                // event.data.obj.selectItem();
                // console.log($('#searchInputDataList').val());
                var word = $('#searchInputDataList').val();
                if (word !== '') {
                    word = word.trim();
                    word = removeAllMultipleChart(word, " ");
                    if ((word !== ' ') && (word.length > 0)) {
                        location.href = 'http://localhost/exito/web/app_dev.php/socio/?word=' + word;

                    }
                }
                //lasNameC=word;
                //#sam cambiar esto

            } else {
                var find = true;

               // if (event.keyCode === 8 || event.keyCode === 46) {
                    var word = $('#searchInputDataList').val();
                    if ((word === '') || (word === ' ')) {
                        find=false;
                        event.data.obj.content.css('display', 'none');
                        event.data.obj.itemSelected = 0;
                        event.data.obj.loading.css('display', 'none');
                   }
                //}
                if (find === true) {
                    dataLisTimer = setTimeout(function () {
                        var word = $('#searchInputDataList').val();
                        if ((word !== '') && (word.length > 0)) {//&& (word.length>2
                            event.data.obj.postAbort();
                            //NOTA: aqui se envia la peticion al servidor
                            event.data.obj.getData();
                        }
                    }, 450);
                }
            }
        }


        /* if (event.keyCode === 13) {
         // event.data.obj.selectItem();
         // console.log($('#searchInputDataList').val());
         var word =  $('#searchInputDataList').val();
         //lasNameC=word;
         //#sam cambiar esto
         location.href = 'http://localhost/exito/web/app_dev.php/socio/?word=' + word;
         }*/ /*else if (event.keyCode >= 37 && event.keyCode <= 40) {
          
          } *//*else {
           event.data.obj.postAbort();
           event.data.obj.getData();
           }*/
    });

    this.input.keydown({obj: this}, function (event) {

        if (event.keyCode == 38) {
            event.data.obj.content.css('display', '');
            event.data.obj.itemSelected--;
            event.data.obj.changeItem();
        } else if (event.keyCode == 40) {
            event.data.obj.content.css('display', '');
            event.data.obj.itemSelected++;
            event.data.obj.changeItem();
        }
    });

    this.input.focusout({obj: this}, function (event) {

        if ($('#datalist_content' + ':hover').length) {
            return;
        }
        $('#datalist_content').empty();
    });

    //ini component
    if (eventIni != null && eventIni != undefined)
        eventIni(this);

    //style
    this.container.css({'position': 'relative'});
    this.content.css({'position': 'absolute', 'margin-left': '0px'});

    return this;
}