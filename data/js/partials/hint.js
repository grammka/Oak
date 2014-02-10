$.fn.hint = function (options) {

    /*

     Скрипт автоматически определяет положение подсказки.
     Для жесткого позиционирования необходимо указать data-hint-pos="top | right | bottom | left"
     Для смены текста при наведении ( скрыть | показать ) необходимо указать у элемента атрибут data-hint-toggle="скрыть|показать", либо
     если элемент 1 - передать через опции { toggleText: 'скрыть|показать' }

     */

    var self    = this,
        $item   = $(this),
        $body   = $('body'),
        $hint   = null;

    var o = $.extend({
        color: null, // default is dark | light
        padding: 7,
        toggleText: null
    }, options);

    function createHint ($obj) {
        var text    = $obj.attr('data-hint-text'),
            pos     = $obj.attr('data-hint-pos');

        $hint = $('<div class="b-hint'+ (pos ? ' b-hint_'+ pos : '') +'">'+ text +'</div>');
        $body.prepend($hint);

        if (o.color && o.color == 'light') {
            $hint.addClass('b-hint_light');
        }
    }

    function showHint ($obj) {
        createHint($obj);

        var itemOffset  = $obj.offset(),
            dataPos     = $obj.attr('data-hint-pos')

        hintSize    = {
            w: $hint.outerWidth(true),
            h: $hint.outerHeight(true)
        },

            itemSize = {
                w: $obj.width(),
                h: $obj.height()
            },

            winSize = {
                w: $(window).width(),
                h: $(window).height()
            };


        if (dataPos) {
            switch (dataPos) {
                case 'top':
                    var cssPos = {
                        top:    itemOffset.top - itemSize.h + o.padding,
                        left:   itemOffset.left + (itemSize.w - hintSize.w) / 2
                    };
                    break;

                case 'right':
                    var cssPos = {
                        top:    itemOffset.top + (itemSize.h - hintSize.h) / 2,
                        left:   itemOffset.left + itemSize.w + o.padding
                    };
                    break;

                case 'bottom':
                    var cssPos = {
                        top:    itemOffset.top + itemSize.h + o.padding,
                        left:   itemOffset.left + (itemSize.w - hintSize.w) / 2
                    };
                    break;

                case 'left':
                    var cssPos = {
                        top:    itemOffset.top + (itemSize.h - hintSize.h) / 2,
                        left:   itemOffset.left - hintSize.w - o.padding
                    };
                    break;
            }

            $hint.css(cssPos);
        } else {

        }
    }

    if (o.toggleText && typeof o.toggleText === 'string') {
        var toggleTextArr = o.toggleText.split('|');

        $item.on('click.toggleHintText', function () {
            $(this).attr('data-hint-text', toggleTextArr[$(this).attr('data-hint-text') == toggleTextArr[0] ? 1 : 0]);
            $hint.remove();
            showHint($(this));
        });
    }

    $item.on({
        mouseenter: function () {
            showHint($(this))
        },
        mouseleave: function () {
            $hint.remove();
        }
    })

};