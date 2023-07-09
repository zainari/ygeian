
$(function() {

            $(".cntmobile").intlTelInput({
            allowExtensions: true,
            autoFormat: false,
            autoHideDialCode: true,
            autoPlaceholder: true,
            dropdownContainer: $("body"),
            //excludeCountries: ["us"],
            geoIpLookup: function(callback) {

            $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
            });

            },
            initialCountry: "auto",
            nationalMode: false,
            numberType: "MOBILE",
            onlyCountries: ['in', 'gr','pk'],
            preferredCountries: ['cn', 'jp'],
            utilsScript: base_url+"js/utils.js"
            });
            getpatienNotificaton();
            setInterval(function() {
            newnotification();
            }, 30000);

    newnotification();
    getpatienNotificaton();

            $('#search-form').validate({
            rules:{
            'txt_search':{required:true},
            },
            messages:{
            'txt_search':{required:'Please Insert Something To Search.'},
            },
            });


            $('.addbtn').on('click', function(){
            addbtndisable(this);
            });

            function addbtndisable (e){
            e.disabled = true;
            }


/*datepicker*/
	$( ".datepicker" ).datepicker({
	  dateFormat:'yy-mm-dd',
      changeMonth: true,
	  changeYear: true,
	  yearRange:"-115Y:+0Y",
	  numberOfMonths: 1,
	  maxDate:'today'
	});

	/*code for remove data and error class on data-dismiss btn click*/
            $('#myModal').on('hidden.bs.modal', function (e) {
            $(this).find('input').not('[type="submit"],[type="reset"],[type="button"],[type="hidden"]').val('').end();
            $(this).find('textarea,select').val('').end();
            $(this).find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
            $(this).find("input[type=submit], input[type=button]").prop("disabled", false).end();
            $("#demo-files").html('');
            $("input[name=filename]").val('');
            $('label.error').hide();
            });

            $('#pinModal').on('hidden.bs.modal', function (e) {

            $(this).find('input').not('[type="submit"],[type="reset"],[type="button"],[type="hidden"]').val('').end();
            $(this).find("input[type=submit], input[type=button]").prop("disabled", false).end();
            $('label.error').hide();
            $('#pinModal #loading1').hide();

            });

/* code for exam comments*/
   var showChar =200;  // How many characters are shown by default
   var ellipsestext = "...";
   var moretext = "more";
   var lesstext = "less";

$('.td_colomn_comment').each(function() {
       var content = $(this).html();
        if(content.length > showChar) {
           var c = content.substr(0, showChar);
           var h = content.substr(showChar, content.length - showChar);
           var txt = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span style="display:none;">' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
           $(this).html(txt);
       }
   });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
        } else {
        $(this).addClass("less");
        $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });


    $("#txt_search").autocomplete({
            source:  function( request, response ) {
            var chk =request.term+'#';
            $('input[name="searchTerm"]:checked').each(function() {
            chk+= this.value+',';
            });
            $.getJSON( base_url+"AllDataControl/get_search", {
            term: chk
            }, response);
          },

    select:function(event, ui)
    {
            var childid='' , data  = eval(ui);
            if($("#childaddreq").val().length > 0){

              childid = '/'+$("#childaddreq").val();

            }

            if(data.item.userid!= 0 && data.item.userid!= '' && data.item.userid!= undefined )
            {
              window.location.href= base_url+'mydoctor/profile/'+data.item.userid+''+childid;
            }

            if(data.item.cuserid!=0 && data.item.cuserid!=''  && data.item.cuserid!= undefined )
            {

             window.location.href= base_url+'mycompany/profile/'+data.item.cuserid;
            }

            if(data.item.huserid!=0 && data.item.huserid!='' && data.item.huserid!= undefined )
            {

              window.location.href= base_url+'myhospital/profile/'+data.item.huserid;
            }

            if(data.item.puserid!=0 && data.item.puserid!='' && data.item.puserid!= undefined  )
            {

              window.location.href= base_url+'mypharmacy/profile/'+data.item.puserid;
            }

            if(data.item.duserid!=0 && data.item.duserid!='' && data.item.duserid!= undefined  )
            {

            window.location.href= base_url+'mydiagnostic/profile/'+data.item.duserid;
            }


	},


   create: function () {

   $(this).data('ui-autocomplete')._renderItem = function( ul, item ) {

        var inner_html='';
        var inner_html2='';

                if( item.name ){
               // var mtype = 'Dr.'
                inner_html = '<li style="display:inline-block;background-color:#40b4e7 !important; width:100%; padding:1em; position: relative;"><a><div class="search_label" style="font-size: 11px; font-weight: bold;color: white;float: left; width:80%;">'+item.name+'</div></a></li>';
                }

                if(item.cname){
                var mtype= 'Company';
                inner_html = '<li style="display:inline-block;background-color:#40b4e7 !important; width:100%; padding:1em; position: relative;"><a><div class="search_label" style="font-size: 11px; font-weight: bold;color: white;float: left; width:80%; ">'+item.cname+' , '+mtype+'</div></a></li>';
                }

                if(item.hname){
                var mtype= 'Hospital';
                inner_html = '<li style="display:inline-block;background-color:#40b4e7 !important; width:100%; padding:1em; position: relative;"><a><div class="search_label" style="font-size: 11px; font-weight: bold;color: white;float: left; width:80%; ">'+item.hname+' , '+mtype+'</div></a></li>';
                }

                if(item.pname ){
                var mtype= 'Pharmacy';
                inner_html = '<li style="display:inline-block;background-color:#40b4e7 !important; width:100%; padding:1em; position: relative;"><a><div class="search_label" style="font-size: 11px; font-weight: bold;color: white;float: left; width:80%; ">'+item.pname+' , '+mtype+'</div></a></li>';
                }

                if(item.dname){
                 var mtype= 'Diagnostic';
                inner_html = '<li style="display:inline-block;background-color:#40b4e7 !important; width:100%; padding:1em; position: relative;"><a><div class="search_label" style="font-size: 11px; font-weight: bold;color: white;float: left; width:80%; ">'+item.dname+' , '+mtype+'</div></a></li>';
                }


             return $(inner_html)
            .data( "item.autocomplete", item )
            .appendTo( ul );


	     };
       }
    });



});




if(language == 'english'){

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zA-Zα-ωΑ-Ωίϊΐόάέύϋΰήώ\s]+$/i.test(value);
}, "Please Insert Alphabet Only.");

jQuery.validator.addMethod("fullemail", function(value, element) {
    return this.optional(element) || /^((?!.*\.{2})(?!_*\_{2})[a-zA-Z0-9_\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(value);
}, "Not a Valid Email");

jQuery.validator.addMethod("digitonly", function(value, element) {
    return this.optional(element) || /^([0-9])+$/i.test(value);
}, "Please Insert Digits Only.");

jQuery.validator.addMethod("zipcode", function(value, element) {
    return this.optional(element) || /^([A-Zα-ωΑ-Ω 0-9])+$/i.test(value);
}, "Not a Valid Zip Code.");

jQuery.validator.addMethod("passport", function(value, element) {
    return this.optional(element) || /^([a-zA-Zα-ωΑ-Ωίϊΐόάέύϋΰήώ0-9\s])+$/i.test(value);
}, "Enter a valid Id Or Passport Number.");


jQuery.validator.addMethod("fdigitonly", function(value, element) {
    return this.optional(element) || /^\d*(\.\d{0,2})?$/ .test(value);
}, "Please Insert Integer Or Float Digits Only.");

jQuery.validator.addMethod("phonedigitonly", function(value, element) {
    return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(value);
}, "Please Nnsert Valid Phone Number.");

}else if( language != '' && language == 'greek'){

    jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zA-Zα-ωΑ-Ωίϊΐόάέύϋΰήώ\s]+$/i.test(value);
}, "Παρακαλώ εισάγετε μόνο αλφάβητο.");

jQuery.validator.addMethod("fullemail", function(value, element) {
    return this.optional(element) || /^((?!.*\.{2})(?!_*\_{2})[a-zA-Z0-9_\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(value);
}, "Δεν είναι μια έγκυρη διεύθυνση ηλεκτρονικού ταχυδρομείου");

jQuery.validator.addMethod("digitonly", function(value, element) {
    return this.optional(element) || /^([0-9])+$/i.test(value);
}, "Παρακαλώ εισάγετε μόνο ψηφία.");

jQuery.validator.addMethod("zipcode", function(value, element) {
    return this.optional(element) || /^([A-Zα-ωΑ-Ω0-9\s])+$/i.test(value);
}, "Δεν είναι έγκυρο ταχυδρομικό κώδικα.");

jQuery.validator.addMethod("passport", function(value, element) {
    return this.optional(element) || /^([A-Zα-ωΑ-Ω0-9\s])+$/i.test(value);
}, "Εισάγετε μια έγκυρη ταυτότητα ή διαβατήριο αριθμό.");

jQuery.validator.addMethod("fdigitonly", function(value, element) {
    return this.optional(element) || /^\d*(\.\d{0,2})?$/ .test(value);
}, "Παρακαλώ εισάγετε μόνο ακέραιες ή float ψηφία.");

jQuery.validator.addMethod("phonedigitonly", function(value, element) {
    return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(value);
}, "Παρακαλώ εισάγετε έγκυρο αριθμό του κινητού.");

}




function setmobile(){
	var mobile = $('#mobile').val();
	if(mobile!='')
	{
		$('#mobile').addClass('required');
		$('#email').val('');
		$('#email').removeClass('required');
	}

}

function checksession(){
  setInterval(function(){
      $.ajax({
		   type:'get',
		   url:base_url+'AllDataControl/checksession',
		   success:function(rtdata)
			   {
                   var rdata = $.trim(rtdata);
                   if(rdata==1)
                       {
                           window.location.href= base_url+'logout';
                       }
               }
          });
                        },30000);
}

function setemail(){
	var email = $('#email').val();
	if(email!='')
	{
		$('#email').addClass('required');
		$('#mobile').val('');
		$('#mobile').removeClass('required');
	}
}

function DeleteRow(divid,cnt){
	$("#"+divid+"_"+cnt).remove();
}

function addchild(divid,subid,divname,plvalue){
	var count=parseInt($('#'+divid).children().length);
	$("#"+divid).append("<div id='"+subid+"_"+count+"'><input type='text' class='form-control form-input required' placeholder='"+plvalue+"' style='float:left; width:92%; margin-bottom: 5px;' name='"+divname+"[]' id='"+divname+"_"+count+"'><button type='button' class='btn btn-info btn-lg' id='del-but' style='float:right;' onclick='DeleteRow(\""+subid+"\","+count+")'><i class='fa fa-times'></i></button><label id='"+divname+"_"+count+"-error' class='error' for='"+divname+"_"+count+"' style='display:none;'></label></div>");


}

function selectstate(id,column,table,divid){
	$.ajax({
		   type:'post',
		   url:base_url+'AllDataControl/changestate',
		   data:'id='+id+'&column='+column+'&table='+table,
			   success:function(rtdata)
			   {
				 var myhtml='';
				 var alldata = eval(rtdata);
				 if(divid=='state')
				 {
					 myhtml+='<option value="">Select State</option>';
					 for(var i=0;i<alldata.length;i++)
					 {
						 myhtml+='<option value="'+alldata[i].stateid+'">'+alldata[i].statename+'</option>';
					 }
				 }
				 else
				 {
					 myhtml+='<option value="">Select City</option>';
					 for(var i=0;i<alldata.length;i++)
					 {
						 myhtml+='<option value="'+alldata[i].cityid+'">'+alldata[i].cityname+'</option>';
					 }
				 }
				 $('#'+divid).html(myhtml);
			   }
		   });
}

function selectuser(typeid){
	$('#msg').hide();
	var selected = $("input[type='radio'][name='ustype']:checked");
	var utype = selected.val();

	if(utype==''|| utype==undefined)
	{
	  $('#msg').show().addClass('alert alert-danger').html('Please select user');
	  return false;
	}
	else
	{
		window.location.href=base_url+''+typeid+'/'+utype;
	}
}

function bookmydoctor(did){
	$.ajax({
		   type:'post',
		   url:base_url+'patient/bookmydoctor',
		   data:'did='+did,
			   success:function(rtdata)
			   {
					alert('Your appointment is fixed.');
			   }
		   });
}

function managemydoctor(did, dstatus,userid,type){
    if($('#mydoctorpage_input').length>0)
    {
       var tabid= $('#mydoctorpage_input').val();
       var permission = $(tabid +' input[type=radio][name=permission'+did+']:checked').val();
    }
    else{
         var permission = $('input[type=radio][name=permission'+did+']:checked').val();
    }

    $('#anchor-adddoctor>button').attr('disabled','disabled');


	$('#mainloader').show();
	var dhtml='';

	$.ajax({
		   type:'post',
		   url:base_url+'patient/managemydoctor',
		   data:'doctorid='+did+'&activetype='+dstatus+'&permission='+permission+'&userid='+userid+'&type='+type,
			   success:function(rtdata)
			   {
				 $('#mainloader').hide();
				 rtdata = rtdata.trim();
				 if(dstatus=='active')
				 {
					 if(rtdata=='suc')
					 {
						 $('#msg').show().addClass('alert alert-success').html('Pin send to doctor.');
						 dhtml+='<a href="javascript:void(0);" onclick="managemydoctor('+did+',\'deactive\','+userid+');"><button type="button" class="btn success-but">Deactive</button></a><a href="'+base_url+'AllDataControl/doctor/'+did+'/page"><button type="button" class="btn see-profile"> See Profile </button></a>';
						 $('#mydoctor_'+did).html(dhtml);
                         window.location.reload();
					 }
					 else if(rtdata=='errmail')
					 {
						 $('#msg').show().addClass('alert alert-danger').html('!Error, unable to send email to doctor.');
					 }
					 else
					 {
						 $('#msg').show().addClass('alert alert-danger').html('!Error, Something went wrong.');
					 }
				 }
				 else if(dstatus=='deactive')
				 {

                        if(rtdata=='suc')
                        {
                        $('#msg').show().addClass('alert alert-success').html('This doctor has been deactivated.');
                        dhtml ='<a  href="javascript:void(0);" onclick="managemydoctor('+did+',\'active\','+userid+');"><button type="button" class="btn danger-but">Active and sent pin</button></a> <a href="'+base_url+'AllDataControl/doctor/'+did+'/page"><button type="button" class="btn see-profile"> See Profile </button></a>';

                        $('#mydoctor_'+did).html(dhtml);

                            window.location.reload();

                        }else{

                            $('#msg').show().addClass('alert alert-danger').html('!Error, Something went wrong.');
                        }
				 }
				 else
				 {
					 if(rtdata=='suc')
					 {
					    $('#msg').show().addClass('alert alert-success').html('Request send to doctor.');
						dhtml+='<a  href="javascript:void(0);" onclick="managemydoctor('+did+',\'deactive\','+userid+');"><button class="btn success-but"> Deactive </button></a> <a href="'+base_url+'AllDataControl/doctor/'+did+'/page"><button class="btn see-profile"> See Profile </button></a>';
						$('#mydoctor_'+did).html(dhtml);
						window.location.href= base_url+'mydoctor/profile/'+did+'/'+userid;
					 }
					else if(rtdata=='errmail')
					 {
						 $('#msg').show().addClass('alert alert-danger').html('!Error, unable to send email to doctor.');
					 }
                     else if(rtdata=='already')
					 {
						 alert('You have already sent request to doctor.');
                         window.location.reload();
					 }
					 else
					 {
						 $('#msg').show().addClass('alert alert-danger').html('!Error, Something went wrong.');
					 }
				 }
				 //setTimeout(function(){$('#msg').hide();},3000);
                    $('#anchor-adddoctor>button').removeAttr('disabled');
			   }
		   });
}

function updateDoctorPermission(did, dstatus){


    var permission = $('input[type=radio][name=permission'+did+']:checked').val();

	$('#mainloader').show();

	var dhtml='';
	$.ajax({
		   type:'post',
		   url:base_url+'patient/updateDoctorPermission',
		   data:'doctorid='+did+'&activetype='+dstatus+'&permission='+permission,
			   success:function(rtdata)
			   {

				 $('#mainloader').hide();
				 rtdata = rtdata.trim();
		          if(rtdata=='suc')
					 {
						 window.location.href=base_url+'patient/mydoctor';
					 }
					 else
					 {
						 $('#msg').show().addClass('alert alert-danger').html('!Error, Something Went Wrong.');
					 }
				 }


		   });
}

function managedoctortopatient(dstatus){
    var uid= $('#pin-form #userid').val();

    $('#pin-form .submit-but').attr('disabled','disabled');
    $('#pin-form #loading1').show();
	$('#mainloader').show();
	var dhtml='';

	$.ajax({
		   type:'post',
		   url:base_url+'doctor/managedoctortopatient',
		   data:'userid='+uid+'&activetype='+dstatus,
			   success:function(rtdata)
			   {
                 $('#pin-form #loading1').hide();
				 $('#mainloader').hide();
				 rtdata = rtdata.trim();
                 console.log('rtdata',rtdata);
				 if(dstatus=='active')
				 {

                    if(rtdata=='suc')
                    {
                        $('#pin-form #msg').show().addClass('alert alert-success').html('Your request Sent, Please Check Your Email.');
                        $('#pin-form .submit-but').removeAttr('disabled');

                    }
                    else if(rtdata=='errmail')
                    {
                      $('#pin-form #msg').show().addClass('alert alert-danger').html('!Error, Unable To Send Email To Doctor.');

                    }
                    else
                    {
                     $('#pin-form #msg').show().addClass('alert alert-danger').html('!Error, Something Went Wrong.');
                    }

				 }

				   setTimeout(function(){$('#pin-form #msg').hide(); window.location.href=base_url+'doctor/mypatients';},3000);
                   setTimeout(function(){$('#pin-form #msg').hide();},3000);
			   }
		   });
}

function newnotification()
{
        $.ajax({
           type:'get',
           url:base_url+'doctor/getnewnotification',
           success:function(ntdata)
           {
              nhtml='';
               var notficationdata = JSON.parse(ntdata);
               var currentTime = notficationdata.crtime;
                for(var i=0; i<notficationdata.data.length;i++)
                   {

                    if(notficationdata.data[i].type=='log')
                    {
                        var readfunction = (notficationdata.data[i].status==1)?'':'onclick="deleteDrLogNoti(this,'+notficationdata.data[i].id+',\''+notficationdata.data[i].type+'\')"';
                        if(notficationdata.data[i].status==0){
                        nhtml+='<li class="popup" '+readfunction+'><a href="javascript:void(0);" ></a>';
                       if(notficationdata.data[i].image!=null  && notficationdata.data[i].image!='' )
                       {
                        nhtml+='<img src="'+base_url+'uploads/'+notficationdata.data[i].sender+'/'+notficationdata.data[i].image+'"/>';
                       }
                       else
                       {
                          nhtml+='<img src="'+base_url+'img/profile-pic.png"/>';
                       }
                        nhtml+='<div class="content"><p>'+notficationdata.data[i].firstname+' '+notficationdata.data[i].lastname+' '+ notficationdata.data[i].message +'</p>';
                       nhtml+='<p class="time"><i class="icon-watch"></i>&nbsp;'+get_time_ago(notficationdata.data[i].date_time,currentTime)+'</p></div></a></li>';
                        }
                    }else
                    {
                        var actiondata = JSON.parse(notficationdata.data[i].action.replace(/\\/g, "")) ;
                        var readfunction = (notficationdata.data[i].status==1)?'':'onclick="readnotification(this,'+notficationdata.data[i].id+',\''+notficationdata.data[i].type+'\' )"';
                        if(notficationdata.data[i].status!=2){
                        nhtml+='<li class="popup" '+readfunction+'><a href="javascript:void(0);" ></a>';
                       if(notficationdata.data[i].image!=null  && notficationdata.data[i].image!='' )
                       {
                        nhtml+='<img src="'+base_url+'uploads/'+notficationdata.data[i].sender+'/'+notficationdata.data[i].image+'"/>';
                       }
                       else
                       {
                          nhtml+='<img src="'+base_url+'img/profile-pic.png"/>';
                       }
                        nhtml+='<div class="content" onclick="notificationAction(\''+notficationdata.data[i].id+'\',\''+notficationdata.data[i].firstname+'\',\''+notficationdata.data[i].lastname+'\',\''+notficationdata.data[i].image+'\',\''+notficationdata.data[i].email+'\',\''+notficationdata.data[i].date_time+'\',\''+currentTime+'\',\''+notficationdata.data[i].message+'\',\''+actiondata.module_name+'\',\''+notficationdata.data[i].sender+'\',\''+notficationdata.data[i].receiver+'\',\''+actiondata.module_id+'\',\''+actiondata.parant_id+'\',\''+actiondata.variable+'\')"><p>'+notficationdata.data[i].firstname+' '+notficationdata.data[i].lastname+' '+ notficationdata.data[i].message +'</p>';
                        nhtml+='<p class="time"><i class="icon-watch"></i>&nbsp;'+get_time_ago(notficationdata.data[i].date_time,currentTime)+'</p></div></a></li>';
                       }
                    }

                 }
                  nhtml+='<li class="see-all"><a href="'+base_url+'doctor/seeActionNotification"> See All Notifications <i class="icon-right-chevron"></i></a></li>';

                   $('#not_ui').html(nhtml);
                   $('#read_not_count').html($("#not_ui li:not(:last-child)").length);

           }
       });
}

function getpatienNotificaton() // notification for Patient
{
        $.ajax({
           type:'get',
           url:base_url+'patient/pateintNotification',
           success:function(patientdata)
           {
              nhtml='';
               var notficationdata = JSON.parse(patientdata);

               var currentTime = notficationdata.crtime;
                for(var i=0; i<notficationdata.data.length;i++)
                   {
                        //var color = (notficationdata.data[i].status==1)?'style="color:red"':'';
                        if(notficationdata.data[i].type=='log')
                        { var readfunction = (notficationdata.data[i].status==1)?'':'onclick="deleteLogNoti(this,'+notficationdata.data[i].id+',\''+notficationdata.data[i].type+'\')"';
                          if(notficationdata.data[i].status==0){
                          nhtml+='<li class="popup" '+readfunction+'><a href="javascript:void(0);" ></a>';
                          if(notficationdata.data[i].image!=null  && notficationdata.data[i].image!='' )
                         {
                          nhtml+='<img src="'+base_url+'uploads/'+notficationdata.data[i].sender+'/'+notficationdata.data[i].image+'"/>';
                         }
                         else
                         {
                            nhtml+='<img src="'+base_url+'img/profile-pic.png"/>'; //uname,lname,patientimage,email,date,crtime
                         }
                        nhtml+='<div class="content"><p>'+notficationdata.data[i].firstname+' '+notficationdata.data[i].lastname+' '+ notficationdata.data[i].message +'</p>';
                        nhtml+='<p class="time"><i class="icon-watch"></i>&nbsp;'+get_time_ago(notficationdata.data[i].date_time,currentTime)+'</p></div></a></li>';
                        }
                    }else
                    {
                        var actiondata = JSON.parse(notficationdata.data[i].action.replace(/\\/g, "")) ;
                        var readfunction = (notficationdata.data[i].status==1)?'':'onclick="readpatientnotification(this,'+notficationdata.data[i].id+',\''+notficationdata.data[i].type+'\')"';
                        if(notficationdata.data[i].status!=2){
                        nhtml+='<li class="popup" '+readfunction+'><a href="javascript:void(0);" ></a>';
                         if(notficationdata.data[i].image!=null  && notficationdata.data[i].image!='' )
                         {
                          nhtml+='<img src="'+base_url+'uploads/'+notficationdata.data[i].sender+'/'+notficationdata.data[i].image+'"/>';
                         }
                         else
                         {
                            nhtml+='<img src="'+base_url+'img/profile-pic.png"/>'; //uname,lname,patientimage,email,date,crtime
                         }
                        nhtml+='<div class="content" onclick="patientnotificationAction(\''+notficationdata.data[i].id+'\',\''+notficationdata.data[i].firstname+'\',\''+notficationdata.data[i].lastname+'\',\''+notficationdata.data[i].image+'\',\''+notficationdata.data[i].email+'\',\''+notficationdata.data[i].date_time+'\',\''+currentTime+'\',\''+notficationdata.data[i].message+'\',\''+actiondata.module_name+'\',\''+notficationdata.data[i].sender+'\', \''+notficationdata.data[i].receiver+'\',\''+actiondata.module_id+'\',\''+actiondata.parant_id+'\',\''+actiondata.variable+'\')"><p>'+notficationdata.data[i].firstname+' '+notficationdata.data[i].lastname+' '+ notficationdata.data[i].message +'</p>';
                        nhtml+='<p class="time"><i class="icon-watch"></i>&nbsp;'+get_time_ago(notficationdata.data[i].date_time,currentTime)+'</p></div></a></li>';
                         }
                    }

                 }
                  nhtml+='<li class="see-all"><a href="'+base_url+'patient/seeActionNotification"> See All Notifications <i class="icon-right-chevron"></i></a></li>';
                   $('#not_pat_ui').html(nhtml);
                   $('#not_pat_count').html($("#not_pat_ui li:not(:last-child)").length);

           }
       });
}



function sort_li(a, b){
    return ($(b).data('position')) < ($(a).data('position')) ? 1 : -1;
  }


function notificationAction(ntfid,uname,lname,image,email,date,crtime,message,table_name,uid, receiver,module_id,parant_id,
        variable){

      var email = ((email !='') ? email : myemail );
       var nimg='';
          if( image == 'null' || image == null || image == ''  )
            {
                nimg+='<img style="width:100%; object-fit:cover" src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img style="width:100%; height:300px;object-fit:cover" src="'+base_url+'uploads/'+uid+'/'+image+'" />';
            }
    if(variable=='doctoradd')
    {
            var seedetail='';
    }else
    {
            var seedetail='See Detail';
    }


    var nhtml='';
    nhtml+='<div class="modal-dialog" id="popup"><div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action=""><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+uname+'"/><fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p>'+uname+' '+message+' <a href="javascript:void(0);" onclick="getdisplayData('+module_id+',\''+table_name+'\','+uid+')">'+seedetail+'</a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="button" onclick="accept_reject_request(1,\''+receiver+'\',\''+uid+'\',\''+ntfid+'\',\''+message+'\',\''+table_name+'\',\''+module_id+'\',\''+parant_id+'\',\''+variable+'\')"  class="btn submit-but" value="accept">ACCEPT</button>&nbsp;<a href=""><button type="button" onclick="accept_reject_request(2,\''+receiver+'\',\''+uid+'\',\''+ntfid+'\',\''+message+'\',\''+table_name+'\',\''+module_id+'\',\''+parant_id+'\',\''+variable+'\')" class="btn reset-but" value="cancel">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form><div id="msg"></div></div></div></div></div>';


          $('body').html(nhtml);
          $('#my_Modal33').trigger('click');
}


function notificationActionss(ntfid,uname,lname,image,email,date,crtime,message,table_name,uid, receiver,module_id,parant_id,
        variable){

      var email = ((email !='') ? email : myemail );
       var nimg='';
          if( image == 'null' || image == null || image == ''  )
            {
                nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+uid+'/'+image+'" />';
            }
    if(variable=='doctoradd')
    {
            var seedetail='';
    }else
    {
            var seedetail='See Detail';
    }


    var nhtml='';
    nhtml+='<div class="modal-dialog" id="popup"><div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action=""><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+uname+'"/><fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p>'+uname+' '+message+' <a href="javascript:void(0);" onclick="getdisplayData('+module_id+',\''+table_name+'\','+uid+')">'+seedetail+'</a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="button" onclick="accept_reject_request(1,\''+receiver+'\',\''+uid+'\',\''+ntfid+'\',\''+message+'\',\''+table_name+'\',\''+module_id+'\',\''+parant_id+'\',\''+variable+'\')"  class="btn submit-but" value="accept">ACCEPT</button>&nbsp;<a href=""><button type="button" onclick="accept_reject_request(2,\''+receiver+'\',\''+uid+'\',\''+ntfid+'\',\''+message+'\',\''+table_name+'\',\''+module_id+'\',\''+parant_id+'\',\''+variable+'\')" class="btn reset-but" value="cancel">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form><div id="msg"></div></div></div></div></div>';


          $('#drcontant').html(nhtml);
          $('#my_Modal33').trigger('click');
}

function patientnotificationAction(ptid,uname,lname,image,email,date,crtime,message,table_name,uid,receiver,module_id,parant_id,variable){
      var email = ((email !='') ? email : myemail );
       var nimg='';
          if( image == 'null' || image == null || image == ''  )
            {
                nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+uid+'/'+image+'" />';
            }


    var nhtml='';
    nhtml+='<div class="modal-dialog" id="popup">\
               <div class="modal-content">\
                   <div class="lightbox" style="text-align: left;">\
                      <div class="modal-header">\
                          <button type="button" class="close" data-dismiss="modal">&times;</button>\
                              <h3>ADD PERMISSION</h3>\
                        </div>\
                          <div class="add-details">\
             <form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action="">\
                 <input type="hidden" name="email" id="email" value="'+email+'"/>\
                 <input type="hidden" name="name" id="name" value="'+uname+'"/>\
                 <input type="hidden" name="msg_body" id="msg_body"  value="'+uname+'"/>\
                 <fieldset><div class="col-lg-12">\
                  <div class="left-details">'+nimg+'</div>\
                    <div class="right-details"><p>'+uname+' '+message+' <a href="javascript:void(0);" onclick="getdisplayData('+module_id+',\''+table_name+'\','+receiver+')">See Detail</a>\
                    </p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p>\
                    </div>\
                      <div class="col-lg-12 col-sm-12 col-xs-12">\
                        <div class="form-group"><div>\
                          <button type="submit" onclick="accept_reject_request(1,\''+receiver+'\',\''+uid+'\',\''+ptid+'\',\''+message+'\',\''+table_name+'\',\''+module_id+'\',\''+parant_id+'\',\''+variable+'\')"  class="btn submit-but" value="accept">ACCEPT</button>\
                           &nbsp;<a href="">\
                          <button type="button" onclick="accept_reject_request(2,\''+receiver+'\',\''+uid+'\',\''+ptid+'\',\''+message+'\',\''+table_name+'\',\''+module_id+'\',\''+parant_id+'\',\''+variable+'\')" class="btn reset-but" value="cancel">DECLINE</button>\
                          </div></a></div></div></div></fieldset>\
                      <div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div>\
                  </div>\
                  <div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div>\
                </form>\
              <div id="msg"></div></div></div></div></div>';

          $('#drcontant').html(nhtml);
          $('#my_Modal33').trigger('click');
}

function accept_reject_request(action,sender,receiver,base_id,message,table1,module_id,parant_id,variable)
{

        $.ajax({
        type:'post',
        url:base_url+'AllDataControl/user_request',
        data:{'action':action,'sender':sender,'receiver':receiver,'base_id':base_id,'message':message,'module_id':module_id,'table1':table1,'parant_id':parant_id,'variable':variable},
        success: function(data)
        {
          //alert(data);
          window.location.reload();
        }
        });
}


function readnotification(e,id,type)  // update notification
{
    $(e).attr('onclick','');
    console.log('read', id);
    $.ajax({
       type:'post',
       url:base_url+'doctor/updatenotification',
       data:{id:id,type:type},
       success:function(data)
       {
           //location.reload();
       }
   });
}
function readpatientnotification(e,id,type)  // update patientnotification
{
    $(e).attr('onclick','');
    //$(e).attr('style','color:red');
    console.log('read', id);
    $.ajax({
       type:'post',
       url:base_url+'patient/updatenotification',
       data:{id:id,type:type},
       success:function(data)
       {
           //location.reload();
       }
    });
}

function deleteLogNoti(e,id,type)  // update patientnotification
{
    $(e).attr('onclick','');
    //$(e).attr('style','color:red');
    console.log('read', id);
    $.ajax({
       type:'post',
       url:base_url+'patient/updatenotification',
       data:{id:id,type:type},
       success:function(data)
       {
           location.reload();
       }
    });
}

function deleteDrLogNoti(e,id,type)
{
    $(e).attr('onclick','');
    console.log('read', id);
    $.ajax({
       type:'post',
       url:base_url+'doctor/updatenotification',
       data:{id:id,type:type},
       success:function(data)
       {
           location.reload();
       }
    });
}


function timeDifference(tmstamp,crtime) {


    var ntmstamp = tmstamp.replace(' ','T');
    var previous = Date.parse(ntmstamp).getTime();
    var ncrtime =  crtime.replace(' ','T');
    var current = Date.parse(ncrtime).getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;



    var elapsed = (current - previous);



    if (elapsed < msPerMinute)  {
     return Math.round(elapsed/1000) + ' Seconds ago';
    }else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' Minutes ago';
    }else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' Hours ago';
    }else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' Days ago';
    }else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' Months ago';
    }else {
        return Math.round(elapsed/msPerYear ) + ' Years ago';
    }

}

function timeDifferencentf(tmstamp,crtime) {
    var ntmstamp = tmstamp.replace(' ','T');
    var previous = Date.parse(ntmstamp).getTime();
    var ncrtime =  crtime.replace(' ','T');
    var current = new  Date.parse(ncrtime).getTime();
    var elapsed = current - previous;
    return  elapsed ;
}


String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}


function readgetnotification(){

	if(usertype!='' && usertype == '2')
	{

	$.ajax({
	   type:'get',
	   url:base_url+'doctor/readnotification',
	   success:function(ntdata)
	   {
        var nhtml='';
        var rtdata = JSON.parse(ntdata);
            if(rtdata.data.length>0 || rtdata.data1.length>0 || rtdata.data2.length>0 || rtdata.data3.length >0|| rtdata.data4.length >0)
            {
             $('#read_not_count').html((rtdata.data.length+rtdata.data1.length)+rtdata.data2.length+rtdata.data3.length+rtdata.data4.length);
            }else{
             $('#read_not_count').html('0');
            }
	    }
	 });
	}
	else
	{ return false;}
}

function ajax_readNotification(id,tbl_name){

	$.ajax({
		 type: "POST",
		 url: base_url+'doctor/ajax_readNotification',
		 data: 'id='+id+'&tbl_name='+tbl_name,
	   }).done(function(data){
              readgetnotification();
      });
}


function getrecentUploadeImage(){

	$.ajax({
	   type:'get',
	   url:base_url+'AllDataControl/recentUploadedImage',
	   success:function(ntdata)
	   {
		   var nhtml='';
		   var rtdata = JSON.parse(ntdata);
           var newfile = rtdata.data.filename.ltrim().split(',');
           var n = newfile[0].split('.').pop();

           if(n=='jpg' || n=='TIF' || n=='png' || n=='gif' || n=='jpeg')
           {
             $('#rcn_Img').attr("src", base_url+'uploads/'+rtdata.data.userid+'/'+newfile[0].ltrim());
           }
           else if(n=='txt')
               {
                 $('#rcn_Img').attr("src", base_url+'img/text.jpg');
               }
           else
           {
             $('#rcn_Img').attr("src", base_url+'img/photos-patient01.png');
           }

	    }
	 });
}

function pateint_generalpermission(id,type){

    $.ajax({
    type:'post',
    url:base_url+'patient/pateint_viewesgeneralpermission',
    data:'id='+id,
        success: function(data)
        {
         window.location.href=base_url+'patient/exams/'+type+'_generalproblem';
        }
    });

}



function pateint_normalpermission(id,type){

    $.ajax({
    type:'post',
    url:base_url+'patient/pateint_viewesNormalpermission',
    data:'id='+id,
        success: function(data)
        {
           var myvar = type;
           var arr = myvar.split('_');
           window.location.href=base_url+'patient/exams/patient_'+arr[1];
        }
    });

}


function pateint_addDrntfPermission(id){

    $.ajax({
    type:'post',
    url:base_url+'patient/pateint_viewesDrAddPermission',
    data:'id='+id,
        success: function(data)
        {
           window.location.href=base_url+'patient/home';
        }
    });

}


function doctor_complete_permission(id,type){

    $.ajax({
    type:'post',
    url:base_url+'doctor/ajax_doctor_complete_permission',
    data:'id='+id+'&type='+type,
        success: function(data)
        {
           var referrer =  document.referrer;
           window.location.href = referrer;
        }
    });

}


function ajax_cancelnotification(id,table,column){

    $.ajax({
    type:'post',
    url:base_url+'AllDataControl/ajax_cancelnotification',
    data:'id='+id+'&table='+table+'&column='+column,
        success: function(data)
        {
            if(usertype == '2'){
            window.location.href=base_url+'doctor';
            }else if(usertype == '1'){
              window.location.href=base_url+'patient/home';
            }

        }
    });

}


function rating_ntf(id){

    $.ajax({
    type:'post',
    url:base_url+'doctor/doctorRating_ntf',
    data:'id='+id,
        success: function(data)
        {
            window.location.href=base_url+'doctor/rating';
        }
    });

}


function ntf_dcvisit(id){

    $.ajax({
    type:'post',
    url:base_url+'patient/ajax_ntf_dcvisit',
    data:'id='+id,
        success: function(data)
        {
            window.location.href=base_url+'patient/home';
        }
    });

}


function connect_patient(ptid, uname){
	$('#pin-form #userid').val(ptid);
	$('#pin-form #tbl_name').val('yg_relation');
	$('#pin-form #pin').prop('placeholder', 'Insert secure pin for '+uname);
	$('#pin_modal').trigger('click');
}

function permit_patient(ptid,map_id,uname,patientimage,table_name,email,p_id,date,crtime,usertype){
  var email = ((email !='') ? email : myemail );
    var nimg='';
       if( patientimage == 'null' || patientimage == null || patientimage == '')
            {
              nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'"/>';
            }
            if(usertype==1){
            var  cs_user='patient';
            var drstr = 'Dr.';
            }else{
            var  cs_user='doctor';
            var drstr = '';
            }
    var nhtml='';

            var crname='';
            crname = table_name.substring(3);

            nhtml+='<div class="modal-dialog" id="newcontant"><div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action="'+base_url+''+cs_user+'/changePermission/'+map_id+'"><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+table_name.substring(3)+'"/><fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p> '+drstr+' '+uname+' has added Details in '+langdata[crname]+'<a href="javascript:void(0);" onclick="getdisplayData('+p_id+',\''+table_name+'\','+ptid+');"> See Detail </a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button onClick="setdisable(this);" type="submit" class="btn submit-but">ACCEPT</button>&nbsp;<a href="'+base_url+''+cs_user+'/cancelPermission/'+email+'/'+uname+'/'+table_name+'/'+map_id+'/'+p_id+'"><button type="button" class="btn reset-but">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div></div>';
            $('#newcontant').html(nhtml);
            $('#my_Modal_PPermission').trigger('click');
}

function general_permission(ptid,id,type,uname,patientimage,email,date,crtime,usertype){
          var email = ((email !='') ? email : myemail );
            var nimg='';
            if( patientimage == 'null' || patientimage == null || patientimage == '')
            {
            nimg+='<img src="'+base_url+'img/profile-pic.png"/>';

            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'" />';
            }

      if(usertype==1){
       var  cs_user='patient';
       var drstr = 'Dr.';
      }else{
       var  cs_user='doctor';
       var drstr = '';
      }

    var nhtml='';
    nhtml+='<div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="gen_permission" id="gen_permission" method="post" enctype="multipart/form-data" action="'+base_url+''+cs_user+'/changeGenralPermission/'+id+'"><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body" value="'+type+'"/><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p> '+drstr+' '+uname+' has added details in '+type+' <a href="javascript:void(0);" onclick="getGenProblemData('+id+',\''+type+'\','+ptid+');"> See Detail </a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="submit" onClick="setdisable(this);" class="btn submit-but">ACCEPT</button>&nbsp;<a href="'+base_url+''+cs_user+'/cancelGenralPermission/'+email+'/'+uname+'/'+type+'/'+id+'"><button type="button" class="btn reset-but">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div>';


          $('#gen_contant').html(nhtml);
          $('#my_Modal11').trigger('click');
}

function doctor_newnotification(){
      var email = ((email !='') ? email : myemail );
       var nimg='';
          if( patientimage == 'null' || patientimage == null || patientimage == ''  )
            {
                nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'" />';
            }


    var nhtml='';
    nhtml+='<div class="modal-dialog" id="popup"><div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action="'+base_url+'doctor/acceptDrPermission/'+relid+'"><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+uname+'"/><fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p>'+uname+' wants to add you as a Doctor</p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="submit" onClick="setdisable(this);" class="btn submit-but">ACCEPT</button>&nbsp;<a href="'+base_url+'doctor/CancelDrpermission/'+relid+'/'+uname+'/'+email+'"><button type="button" class="btn reset-but">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div></div>';

          $('#drcontant').html(nhtml);
          $('#my_Modal33').trigger('click');
}


function permit_addDoctorBypatient(ptid,relid,uname,lname,patientimage,email,date,crtime){
      var email = ((email !='') ? email : myemail );
       var nimg='';
          if( patientimage == 'null' || patientimage == null || patientimage == ''  )
            {
                nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'" />';
            }


    var nhtml='';
    nhtml+='<div class="modal-dialog" id="drcontant"><div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action="'+base_url+'doctor/acceptDrPermission/'+relid+'"><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+uname+'"/><fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p>'+uname+' wants to add you as a Doctor</p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(date,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="submit" onClick="setdisable(this);" class="btn submit-but">ACCEPT</button>&nbsp;<a href="'+base_url+'doctor/CancelDrpermission/'+relid+'/'+uname+'/'+email+'"><button type="button" class="btn reset-but">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div></div>';

          $('#drcontant').html(nhtml);
          $('#my_Modal33').trigger('click');
}


function deletePermission(ptid,map_id,uname,patientimage,table_name,email,p_id,date,crtime,usertype,deldate){
        var email = ((email !='') ? email : myemail );
        var nimg='';

        if( patientimage == 'null' || patientimage == null || patientimage == '')
        {
          nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
        }
        else
        {
          nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'"/>';
        }

        if(usertype==1){
        var  cs_user='patient';
        var drstr = 'Dr.';
        }else{
        var  cs_user='doctor';
        var drstr = '';
        }

    var crname='';
            crname = table_name.substring(3);
            var nhtml='';
           nhtml+='<div class="modal-content">\
    <div class="lightbox" style="text-align: left;">\
        <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal">&times;</button>\
            <h3>DELETE PERMISSION</h3></div>\
        <div class="add-details">\
            <form class="form-horizontal form-details" name="del_norm_permission" id="del_norm_permission" method="post" enctype="multipart/form-data" action="'+base_url+''+cs_user+'/deletenormPermission/'+map_id+'">\
                <input type="hidden" name="email" id="email" value="'+email+'"/>\
                <input type="hidden" name="id" id="p_id" value="'+p_id+'" />\
                <input type="hidden" name="table" id="table_name" value="'+table_name+'" />\
                <input type="hidden" name="name" id="name" value="'+uname+'"/>\
                <input type="hidden" name="msg_body" id="msg_body" value="'+crname+'"/>\
                <fieldset>\
                    <div class="col-lg-12">\
                        <div class="left-details">'+nimg+'</div>\
                        <div class="right-details">\
                            <p> '+drstr+' '+uname+' Wants Delete This Information '+langdata[crname]+'<a href="javascript:void(0);" onclick="getdisplayData('+p_id+',\''+table_name+'\','+ptid+');"> See Detail </a></p>\
                            <p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(deldate,crtime)+'</p>\
                        </div>\
                        <div class="col-lg-12 col-sm-12 col-xs-12">\
                            <div class="form-group">\
                                <div>\
                                    <button type="submit" class="btn submit-but">ACCEPT</button>\
                                    <a href="'+base_url+''+cs_user+'/canceldeleditPermission/'+email+'/'+uname+'/'+table_name+'/'+map_id+'/'+p_id+'/del">\
                                        <button type="button" class="btn reset-but">DECLINE</button>\
                                </div>\
                                </a>\
                            </div>\
                        </div>\
                </fieldset>\
                <div class="form-group">\
                    <div class="col-sm-12" id="msg" style="display:none;"></div>\
                </div>\
                <div class="form-group">\
                    <div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif" /></div>\
                </div>\
            </form>\
            </div>\
        </div>\
    </div>';
    $('#contant_delete').html(nhtml);
    $('#my_Modal_delete').modal('show');
}


function deletegenPermission(ptid,id,type,uname,patientimage,email,date,crtime,usertype,deldate){
      var email = ((email !='') ? email : myemail );
      var nimg='';
    if( patientimage == 'null' || patientimage == null || patientimage == '')
            {
            nimg+='<img src="'+base_url+'img/profile-pic.png"/>';

            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'" />';
            }

   if(usertype==1){
       var  cs_user='patient';
       var drstr = 'Dr.';
      }else{
       var  cs_user='doctor';
       var drstr = '';
      }

    var nhtml='';
    nhtml+='<div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>ADD PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="del_gen_permission" id="del_gen_permission" method="post" enctype="multipart/form-data" action="'+base_url+''+cs_user+'/deletenormPermission/'+id+'">\
    <input type="hidden" name="email" id="email" value="'+email+'"/>\
    <input type="hidden" name="table" id="table_name" value="yg_generalproblem"/>\
     <input type="hidden" name="id" id="p_id" value="'+id+'" />\
    <input type="hidden" name="name" id="name" value="'+uname+'"/>\
    <input type="hidden" name="msg_body" id="msg_body"  value="'+type+'"/>\
  <div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p> '+drstr+' '+uname+' Added Details In '+type+' <a href="javascript:void(0);" onclick="getGenProblemData('+id+',\''+type+'\','+ptid+');"> See Detail </a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(deldate,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="submit" class="btn submit-but">ACCEPT</button>&nbsp;<a href="'+base_url+''+cs_user+'/cancelGendeleditPermission/'+email+'/'+uname+'/'+type+'/'+id+'/del"><button type="button" onClick="setdisable(this);" class="btn reset-but">DECLINE</button></div></a></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div>';

    $('#gen_contant_gendelete').html(nhtml);
    $('#my_Modal_gendelete').modal('show');
}


function editPermission(ptid,map_id,uname,patientimage,table_name,email,p_id,date,crtime,usertype,editdate){
    var email = ((email !='') ? email : myemail );
    var nimg='';
    if( patientimage == 'null' || patientimage == null || patientimage == '')
            {
            nimg+='<img src="'+base_url+'img/profile-pic.png"/>';

            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'"/>';
            }

      if(usertype==1){
       var  cs_user='patient';
       var drstr = 'Dr.';
      }else{
       var  cs_user='doctor';
       var drstr = '';
      }

   var crname='';
   crname = table_name.substring(3);

    var nhtml='';
    nhtml+='<div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>EDIT PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="doctor_permission" id="doctor_permission" method="post" enctype="multipart/form-data" action="'+base_url+''+cs_user+'/changeEditPermission/'+map_id+'"><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+table_name.substring(3)+'"/><fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p> '+drstr+' '+uname+' has Update Details in '+langdata[crname]+'  <a href="javascript:void(0);" onclick="getdisplayData('+p_id+',\''+table_name+'\','+ptid+');"> See Detail </a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>'+timeDifference(editdate,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="submit" onClick="setdisable(this);" class="btn submit-but">ACCEPT</button>&nbsp;<a href="'+base_url+''+cs_user+'/canceldeleditPermission/'+email+'/'+uname+'/'+table_name+'/'+map_id+'/'+p_id+'/edit"><button type="button" class="btn reset-but">DECLINE</button></div></a></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div>';


          $('#contant_edit_Permission').html(nhtml);
          $('#my_Modaledit_Permission').modal('show');
}

function editgenPermission(ptid,id,type,uname,patientimage,email,date,crtime,usertype,editdate){
    var email = ((email !='') ? email : myemail );
    var nimg='';
           if( patientimage == 'null' || patientimage == null || patientimage == '')
            {
              nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
             nimg+='<img src="'+base_url+'uploads/'+ptid+'/'+patientimage+'"/>';
            }

            if(usertype==1){
            var  cs_user='patient';
            var drstr = 'Dr.';
            }else{
            var  cs_user='doctor';
            var drstr = '';
            }

    var nhtml='';
    nhtml+='<div class="modal-content"><div class="lightbox" style="text-align: left;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>EDIT GENERAL PERMISSION</h3></div><div class="add-details"><form class="form-horizontal form-details" name="gen_permission" id="gen_permission" method="post" enctype="multipart/form-data" action="'+base_url+''+cs_user+'/changeEditPermission/'+id+'"><input type="hidden" name="tablename" id="tablename" value="yg_generalproblem"/><input type="hidden" name="email" id="email" value="'+email+'"/><input type="hidden" name="name" id="name" value="'+uname+'"/><input type="hidden" name="msg_body" id="msg_body"  value="'+type+'"/><div class="col-lg-12"><div class="left-details">'+nimg+'</div><div class="right-details"><p> '+drstr+' '+uname+' has Update details in '+type+'<a href="javascript:void(0);" onclick="getGenProblemData('+id+',\''+type+'\','+ptid+');"> See Detail</a></p><p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+timeDifference(editdate,crtime)+'</p></div><div class="col-lg-12 col-sm-12 col-xs-12"><div class="form-group"><div><button type="submit" onClick="setdisable(this);" class="btn submit-but">ACCEPT</button> &nbsp;<a href="'+base_url+''+cs_user+'/cancelGendeleditPermission/'+email+'/'+uname+'/'+type+'/'+id+'/edit"><button type="button" class="btn reset-but">DECLINE</button></div></a></div></div></div></fieldset><div class="form-group"><div class="col-sm-12" id="msg" style="display:none;" ></div></div><div class="form-group"><div id="loading1" class="col-lg-12" align="center" style="display:none;"><img src="'+base_url+'img/ajax-loader.gif"/></div></div></form></div></div></div>';


          $('#contant_edit_genPermission').html(nhtml);
          $('#my_Modaledit_genPermission').modal('show');
}


function calldoctorRequest(id,userid,uname,patientimage,date,crtime,lat,lng){

            var nimg='';
            if( patientimage == 'null' || patientimage == null || patientimage == '')
            {
              nimg+='<img src="'+base_url+'img/profile-pic.png"/>';
            }
            else
            {
              nimg+='<img src="'+base_url+'uploads/'+userid+'/'+patientimage+'"/>';
            }


    var nhtml='';
    nhtml+='<form class="form-horizontal form-details" name="calldoctor_permission" id="calldoctor_permission" method="post" enctype="multipart/form-data" action="'+base_url+'doctor/calldoctorrequest">\
                                  <input type="hidden" name="id" id="id" value="'+id+'"/>\
                                  <input type="hidden" name="userid" id="userid" value="'+userid+'"/>\
                                         <fieldset><div class="col-lg-12"><div class="left-details">'+nimg+'</div>\
                                           <div class="right-details">\
                                               <p>'+uname+' Send You An Call Request.</p>\
                                                 <p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+get_time_ago(date,crtime)+'</p>\
                                                  </div>\
                                                   <div class="col-lg-12 col-sm-12 col-xs-12">\
                                                    <div class="form-group">\
                                                        <div><button type="submit" onClick="setdisable(this);" name="submitForm" class="btn submit-but" value="ACCEPT">ACCEPT</button>&nbsp;\
                                                         <button type="submit"  name="submitForm" class="btn reset-but" value="CANCEL">CANCEL</button>\
                                                        </div>\
                                                     </a></div>\
                                         </div></fieldset>\
                                            <div class="form-group">\
                                                    <div class="col-sm-12" id="msg" style="display:none;" >\
                                                    </div>\
                                            </div>\
                                           <div class="form-group">\
                                                <div id="loading1" class="col-lg-12" align="center" style="display:none;">\
                                                  <img src="'+base_url+'img/ajax-loader.gif"/>\
                                                 </div>\
                                           </div>\
                                    </form>';

          $('#calldoctor_modal_content .add-details').html(nhtml);
          $('#calldoctor_modal').modal('show');

    setTimeout(function(){CreateMarker(lat,lng);},500);

}

function setdisable(e)
{
    /*$(e).attr('disabled','disabled');
    $(e).parents('form').submit();*/
}

function goback(){
	window.history.back();
}

function add_degree(){
	var count=parseInt($('#adddegree').children().length);
	count = count+1;


var html='';
html+='<div class="full-width clearfix" id="dd_'+count+'">';

html+='<div class="rpart-3 patient-input"><select name="degreetype[]" id="degreetype_'+count+'" class="form-control"><option value="1">Bachelors</option> <option value="2">Masters</option><option value="3">Doctoral</option><option value="4">Others</option></select></div><input type="hidden" value="" name="degreeid[]"/>';

html+='<div class="rpart-3 patient-input"><input type="text" placeholder="Degrees Name" class="form-control form-input required lettersonly" name="degreename[]" id="degreename_'+count+'" style="display:inline; margin-bottom: 5px;" value="" aria-required="true" aria-invalid="false"></div>';

html+='<div class="rpart-3 patient-input"><input type="text" placeholder="Instituete Name" class="form-control form-input required valid" name="institute[]" id="institute_'+count+'" style="display:inline; margin-bottom: 5px;" value="" aria-required="true" aria-invalid="false"></div>';

html+='<div class="rpart-3 patient-input"><input type="text" placeholder="Degrees Year" class="form-control form-input required digitonly" name="year[]" id="year_'+count+'" maxlength="4" minlength="4" style="display:inline; margin-bottom: 5px;" value="" aria-required="true" aria-invalid="false"></div>';

html+='<div class="rpart-3  patient-input"><button class="btn del-degree-but" onclick="DeleteDegree(\'direct\','+count+');"><i class="fa fa-times-circle"></i></button></div>';

html+='</div>';

$("#adddegree").append(html);
}

function DeleteDegree(deltype,cnt,dgid){
	if(deltype=='direct')
	{
		$("#dd_"+cnt).remove();
	}
	else
	{
		$.confirm({
                    title: 'Action',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								   type: "POST",
								   url:base_url+'doctor/deletedegree',
								   data:'degreeid='+dgid,
									   success:function(rtdata)
									   {

										   var rt = rtdata.trim();
										   if(rt=='success')
										   {
											   $("#dd_"+cnt).remove();
										   }
										   else
										   {
					 $('#medical-profile #msg').show().addClass('alert alert-danger').html('!Error, something went wrong. Please try again.');
					setTimeout(function(){$('#medical-profile #msg').hide()},3000);
											}
									   }
								});
					  }
                   });
	}
}

function add_degree_record(){
	if($('#medical-profile').valid())
	{
		var dt = $("select[name='degreetype[]']").map(function(){return $(this).val();}).get();
		var did =$("input[name='degreeid[]']").map(function(){return $(this).val();}).get();
		var dn =$("input[name='degreename[]']").map(function(){return $(this).val();}).get();
		var di = $("input[name='institute[]']").map(function(){return $(this).val();}).get();
		var dy = $("input[name='year[]']").map(function(){return $(this).val();}).get();

	}
}

function deletefun(id,column,table){
         $.confirm({
                    title: 'Action',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								   type: "POST",
								   url:base_url+'doctor/deletedegree',
								   data: dataString,
								    data:'degreeid='+cnt,
									   success:function(rtdata)
									   {
											alert(rtdata+'. is deleted.');
									   }
								});
					      }
                   });
 }

 function get_comment(did){
	 $('#dr_comment').val('');

 }

function getdisplayData(id,tbl_name){

    var uid = 0;
    if(arguments[2]!=undefined)
        {
            uid = arguments[2];
        }

    if(tbl_name=='yg_company' || tbl_name=='yg_pharmacy' || tbl_name=='yg_hospital' || tbl_name=='yg_diagnostic' ){

        $.ajax({
             type: "POST",
             url: base_url+'Company/ajax_getDisplaydata',
             data: 'id1='+id+'&tbl_name1='+tbl_name,
        }).done(function(data){
            $("#newcompcontant").html(data);
            $("#mycompModal").modal('show');

        });

    }else if(tbl_name=='yg_drug_leaflet'){

    $.ajax({
             type: "POST",
             url: base_url+'Company/ajax_getDisplaydata',
             data: 'id1='+id+'&tbl_name1='+tbl_name,
        }).done(function(data){
            $("#newcompcontant").html(data);
            $("#mycompModal").modal('show');

        });

    }else {
        $.ajax({
             type: "POST",
             url: base_url+'AllDataControl/ajax_getDisplaydata',
             data: {'id1':id,'tbl_name':tbl_name,'uid':uid},
        }).done(function(data){
           if(uid!=0)
               {
                   $("#myModalpermission").modal('show');
                   $("#myModalpermission").html(data);
               }
              else{

                   $("#myModal2").html('');
                   $("#myModal2").html(data);
              }
        });

    }
}

function editdisplayData(id,tbl_name,userid){
	$.ajax({
		 type: "POST",
		 url: base_url+'AllDataControl/ajax_editDisplaydata',
		 data: {'id1':id,'tbl_name1':tbl_name,'userid':userid},
	   }).done(function(data){
               $("#myeditModal").html('');
               $("#myeditModal").html(data);
      });
}

function editchildrenData(id,tbl_name,userid)
{
      $.ajax({
         type: "POST",
         url: base_url+'AllDataControl/ajax_editchildrendata',
         data: {'id1':id,'tbl_name1':tbl_name,'userid':userid},
       }).done(function(data){
               $("#myeditModal").html('');
               $("#myeditModal").html(data);
      });
}

function editGenProblemData(id,type){
        $.ajax({
             type: "POST",
             url: base_url+'AllDataControl/ajax_editGenProblemData',
             data: 'id1='+id+'&type1='+type,
        }).done(function(data){

                   $("#editgenproblem").html('');
                   $("#editgenproblem").html(data);
        });
}

function editBio(id,tbl_name,uid){

        $.ajax({
        type: "POST",
        url: base_url+'AllDataControl/ajax_getDisplaydatabio',
        data: 'id1='+id+'&tbl_name1='+tbl_name+'&uid='+uid,
        }).done(function(data){

        $("#myModaledit").modal('show');
        $("#myModaledit").html(data);
        });

}

function getGenProblemData(id,type){
    var uid = 0;
    if(arguments[2]!=undefined)
        {
            uid = arguments[2];
        }

	$.ajax({
		 type: "POST",
		 url: base_url+'AllDataControl/ajax_getGenProblemData',
		 data: 'id1='+id+'&type1='+type+'&uid='+uid,
	}).done(function(data){
        if(uid!=0)
           {
               $("#myModalpermission").modal('show');
               $("#myModalpermission").html(data);
           }
        else{
               $("#gen_problem").html('');
               $("#gen_problem").html(data);
            }
	});
}

function getdisplaygallData(id,tbl_name){

	$.ajax({
		 type: "POST",
		 url: base_url+'doctor/ajax_getDisplaygallaryData',
		 data: 'id1='+id+'&tbl_name1='+tbl_name
	}).done(function(data){
	   $("#myModallightbox").html(data);
	});
}


function getdisplayClinicData(Pid,table_name,imgname){

    $.ajax({
         type: "POST",
         url: base_url+'AllDataControl/ajax_getDisplayClinicData',
         data: 'Pid2='+Pid+'&table_name2='+table_name+'&imgname2='+imgname
    }).done(function(data){
    $("#myCliniclightbox").html(data);
    });
}


function deletedisplayPtData(id,tbl_name,doctorid,sender,language,addedby){
    var userid =0;
    if(arguments[4] != undefined)
    {
     userid =  arguments[4];
    }

	if(language==='english'){
		   $.confirm({
                    title: 'Delete Data',
                    content: 'Are you sure you want to delete ?',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/deletitem1',
								  data: {'id':id,'tbl_name1':tbl_name,'doctorid1':doctorid,'sender':sender,'addedby':addedby},
								   success:function(rtdata)
								   {
                                        location.reload();
								   }
				               });
					  	  }
                   });
        }
        else{
		   $.confirm({
                    title: 'Διαγραφή Δεδομενων',
                    content: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε ?',
                    confirmButton: 'ΕΠΙΒΕΒΑΙΩΣΗ',
                    cancelButton: 'Πτώση',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/deletitem1',
								  data: {'id':id,'tbl_name1':tbl_name,'doctorid1':doctorid,'sender':sender,'addedby':addedby},
								   success:function(rtdata)
								   {
									   var rt = rtdata.trim();
									   if(rt=='success')
									   {
										   alert('Η αίτησή σας έχει σταλεί στον γιατρό σας');
										   location.reload();
									   }
									   else
									   {
											alert("! Κάτι πήγε στραβά");
									   }
								   }
								});
					  		}
                   });
        }
}

function ajax_deletetmpdata(id,table,column){

    $.ajax({
    type:'post',
    url:base_url+'AllDataControl/ajax_deletetmpdata',
    data:'id='+id+'&table='+table+'&column='+column,
        success: function(data)
        {

           window.location.href=base_url+'doctor/exams/patient_emergency';
        }
    });

}

function ajax_deletetmpdata(id,table,column){
	if(language=='english'){
		$.confirm({
                    title: 'Delete Data',
                    content: 'Are you sure you want to delete ?',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
                    $.ajax({
                    type:'post',
                    url:base_url+'AllDataControl/ajax_deletetmpdata',
                    data:'id='+id+'&table='+table+'&column='+column,
                    success: function(data)
                    {

                    window.location.href=base_url+'doctor/exams/patient_emergency';
                    }
                    });
				     }
                   });
    }
    else{

		$.confirm({
                    title: 'Διαγραφή Δεδομενων',
                    content: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε ?',
                    confirmButton: 'ΕΠΙΒΕΒΑΙΩΣΗ',
                    cancelButton: 'Πτώση',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
                                $.ajax({
                                type:'post',
                                url:base_url+'AllDataControl/ajax_deletetmpdata',
                                data:'id='+id+'&table='+table+'&column='+column,
                                success: function(data)
                                {
                                  window.location.href=base_url+'doctor/exams/patient_emergency';
                                }
                                });
					  		}
                   });
        }
}
 /*Delete patient exam data*/
function deletedisplayData(id,tbl_name,language){
	if(language=='english'){
		$.confirm({
                    title: 'Delete Data',
                    content: 'Are you sure you want to delete ?',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/ajax_deleteDisplaydata',
								  data: 'id1='+id+'&tbl_name1='+tbl_name,
								   success:function(rtdata)
								   {
									   var rt = rtdata.trim();
									   if(rt=='success')
									   {
										   alert("Record successfully deleted.");
										   location.reload();
									   }
									   else
									   {
											alert("!Error");
									   }
								   }
								});
					  		}
                   });
    }
    else{

		$.confirm({
                    title: 'Διαγραφή Δεδομενων',
                    content: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε ?',
                    confirmButton: 'ΕΠΙΒΕΒΑΙΩΣΗ',
                    cancelButton: 'Πτώση',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/ajax_deleteDisplaydata',
								  data: 'id1='+id+'&tbl_name1='+tbl_name,
								   success:function(rtdata)
								   {
									   var rt = rtdata.trim();
									   if(rt=='success')
									   {
										   alert("Record successfully deleted.");
										   location.reload();
									   }
									   else
									   {
											alert("!Error");
									   }
								   }
								});
					  		}
                   });
    }
}

/*Delete patient exam data*/
function deletepatient(id,tbl_name,language){
	if(language==='english'){
		$.confirm({
                    title: 'Delete Record',
                    content: 'Are you sure you want to delete ?',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/ajax_deletepatient',
								  data: 'id1='+id+'&tbl_name1='+tbl_name,
								   success:function(rtdata)
								   {
									   var rt = rtdata.trim();
									   if(rt=='success')
									   {
										   alert("Record successfully deleted.");
										   location.reload();
									   }
									   else
									   {
											alert("!Error");
									   }
								   }
								});
					  		}
                   });
    }
    else{
		$.confirm({
                    title: 'Διαγραφή Εγγραφή',
                    content: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε ?',
                    confirmButton: 'Προχωρώ',
                    cancelButton: 'Πτώση',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/ajax_deletepatient',
								  data: 'id1='+id+'&tbl_name1='+tbl_name,
								   success:function(rtdata)
								   {
									   var rt = rtdata.trim();
									   if(rt=='success')
									   {
										   alert("Record successfully deleted.");
										   location.reload();
									   }
									   else
									   {
											alert("!Error");
									   }
								   }
								});
					  		}
                   });
    }
}

function getdeleteClinic(id,tbl_name){

    $.confirm({
                title: 'Delete Clinic Data',
                content: 'Are you sure you want to delete ?',
                confirmButton: 'Proceed',
                confirmButtonClass: 'btn-info',
                animation: 'scale',
                confirm: function () {
                        $.ajax({
                              type: "POST",
                              url: base_url+'AllDataControl/ajax_deleteclinicData',
                              data: 'id1='+id+'&tbl_name1='+tbl_name,
                               success:function(rtdata)
                               {
                                   var rt = rtdata.trim();
                                   if(rt=='success')
                                   {
                                       alert("Record successfully deleted.");
                                       location.reload();
                                   }
                                   else
                                   {
                                        alert("!Error");
                                   }
                               }
                            });
                        }
               });
}


function permissionMsg(language){
     if(language=='english'){
         $.confirm({
            title: 'No Add Permission',
            content: 'You do not have permission to add.',
            confirmButton: 'OK',
            confirmButtonClass:'btn-info',
            animation: 'scale',
            cancelButton: false

           });
     }
     else{
         $.confirm({
            title: 'Όχι Πρόσθεσε Άδεια',
            content: 'Δεν έχετε άδεια για να προσθέσετε.',
            confirmButton: 'Εντάξει',
            confirmButtonClass:'btn-info',
            animation: 'scale',
            cancelButton: false

           });
     }
}

function deleteMsg(language){
  if(language==='english'){
     $.confirm({
        title: 'No Delete Permission',
        content: 'You do not have delete permission.',
        confirmButton: 'OK',
        confirmButtonClass:'btn-info',
        animation: 'scale',
        cancelButton: false

       });
  }
  else{
     $.confirm({
        title: 'Δεν Διαγραφή Άδεια',
        content: 'Δεν έχετε δικαίωμα διαγραφής.',
        confirmButton: 'Εντάξει',
        confirmButtonClass:'btn-info',
        animation: 'scale',
        cancelButton: false

       });
    }

}

function deleteActpatient(language){
  if(language==='english'){
     $.confirm({
        title: 'Delete Patient',
        content: 'First You have to deactive patient.',
        confirmButton: 'OK',
        confirmButtonClass:'btn-info',
        animation: 'scale',
        cancelButton: false

       });
  }
  else{
     $.confirm({
        title: 'Διαγραφή ασθενούς',
        content: 'Πρώτα θα πρέπει να απενεργοποιήσετε τον ασθενή.',
        confirmButton: 'Εντάξει',
        confirmButtonClass:'btn-info',
        animation: 'scale',
        cancelButton: false

       });
  }
}


function followcompany(userid,companyid,usertype,language,moduletype){
	if(language==='english'){
		$.confirm({
                    title: 'Follow'+moduletype,
                    content: 'Do you want follow ?',
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/ajax_followcompany',
								  data: 'userid='+userid+'&companyid='+companyid+'&usertype='+usertype+'&moduletype='+moduletype,
								   success:function(rtdata)
								   {

									   var rt = rtdata.trim();

									   if(rt)
									   {
										  alert(moduletype+" Followed.");
										  location.reload();
									   }
									   else
									   {
								         alert("!Error");
									   }
								   }
								});
					  		}
                   });
    }
    else{
		$.confirm({
                    title: 'Διαγραφή Εγγραφή',
                    content: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε ?',
                    confirmButton: 'Προχωρώ',
                    cancelButton: 'ΑΚΥΡΩΣΗ',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
								  type: "POST",
								  url: base_url+'AllDataControl/ajax_followcompany',
								  data: 'id1='+id+'&tbl_name1='+tbl_name,
								   success:function(rtdata)
								   {
									   var rt = rtdata.trim();
									   if(rt=='success')
									   {
										   alert("Company Followed.");
										   location.reload();
									   }
									   else
									   {
											alert("!Error");
									   }
								   }
								});
					  		}
                   });
       }
}

function ntf_changefollow(id){
    $.ajax({
    type:'post',
    url:base_url+'AllDataControl/ajax_delete',
    data:'id='+id,
        success: function(data)
        {
            location.reload();
        }
    });

}

function ajax_changestaus(id,tbl_name){

	$.ajax({
		 type: "POST",
		 url: base_url+'doctor/ajax_changestaus',
		 data: 'id='+id+'&tbl_name='+tbl_name,
	   }).done(function(data){

         window.location.href=base_url+'doctor';
      });
}

function ajax_changepatientstaus(id,tbl_name){

    $.ajax({
    type:'post',
     url: base_url+'patient/ajax_changepatientstaus',
     data: 'id='+id+'&tbl_name='+tbl_name,
        success: function(data)
        {
            window.location.href=base_url+'patient/exams/patient_emergency';
        }
    });

}


function ajax_changereportstaus(id,tbl_name){

    $.ajax({
    type:'post',
     url: base_url+'AllDataControl/ajax_changereportstaus',
     data: 'id='+id+'&tbl_name='+tbl_name,
        success: function(data)
        {

          location.reload();
        }
    });

}

$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 250;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Read more +";
    var lesstext = "Less -";
    $('.cstm-rw .right-side-cnt p:nth-last-of-type(1)').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
            $(this).html(html);
        }
    });
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});

function getchildrenGenProblemData(id,type,userid){
    var uid = 0;
    if(arguments[3]!=undefined)
        {
            uid = arguments[3];
        }


	$.ajax({
		 type: "POST",
		 url: base_url+'AllDataControl/ajax_getchildrenGenProblemData',
		 data: 'id1='+id+'&type1='+type+'&uid='+uid+'&type1='+type+'&userid='+userid ,
	}).done(function(data){

        console.log('data',data);
        if(uid!=0)
           {
               $("#myModalpermission").modal('show');
               $("#myModalpermission").html(data);
           }
        else{
               $("#gen_problem").html('');
               $("#gen_problem").html(data);
            }
	});
}


function childreneditGenProblemData(id,type,userid){

	$.ajax({
		 type: "POST",
		 url: base_url+'AllDataControl/ajax_childreneditGenProblemData',
		 data: 'id1='+id+'&type1='+type+'&userid='+userid,
	}).done(function(data){

               $("#editgenproblem").html('');
               $("#editgenproblem").html(data);
	});
}


function getchildrendisplayData(id,tbl_name,userid){
    var uid = 0;
    if(arguments[3]!=undefined)
        {
            uid = arguments[3];
        }

        $.ajax({
             type: "POST",
             url: base_url+'AllDataControl/ajax_getchildrenDisplaydata',
             data: 'id1='+id+'&tbl_name1='+tbl_name+'&uid='+uid+'&userid='+userid,
        }).done(function(data){
           if(uid!=0)
               {
                   $("#myModalpermission").modal('show');
                   $("#myModalpermission").html(data);
               }
            else{
                   $("#myModal2").html('');
                   $("#myModal2").html(data);
            }
        });


}

function editchildrendisplayData(id,tbl_name,userid){


	$.ajax({
		 type: "POST",
		 url: base_url+'AllDataControl/ajax_editchildrenDisplaydata',
		 data: 'id1='+id+'&tbl_name1='+tbl_name+'&userid='+userid,
	   }).done(function(data){
               $("#myeditModal").html('');
               $("#myeditModal").html(data);
      });
}

/* map offset latlong*/
var tmpLocArray = [];
function getOffsetLatLng(lat,lng,r){
   var lat1 = lat * Math.PI / 180.0;
   var lon1 = lng * Math.PI / 180.0;
   var d = r != undefined ? r : 0.00000004;
   var x;
var str='';
var chk = 0;
   for (x = 0; x <= 360; x += 40) {
        chk = 0;
               var tc = (x / 90) * Math.PI / 2;
               var lati = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(tc));
               lati = 180.0 * lati / Math.PI;
               var lon;
               if (Math.cos(lat1) == 0) {
                   lon = lonin; // endpoint a pole
               } else {
                   lon = ((lon1 - Math.asin(Math.sin(tc) * Math.sin(d) / Math.cos(lat1)) + Math.PI) % (2 * Math.PI)) - Math.PI;
               }
               lon = 180.0 * lon / Math.PI;
               str = lati + '_' + lon;
        if ($.inArray(str, tmpLocArray) == -1)
        break;
        else
        chk = 1;
   }
    //console.log('Offestting position: ' + str);
    if(chk ==1){
        r = d+0.00000004;
        str = getOffsetLatLng(lat,lng, r);
        return str;
    }
    else{
        return str;
    }
}

function addModule(moduleid , userid , moduletype , tablename ,language){
	if(language==='english'){
		$.confirm({
                    title: 'Doctor Request for '+moduletype,
                    confirmButton: 'Proceed',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
                                    $.ajax({
                                    type:'post',
                                    url: base_url+'AllDataControl/ajax_addrequest',
                                    data: 'moduleid='+moduleid+'&userid='+userid+'&moduletype='+moduletype+'&tablename='+tablename,
								    success:function(rtdata)
								    {
                                        alert("Request Sent");
									    window.location.href=base_url+'doctor';
								     }
				        });
				   }
           });
    }else{
		$.confirm({
                    title: 'Διαγραφή Εγγραφή',
                    confirmButton: 'Προχωρώ',
                    cancelButton: 'ΑΚΥΡΩΣΗ',
                    confirmButtonClass: 'btn-info',
                    animation: 'scale',
                    confirm: function () {
							$.ajax({
                                    type:'post',
                                    url: base_url+'AllDataControl/ajax_addrequest',
                                    data: 'moduleid='+moduleid+'&userid='+userid+'&moduletype='+moduletype+'&tablename='+tablename,
                                    success:function(rtdata)
                                    {
                                     alert("Request Sent");
                                     window.location.href=base_url+'doctor';
                                    }
								});
					  		}
                   });
       }
}


function get_time_ago( time,crtime )
{
   var time_difference =  Math.round((new Date(crtime)).getTime() / 1000) - Math.round((new Date(time)).getTime() / 1000);

    if( time_difference < 1 ) { return 'just now'; }

   var time_text = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
   var time_number = [ 365 * 24 * 60 * 60, /*1 year*/
                               30 * 24 * 60 * 60, /*1 month*/
                               7 * 24 * 60 * 60, /*1 week*/
                               24 * 60 * 60,      /*1 day*/
                               60 * 60,           /*1 hour*/
                               60,                /*1 minute*/
                               1
                           ];
    for(var i=0;i<time_number.length;i++)
    {
        var d = time_difference / time_number[i];

        if( d >= 1 )
        {
            t = Math.floor(d);
            return  t + ' ' +  time_text[i] + ( t > 1 ? 's' : '' ) + ' ago';
        }
    }
}

// user notification

