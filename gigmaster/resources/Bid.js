function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
 
    return (((sign) ? '' : '-') + num + '.' + cents);
}
 
 
function quickValidate() {
    if (!!Page_Validators) {
        for (i = 0; i < Page_Validators.length; i++) {
            ValidatorValidate(Page_Validators[i], null, null);
        }
    }
 
    // check fields required for time periods
    var timeperiod = $("select[id$=ddlIncrements]").find(':selected').text();
 
    var $checkbox = $(':checkbox[id$=chkBreaks]');
    if (timeperiod == "per set") {
        // breaks must be defined
        if (!$checkbox.is(':checked')) {
            $('#breaksWarning').show();
            $('select[id$=ddlBreaksNumber]').change(quickValidate).addClass('error');
            $checkbox.val(true).triggerHandler('click');
        } else {
            $('select[id$=ddlBreaksNumber]').removeClass('error');
            $('#breaksWarning').hide();
        }
    } else {
        if ($('#breaksWarning').is(':visible')) {
            $checkbox.removeAttr('checked');
            $checkbox.change().triggerHandler('click');
        }
        $('#breaksWarning').hide();
        $('select[id$=ddlBreaksNumber]').removeClass('error');
    }
 
    var $performers = $('select[id$=ddlPerformers]');
    if (timeperiod == "per performer") {
        if (($performers.val() == 1) && !($performers.is('.touched'))) {
            $('#performersWarning').show();
            $performers.addClass('error');
            $performers.change(function () {
                $performers.addClass('touched');
                quickValidate();
            });
        } else {
            $('#performersWarning').hide();
            $performers.removeClass('error');
        }
    } else {
        $('#performersWarning').hide();
        $performers.removeClass('error');
    }
}
 
$(document).ready(function () {
    var performerid = $("#performerid").val();
    var eventdate = $("#eventdate").val();
    var afterevent = $("#eventdate30").val();
 
    var $yes = $("div[id$=yesBid]");
    var $no = $("div[id$=noBid]");
    var $more = $("div[id$=moreInfo]");
 
    var $amount = $("input[id$='txtAmount']");
    var $timeperiod = $("select[id$='ddlIncrements']");
    $timeperiod.change(function () {
        quickValidate();
    });
 
    var $deposit = $("input[id$='txtDeposit']");
    var $balance = $("#balancefee");
    var $balancedue = $("input[id$=txtBalanceDate]");
    var $depositbox = $(":checkbox[id$='chkDeposit']");
 
    $depositbox.change(function () {
        $('#fDepositOpts span.error').each(function () {
            ValidatorEnable(this, false);
            if ($depositbox.is(':checked')
                    && $(":radio[id$='rdoDepositRefundable']").is(':checked')
                    && (parseFloat($balance.html()) != 0)) {
                $(":radio[id$='rdoBalanceRefundable']").attr('checked', true).click();
                $(":radio[id$='rdoBalanceNonRefundable']").attr('disabled', true);
                $("#balanceRefundableWarning").css('display', 'block');
            } else {
                $(":radio[id$='rdoBalanceNonRefundable']").attr('disabled', false);
                $("#balanceRefundableWarning").css('display', 'none');
            }
        });
    });
 
    var $travelbox = $(":checkbox[id$='chkTravel']");
    var $travelamt = $("input[id$='txtTravelAmount']");
    var $breaksbox = $(":checkbox[id$='chkBreaks']");
    var $notesyes = $("textarea[id$='txtYes']");
    $notesyes.keydown(function () { $(this).change() });
 
    var $preview = $(":image[id$=ibtnPreview]");
    var $submit = $(":image[id$=ibtnYes]");
 
    // jump to folder "go" 
    $("input[id$=btnJumpTo]").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        document.location = '/cp/ArchiveGigRequests.asp?folderID='
            + $('select[id$=ddlJumpTo]').val();
    });
 
    // display note-to-self
    $(":checkbox[id$=chkNoteToSelf]").click(function () {
        if ($(this).is(':checked')) {
            $("div[id$=pnlNoteToSelf]").slideDown('fast');
        } else {
            $("div[id$=pnlNoteToSelf]").slideUp('fast');
        }
    });
 
    $(":radio[id$=rdoYes]").click(function () {
        $yes.slideDown();
        $no.slideUp();
        $more.slideUp();
    });
 
    $(":radio[id$=rdoNo]").click(function () {
        $no.slideDown();
        $yes.slideUp();
        $more.slideUp();
    });
 
    $(":radio[id$=rdoMaybe]").click(function () {
        $more.slideDown();
        $no.slideUp();
        $yes.slideUp();
    });
 
    $("#fTravelOpts :radio").change(function () {
        var $checkboxes = $('#travelReqsOpts :checkbox');
        if ($("#fTravelOpts :radio[id$=rdoTravelReqs]").is(':checked')) {
            $checkboxes.removeAttr('disabled');
            $checkboxes.next().css('color', null);
        } else {
            $checkboxes.attr('disabled', true);
            $checkboxes.next().css('color', 'gray');
        }
    });
 
    $("#travelReqsOpts :checkbox").change(function () {
        $("#fTravelOpts :radio").eq(2).attr('checked', true).change();
    });
 
    $(".additional-opts > :checkbox").bind('click', expandfield);
    $(".additional-opts > :radio").bind('click', expandcollapsefield);
    $(".additional-opts > :checkbox:checked").each(function () { $(this).triggerHandler('click') });
    $(".additional-opts > :radio:checked").each(function () { $(this).triggerHandler('click') });
 
    // Ensure that the balance is refundable if the deposit is refundable, and display a message about it.
    $(":radio[id$='rdoDepositRefundable']").bind('click', function () {
        $(":radio[id$='rdoBalanceRefundable']").attr('checked', true).click();
        $(":radio[id$='rdoBalanceNonRefundable']").attr('disabled', true);
        if (parseFloat($balance.html()) != 0) {
            $("#balanceRefundableWarning").css('display', 'block');
        }
    });
    $(":radio[id$='rdoDepositNonRefundable']").bind('click', function () {
        $(":radio[id$='rdoBalanceNonRefundable']").attr('disabled', false);
        $("#balanceRefundableWarning").css('display', 'none');
    });
    $(":radio[id$='rdoBalanceNonRefundable']").bind('click', function () {
        $("#balanceRefundableWarning").css('display', 'none');
    });
 
    if ($(":radio[id$='rdoDepositRefundable']").attr('checked') == true) {
        $(":radio[id$='rdoBalanceNonRefundable']").attr('disabled', true);
    }
    if ($(":radio[id$='rdoBalanceRefundable']").attr('checked') == true) {
        $("#balanceRefundableWarning").css('display', 'block');
    } else {
        $("#balanceRefundableWarning").css('display', 'none');
    }
 
    $(".savedresponseoptions > :radio").click(function () {
        var $radio = $(this);
        var responseid = $radio.val();
 
        // show the loading image in the appropriate place
        $('#ajax-loader, #savedresponse-error').remove();
 
        var loaderTimeoutID = setTimeout(function () {
            $radio.next().after($('<img>')
                .attr({
                    src: '/images/ajax-loader.gif',
                    id: 'ajax-loader'
                })
            )
        }, 50);  // show the loader if we're waiting a perceptible amount of time
 
        $.ajax({
            url: '/api/GetSavedResponse.ashx?performerID=' + performerid + '&responseID=' + responseid,
            type: 'GET',
            dataType: 'json',
            error: function () {
                clearSavedNResponse();
                clearSavedYResponse();
                // display an error message to the user
                $('#ajax-loader').remove();
                $radio.closest('div.grad').prepend($('<div>')
                    .attr('id', 'savedresponse-error')
                    .addClass('error')
                    .html("There was an error loading this saved response. "
                            + "The error has already been reported to GigMasters, "
                            + "but we encourage you to contact <a href='/contact.aspx'>customer support</a> "
                            + "if you require immediate assistance.")
                );
                return;
            },
            success: function (response) {
                // clear the loader
                clearTimeout(loaderTimeoutID);
                $('#ajax-loader').remove();
 
                //set fields in the response accordingly
                if (response.initialresponse == "Yes") {
                    $amount.val(response.amount === null ? "" : response.amount);
                    $timeperiod.val(response.timeperiodID);
                    $notesyes.val(response.notes);
                    $deposit.val(response.deposit);
                    $travelamt.val(response.travel);
 
                    //deposit
                    if (response.deposit != 0 && !$depositbox.is(':checked')) {
                        $depositbox.attr('checked', true).triggerHandler('click');
                    }
                    else if (response.deposit == 0 && $depositbox.is(':checked')) {
                        $depositbox.attr('checked', false).triggerHandler('click');
                    }
 
                    if (response.deposit != 0) {
                        $("[id$='rdlDeposit'] :radio[value=" + response.depositrefundable + "]").attr('checked', true);
                    }
 
                    //travel charge
                    if (response.travel != 0 && !$travelbox.is(':checked')) {
                        $travelbox.attr('checked', true).triggerHandler('click');
                    }
                    else if (response.travel == 0 && $travelbox.is(':checked')) {
                        $travelbox.attr('checked', false).triggerHandler('click');
                    }
 
                    if (response.travel != 0) {
                        $(":radio[id$='rdoTravelAmount']").attr('checked', true).triggerHandler('click');
                    }
 
                    //balance
                    $amount.triggerHandler('keyup');
 
                    //members
                    if (response.members != 0) {
                        $("select[id$='ddlPerformers']").val(response.members);
                    }
 
                    //breaks
                    if (response.breaksnumber != 0 && !$breaksbox.is(':checked')) {
                        $breaksbox.attr('checked', true).triggerHandler('click');
                    }
                    else if (response.breaksnumber == 0 && $breaksbox.is(':checked')) {
                        $breaksbox.attr('checked', false).triggerHandler('click');
                    }
 
                    if (response.breaksnumber != 0) {
                        $("select[id$='ddlBreaksNumber']").val(response.breaksnumber);
                        $("select[id$='ddlBreaksLength']").val(response.breakslength);
                    }
 
                    RecalculateDollarAmounts();
                }
                else {
                    $("textarea[id$='txtNo']").val(response.notes);
                    $("select[id$='ddlNoReasons']").val(response.responsecode);
                }
 
                quickValidate();
            }
        });
    });
 
 
    function clearSavedNResp() {
        $("textarea[id$=txtNo]").val('');
        $("select[id$=ddlNoReasons]").val('');
    }
 
    function clearSavedYResponse() {
        $amount.val('');
        $timeperiod.val('');
        $notesyes.val('');
        $deposit.val('');
        $travelamt.val('');
 
        //deposit
        $depositbox.attr('checked', false).triggerHandler('click');
 
        //travel charge
        $travelbox.attr('checked', false).triggerHandler('click');
 
        //balance
        $amount.triggerHandler('keyup');
 
        //members
        $("select[id$='ddlPerformers']").val('');
 
        //breaks
        $breaksbox.attr('checked', false).triggerHandler('click');
    }
 
    function clearSavedNResponse() {
        $("textarea[id$='txtNo']").val('');
        $("select[id$='ddlNoReasons']").val('');
    }
 
 
    // toggle display of save respond name 
    $("div[id$=pnlSaveResponse] :checkbox").change(function () {
        if ($(this).is(":checked")) {
            $("#saveResponseFoldout").slideDown("fast");
        } else {
            $("#saveResponseFoldout").slideUp("fast");
        }
    });
 
    if ($("div[id$=pnlSaveResponse] :checkbox").is(":checked")) {
        $("#saveResponseFoldout").show();
    } else {
        $("#saveResponseFoldout").hide();
    }
 
    function expandfield() {
        var dirtyname = $(this).attr('id').split('_');
        var fset = dirtyname[dirtyname.length - 1];
 
        fset = fset.replace('chk', 'f');
        fset += 'Opts';
 
        if ($(this).is(':checked')) {
            $("#" + fset).slideDown();
        }
        else {
            $("#" + fset).slideUp();
        }
    }
 
    function expandcollapsefield() {
        var dirtyid = $(this).attr('id').split('_');
        var expandfset = dirtyid[dirtyid.length - 1];
 
        // the one to expand
        expandfset = expandfset.replace('rdo', 'f');
        expandfset += 'Opts';
 
        //get names of other fieldsets in this radiobuttonlist
        var dirtyname = $(this).attr('name').split('$');
        var collapseradios = dirtyname[dirtyname.length - 1];
 
        $(":radio[name$=" + collapseradios + "]").each(function () {
            var dirtycid = $(this).attr('id').split('_');
            if (dirtyid[dirtyid.length - 1] != dirtycid[dirtycid.length - 1]) {
                var collapsefset = dirtycid[dirtycid.length - 1];
                collapsefset = collapsefset.replace('rdo', 'f');
                collapsefset += 'Opts';
 
                if ($("#" + collapsefset).is("fieldset")) {
                    $("#" + collapsefset).slideUp();
                }
                else {
                    $("#" + collapsefset).hide();
                }
            }
        });
 
        if ($(this).is(':checked')) {
            if ($("#" + expandfset).is("fieldset")) {
                $("#" + expandfset).slideDown();
            }
            else {
                $("#" + expandfset).show();
            }
        }
    }
 
    //jquery ui datepicker
    $("input[id$=txtDepositDate]").datepicker({
        onSelect: function (dateText, inst) {
            $balancedue.datepicker("option", "minDate", dateText);
            $("input[id$=txtRefundableDate]").datepicker("option", "minDate", dateText);
            quickValidate();
        },
        showButtonPanel: true,
        minDate: +1,
        maxDate: eventdate,
        showOtherMonths: true
    });
    $("input[id$=txtDepositDate]").change(function () {
        $('input[id$=txtDepositDate]').datepicker('option', 'maxDate', eventdate);
        $('input[id$=txtBalanceDate]').datepicker('option', 'minDate', $('input[id$=txtDepositDate]').datepicker('getDate'));
        $('input[id$=txtRefundableDate]').datepicker('option', 'minDate', $('input[id$=txtDepositDate]').datepicker('getDate'));
    });
 
    $("input[id$=txtExpire]").datepicker({
        showButtonPanel: true,
        minDate: +1,
        maxDate: eventdate,
        showOtherMonths: true
    });
    $("input[id$=txtExpire]").change(function () {
        $('input[id$=txtExpire]').datepicker('option', 'minDate', +1);
        $('input[id$=txtExpire]').datepicker('option', 'maxDate', eventdate);
    });
 
    $("input[id$=txtRefundableDate]").datepicker({
        onSelect: function (dateText, inst) {
            var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
            var minBalRefDate_title = "the deposit refundable date ";
            if (+minBalRefDate == +$('input[id$=txtBalanceDate]').datepicker('getDate')) { minBalRefDate_title = "the balance due date "; }
            $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'minDate', minBalRefDate);
            if (($('input[id$=txtRefundableDate]').datepicker('getDate') == null)
                    && ($('input[id$=txtBalanceDate]').datepicker('getDate') == null)) {
                $('#span_minBalRefDate').html('___');
            } else {
                $('#span_minBalRefDate').html(minBalRefDate_title + minBalRefDate.format('d', 1033));
            }
        },
        showButtonPanel: true,
        minDate: $('input[id$=txtDepositDate]').datepicker('getDate'),
        maxDate: eventdate,
        showOtherMonths: true
    });
    $("input[id$=txtRefundableDate]").change(function () {
        $('input[id$=txtRefundableDate]').datepicker('option', 'minDate', $('input[id$=txtDepositDate]').datepicker('getDate'));
        $('input[id$=txtRefundableDate]').datepicker('option', 'maxDate', eventdate);
        var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
        var minBalRefDate_title = "the deposit refundable date ";
        if (+minBalRefDate == +$('input[id$=txtBalanceDate]').datepicker('getDate')) { minBalRefDate_title = "the balance due date "; }
        $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'minDate', minBalRefDate);
        if (($('input[id$=txtRefundableDate]').datepicker('getDate') == null)
                && ($('input[id$=txtBalanceDate]').datepicker('getDate') == null)) {
            $('#span_minBalRefDate').html('___');
        } else {
            $('#span_minBalRefDate').html(minBalRefDate_title + minBalRefDate.format('d', 1033));
        }
    });
 
    $balancedue.datepicker({
        onSelect: function (dateText, inst) {
            var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
            var minBalRefDate_title = "the deposit refundable date ";
            if (+minBalRefDate == +$('input[id$=txtBalanceDate]').datepicker('getDate')) { minBalRefDate_title = "the balance due date "; }
            $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'minDate', minBalRefDate);
            if (($('input[id$=txtRefundableDate]').datepicker('getDate') == null)
                    && ($('input[id$=txtBalanceDate]').datepicker('getDate') == null)) {
                $('#span_minBalRefDate').html('___');
            } else {
                $('#span_minBalRefDate').html(minBalRefDate_title + minBalRefDate.format('d', 1033));
            }
        },
        showButtonPanel: true,
        showOtherMonths: true,
        minDate: $('input[id$=txtDepositDate]').datepicker('getDate'),
        maxDate: afterevent
    });
    $balancedue.change(function () {
        $('input[id$=txtBalanceDate]').datepicker('option', 'minDate', $('input[id$=txtDepositDate]').datepicker('getDate'));
        $('input[id$=txtBalanceDate]').datepicker('option', 'maxDate', afterevent);
        var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
        var minBalRefDate_title = "the deposit refundable date ";
        if (+minBalRefDate == +$('input[id$=txtBalanceDate]').datepicker('getDate')) { minBalRefDate_title = "the balance due date "; }
        $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'minDate', minBalRefDate);
        if (($('input[id$=txtRefundableDate]').datepicker('getDate') == null)
                && ($('input[id$=txtBalanceDate]').datepicker('getDate') == null)) {
            $('#span_minBalRefDate').html('___');
        } else {
            $('#span_minBalRefDate').html(minBalRefDate_title + minBalRefDate.format('d', 1033));
        }
    });
 
    $("input[id$=txtBalanceRefundableDate]").datepicker({
        showButtonPanel: true,
        minDate: arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]),
        showOtherMonths: true
    });
    $("input[id$=txtBalanceRefundableDate]").change(function () {
        var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
        $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'minDate', minBalRefDate);
    });
 
    if ($deposit.val() == 0 || $('input[id$=rdoDepositNonRefundable]').is(':checked')) {
        $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'maxDate', eventdate);
    }
    $('input[id$=txtDeposit], input[id$=rdoDepositNonRefundable], input[id$=rdoDepositRefundable]').change(function () {
        if ($deposit.val() == 0 || $('input[id$=rdoDepositNonRefundable]').is(':checked')) {
            $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'maxDate', eventdate);
        } else {
            $('input[id$=txtBalanceRefundableDate]').datepicker('option', 'maxDate', null);
        }
    });
 
    $('input[id$=rdoBalanceRefundable]').click(function () {
        if ($('input[id$=txtBalanceRefundableDate]').datepicker('getDate') == null) {
            var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
            $('input[id$=txtBalanceRefundableDate]').datepicker('setDate', minBalRefDate);
        }
    });
 
    // Set the initial refundable warning date spans.
    var minBalRefDate = arrayMaximum([$('input[id$=txtRefundableDate]').datepicker('getDate'), $('input[id$=txtBalanceDate]').datepicker('getDate')]);
    var minBalRefDate_title = "the deposit refundable date ";
    if (+minBalRefDate == +$('input[id$=txtBalanceDate]').datepicker('getDate')) { minBalRefDate_title = "the balance due date "; }
    if (($('input[id$=txtRefundableDate]').datepicker('getDate') == null)
            && ($('input[id$=txtBalanceDate]').datepicker('getDate') == null)) {
        $('#span_minBalRefDate').html('___');
    } else {
        $('#span_minBalRefDate').html(minBalRefDate_title + minBalRefDate.format('d', 1033));
    }
 
 
    //
    // Dollar Calculations
    //
 
    $(':input.trigger-balance-recalc')
        .change(RecalculateDollarAmounts);
    $(':text.trigger-balance-recalc')
        .keyup(RecalculateDollarAmounts);
    $(':radio.trigger-balance-recalc, .trigger-balance-recalc > :checkbox, .trigger-balance-recalc :radio')
        .click(RecalculateDollarAmounts);
 
    var timePeriodStrategies = {
        "^for .*$": function (amt) {
            return amt;
        },
        "^per service$": function (amt) {
            var numServices = $('.vendorService').length;
            return amt * numServices;
        },
        "^per (performer|dancer)$": function (amt) {
            var numPerformers = $('select[id$=ddlPerformers]').val();
            return amt * numPerformers;
        },
        "^per set$": function (amt) {
            var numBreaks = 0;
            if ($breaksbox.is(':checked')) {
                numBreaks = $('select[id$=ddlBreaksNumber]').val();
            } else {
                // add validation message
                $breaksbox.attr('checked', 'true').triggerHandler('click');
            }
            return amt * (1 + Number(numBreaks));
        },
        "^per hour$": function (amt) {
            var eventduration = Number($("input[id$=hdnDurationInHours]").val());
            if (isNaN(eventduration)) {
                return 0.0;  // TODO: validation error here?
            }
            return eventduration * amt;
        },
        "^per (show|night)$": function (amt) {
            return amt;
        }
    };
 
    // determine the correct balance
    function CalculateAmounts() {
        var bal = 0, total = 0, dep = 0, trv = 0;
        var amt = $amount.val();
 
        if ($depositbox.is(':checked')) {
            dep = $deposit.val();
        };
 
        if ($travelbox.is(':checked') && $(':radio[id$=rdoTravelAmount]').is(':checked')) {
            trv = $travelamt.val();
        };
 
        amt = Number(amt.toString().replace(/\$|\,/g, ''));
        dep = Number(dep.toString().replace(/\$|\,/g, ''));
        trv = Number(trv.toString().replace(/\$|\,/g, ''));
 
        amt = isNaN(amt) ? 0 : amt;
        dep = isNaN(dep) ? 0 : dep;
        trv = isNaN(trv) ? 0 : trv;
 
        var period = $timeperiod.find(":selected").text();
        $.each(timePeriodStrategies, function (pattern, strategy) {
            if (period.search(pattern) > -1) {
                total = strategy(amt);
                return false;   // break
            }
            return true;        // continue
        });
 
        bal = total - dep + trv;
 
        CheckDepositLimit();
        CheckBalanceLimit();
 
        // If the blanace is $0, then hide the balance refundable message.
        if (bal == 0) {
            $("#balanceRefundableWarning").css('display', 'none');
        } else if ($depositbox.is(':checked')
                && $(":radio[id$='rdoDepositRefundable']").is(':checked')
                && (parseFloat($balance.html()) != 0)) {
            $("#balanceRefundableWarning").css('display', 'block');
        }
 
        var newBal = formatCurrency(bal);
        if ($balance.html() != newBal) {
            $balance.html(newBal);
            $balance.css('opacity', .3);
            $balance.animate({
                opacity: 1
            }, 1000);
        }
 
        if ($amount.val() == "") {
            // unbookable
            $balance.html('&nbsp;&mdash;&nbsp;');
        }
 
        // per set/performance notices
 
        $('.amountExplanation').hide();
 
        if (period == 'per set') {
            var numBreaks = Number($('select[id$=ddlBreaksNumber]').val());
            $('#perSetExplanation').show().find('.num').each(function (i) {
                this.innerHTML = numBreaks + i;
                $(this).nextAll('.plural').eq('0').html((numBreaks + i) == 1 ? '' : 's');
            });
        } else if (period == 'per performer') {
            $('#perPerformerExplanation').show().find('.num').html($('select[id$=ddlPerformers]').val());
        } else if (period == 'per hour') {
            var eventduration = Number($("input[id$=hdnDurationInHours]").val());
            $('#perHourExplanation')
                .show()
                .find('.num')
                    .html(eventduration)
                    .nextAll('.plural').eq('0')
                        .html(eventduration == 1 ? '' : 's');
        }
 
        return total;
    }
 
    function CheckDepositLimit() {
        var dep = Number($deposit.val().replace(/\$|\,/g, ''));
        dep = isNaN(dep) ? 0 : dep;
 
        if (dep > 2000 && ($('input[id$=rdoEnableDepositPayments]').length == 0
                          || $('input[id$=chkEnableOnlinePayments]').is(':checked')
                          )
        ) {
            $('#depositWarning').show();
        } else {
            $('#depositWarning').hide();
        }
    }
    $('input[id$=chkEnableOnlinePayments]').click(function () {
        CheckDepositLimit();
        CheckBalanceLimit();
    });
 
    function CheckBalanceLimit() {
        var bal = Number($balance.html().replace(/\$|\,/g, ''));
        bal = isNaN(bal) ? 0 : bal;
 
        if (bal > 5000 && ($('input[id$=chkEnableOnlinePayments]').length == 0
                          || ($('input[id$=chkEnableOnlinePayments]').is(':checked') && $('input[id$=rdoEnableAllPayments]').length == 0)
                          || ($('input[id$=chkEnableOnlinePayments]').is(':checked') && $('input[id$=rdoEnableAllPayments]').is(':checked'))
                          )
        ) {
            $('#balanceWarning').show();
        } else {
            $('#balanceWarning').hide();
        }
    }
    $('input[id$=rdoEnableDepositPayments]').click(function () {
        CheckBalanceLimit();
    });
    $('input[id$=rdoEnableAllPayments]').click(function () {
        CheckBalanceLimit();
    });
 
    // determine the bid fee
    function CalculateBidFee(amount) {
        if (!$("#bidfee").length) {
            // bid fee is n/a
            return;
        }
 
        var elapsedtime = $("#elapsedtime").val();
        var pricerange;
 
        if (amount < 499) {
            pricerange = 0;
        }
        else if (amount < 999) {
            pricerange = 1;
        }
        else if (amount < 1999) {
            pricerange = 2;
        }
        else {
            pricerange = 3;
        }
 
        var bidfee = 0;
        if (elapsedtime <= 1440) {
            switch (pricerange) {
                case 0:
                    bidfee = "4.50";
                    break;
                case 1:
                    bidfee = "5";
                    break;
                case 2:
                    bidfee = "5.50";
                    break;
                case 3:
                    bidfee = "6";
                    break;
            }
        }
        else if (elapsedtime <= 2880) {
            switch (pricerange) {
                case 0:
                    bidfee = "4.25";
                    break;
                case 1:
                    bidfee = "4.75";
                    break;
                case 2:
                    bidfee = "5.25";
                    break;
                case 3:
                    bidfee = "5.75";
                    break;
            }
        }
        else {
            switch (pricerange) {
                case 0:
                    bidfee = "4";
                    break;
                case 1:
                    bidfee = "4.50";
                    break;
                case 2:
                    bidfee = "5";
                    break;
                case 3:
                    bidfee = "5.50";
                    break;
            }
        }
        $("#bidfee").html("$" + bidfee);
    }
 
    function RecalculateDollarAmounts() {
        var total = CalculateAmounts();
        CalculateBidFee(total);
 
        if ($depositbox.is(':checked')) {
            $('#balanceTypeLabel').text("Balance");
            $('#balanceTypeLabel2').text("balance");
        } else {
            $('#balanceTypeLabel').text("Payment in full");
            $('#balanceTypeLabel2').text("payment");
        }
    }
 
 
    //
    // Variety Acts
    //
 
    function RelabelVarietyServices() {
        // correct pluralization
        var $label = $('.performerTypeLabel');
        if ($("select[id$=ddlPerformers]").val() == 1) {
            if ($label.text().search(/dancers?/) > -1) {
                $label.text("dancer");
            } else {
                $label.text("performer");
            }
        } else {
            if ($label.text().search(/dancers?/) > -1) {
                $label.text("dancers");
            } else {
                $label.text("performers");
            }
        }
 
        // relabel the performer numbers
        $('.performerNumber').each(function (i) {
            $(this).text(i + 1);
        });
    }
 
    $("select[id$=ddlPerformers]").change(function () {
        var $performerservices = $("div[id$=pnlPerformerServices]").first();
        var total = $(this).val();
        var current = $("div.performer-services").length;
 
        if ($("div.performer-services").length) {
            if (current < total) {
                for (var i = current; i < total; i++) {
                    // duplicate the existing services interface
                    var $newservice = $performerservices.clone()
                        .attr("id", "performerservice" + Number(i + 1));
 
                    var $serviceList = $("ul", $newservice);
 
                    // undo the .NET naming conventions
                    $serviceList.find("select")
                        .attr({
                            id: "",
                            name: "perf" + Number(i) + "Services_Other"
                        });
 
                    $serviceList.find(":checkbox")
                        .attr("name", "perf" + Number(i) + "Services");
 
                    $newservice.find("span[id$=valPerformerServices]").remove();
 
                    $newservice.find(".remove-placeholder").append(
                        " &nbsp;<a href=\"#\" class=\"remove-variety-service\">&ndash; Remove Service</a>");
 
                    $("div[id$=pnlPerformers]").append($newservice);
                }
            }
            else {
                for (var i = current; i >= total; i--) {
                    $("#performerservice" + Number(i + 1)).remove();
                    $("div[id$=" + Number(i) + "_pnlPerformerServices]").remove();
                }
            }
            $('select[id$=ddlPerformers]').val(total);
        }
 
        RelabelVarietyServices();
    });
 
 
    $("a.remove-variety-service").live('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).closest('div.performer-services').remove();
        $('select[id$=ddlPerformers]').val($('div.performer-services').length);
        RelabelVarietyServices();
        RecalculateDollarAmounts();
    });
 
    // show other services dropdown when the "other" box is checked
    $(".performer-services .other input[type=checkbox]").live('change', function () {
        var $checkbox = $(this);
        var $li = $checkbox.closest('li');
 
        if ($checkbox.is(':checked')) {
            $li.find('select').show();
            $li.find('.label_text').html("Other:");  // add a colon
        }
        else {
            $li.find('select').hide();
            $li.find('.label_text').html("Other");
        }
    }).change();   // run on page load
 
 
    //
    // Vendor Services
    //
 
    $("#lnkAddService").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
 
        var $newservice = $("div.vendorService").first().clone();
        var newVendorSlot = $("div.vendorService").length;
 
        $newservice.find('.serviceLabel')
            .text('This quote also includes')
            .css('font-weight', 'normal');
 
        $newservice.find("span[id$=valVendorServices]").remove();
 
        $newservice.find("select[name$=vendorServiceQuantity]")
            .attr("name", "vendorServiceQuantity_" + newVendorSlot)
            .attr("id", "");
        $newservice.find("select[name$=vendorServiceCategory]")
            .attr("name", "vendorServiceCategory_" + newVendorSlot)
            .attr("id", "");
 
        $newservice.append(" <a href=\"#\" class=\"remove-vendor-service\">&ndash; Remove Service</a>");
 
        $newservice.insertAfter($('div.vendorService').last());
 
        RecalculateDollarAmounts();
    });
 
    $("a.remove-vendor-service").live('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).closest('div.vendorService').remove();
 
        RecalculateDollarAmounts();
    });
 
    function RecalculateVendorServices() {
        // pluralize services quantity is greater than 1
        $('.vendorService').each(function () {
            var $service = $(this);
            var qty = $service.find('select[name$=vendorServiceQuantity]').val();
 
            var $singular = $service.find('select.singular');
            var $plural = $service.find('select.plural');
 
            $singular.add($plural).each(function () {
                this.name = this.name.replace(/^_/, '');
            });
 
            // undo .NET naming
            $plural.attr('name', $singular.attr('name'));
 
            // favor the value of the visible select input
            if ($plural.is(':visible')) {
                $singular.val($plural.val());
            } else {
                $plural.val($singular.val());
            }
 
            // mung the name of the inactive select, so its values are ignored
            if (qty == 1) {     // singular
                $plural.attr('name', '_' + $plural.attr('name')).hide();
                $singular.show();
            } else {            // plural
                $singular.attr('name', '_' + $singular.attr('name')).hide();
                $plural.show();
            }
        });
    }
 
    $('select[name$=vendorServiceQuantity]').change(function () {
        RecalculateVendorServices();
    });
 
 
    // all systems go
    if ($yes.length) {
        RecalculateDollarAmounts();
        RecalculateVendorServices();
    }
 
});