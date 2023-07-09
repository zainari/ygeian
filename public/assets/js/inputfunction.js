jQuery(window).ready(function () {
  jQuery.getJSON(' https://get.geojs.io/v1/ip/geo.json', function (data) {
    jQuery('body').find('[data-countrycode="' + data.country_code + '"]').attr('selected', 'true');
  });

});



jQuery(document).ready(function () {
  let ip;
  let ip_value;
  jQuery("#phone-country,#phone-coun").intlTelInput({
    geoIpLookup: function (callback) {
      jQuery.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
        ip = resp.ip;


      });
    },
    initialCountry: "auto",
    nationalMode: true,
    separateDialCode: true,
  });

  setTimeout(function () {
    jQuery('input[name="pc"]').val(jQuery('.selected-dial-code').html());
    jQuery('input[name="cip"]').val(ip);
    jQuery('input[name="ctry"]').val(jQuery('.country-list .country.active .country-name').html());
  }, 3000);

  jQuery('body').delegate('.country', 'click', function () {
    jQuery('input[name="pc"]').val(jQuery(this).find('.dial-code').html());
    jQuery('input[name="cip"]').val(ip);
    jQuery('input[name="ctry"]').val(jQuery(this).closest("form").find('.country-list .country.active .country-name').html());

  });

});
