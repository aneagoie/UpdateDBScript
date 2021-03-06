var fastCsv = require('fast-csv');
var fs = require('fs');
var q = require('q');
var compare = require('./compare.js');

function fetchCsv(csvName) {
  var defer = q.defer();
  var list = [];
  var inputStream = fs.createReadStream(csvName);
  var csvStream = fastCsv()
    .on('data', function (data) {
      list.push(data);
    })
    .on('end', function () {
      defer.resolve(list);
    });

  inputStream.pipe(csvStream);

  return defer.promise;
}

// import Data Base csv
fetchCsv('test_organizationsProd.csv')
  .then(function (data) {
    var db = [];
    for(var i = 1; i<data.length; i++) {
      db.push({
        organization_name: data[i][1],
        label: data[i][2],
        type: data[i][3],
        website: data[i][4],
        sampling_device: data[i][5],
        first_name: data[i][6],
        last_name: data[i][7],
        address: data[i][8],
        city: data[i][9],
        state: data[i][10],
        zip_code: data[i][11],
        phone_number: data[i][12],
        fax_number: data[i][13],
        cell_number: data[i][14],
        email: data[i][15],
        reposts_url: data[i][16],
        latitude: data[i][17],
        longitude: data[i][18],
        is_partner: data[i][19],
        is_data_collector: data[i][20],
        non_members_can_call: data[i][21],
        all_members_can_call: data[i][22],
        is_archived: data[i][23],
        can_send_notifications: data[i][24],
        video_start_time: data[i][25],
        video_end_time: data[i][26],
        video_is_online: data[i][27],
        video_minutes_to_wait: data[i][28],
        admin_user_name: data[i][29],
        video_time_zone: data[i][30],
        last_report_entered: data[i][31],
        clinic_sub_type: data[i][32],
        is_kagen_data_collector: data[i][33],
        update: false,
        newRow: false,
        noTouchy: false
      });
    }

    return db;
  })
  .then(function (dbCsv) {
    // import Updated csv
    fetchCsv('input.csv')
      .then(function (data) {
        var ex = [];
        for(var i = 1; i<data.length; i++) {

          if(data[i][3] === 'RANGLE.IO') {
            type = 'Data Collector';
            website = 'www.rangle.io';
            isDataCollector = true;
            rangle = 'org@rangle.io';
          } else {
            type = 'Clinic';
            website = '';
            isDataCollector = false;
            rangle = '';
          }

          ex.push({
            organization_name: data[i][0],
            label: data[i][3],
            type: type,
            website: website,
            sampling_device: '',
            first_name: data[i][1],
            last_name: data[i][2],
            address: data[i][4],
            city: data[i][5],
            state: data[i][6],
            zip_code: data[i][7],
            phone_number: data[i][10],
            fax_number: '',
            cell_number: '',
            email: data[i][9],
            reposts_url: '',
            latitude: data[i][13],
            longitude: data[i][14],
            is_partner: false,
            is_data_collector: isDataCollector,
            non_members_can_call: isDataCollector,
            all_members_can_call: false,
            is_archived: false,
            can_send_notifications: isDataCollector,
            video_start_time: '',
            video_end_time: '',
            video_is_online: false,
            video_minutes_to_wait: '',
            admin_user_name: rangle,
            video_time_zone: '',
            last_report_entered: '',
            clinic_sub_type: '',
            is_kagen_data_collector: isDataCollector,
            update: false,
            newRow: false,
            noTouchy: false
          });
        }
        return ex;
      })
      .then(function (excelCsv) {
        // Variables for excelCsv
        var newOrganization = compare.onlyInExcel(excelCsv, dbCsv);
        var updatedAndNewOrganizations = compare.updatedInExcel(excelCsv, dbCsv);
        compare.makeNewPropertyTrue(newOrganization);
        compare.makeUpdatePropertyTrue(updatedAndNewOrganizations);

        // Variables for DB
        var oldOrganizationDB = compare.onlyInDB(excelCsv, dbCsv);
        var updatedAndNewOrganizationsDB = compare.updatedInDB(excelCsv, dbCsv);
        compare.makeNoTouchyPropertyTrue(oldOrganizationDB);
        compare.makeUpdatePropertyTrueDB(updatedAndNewOrganizationsDB);

        var updatedOrganizationsFinal = updatedAndNewOrganizations.filter(function (data) {
          return data.newRow === false;
        });
        var updatedOrganizationsFinalDB = dbCsv.filter(function (data) {
          return data.update === true;
        });
        // console.log('DBTotal', dbCsv.length);
        // console.log('ExcelTotal', excelCsv.length);
        // console.log('Untouched', oldOrganizationDB.length);
        // console.log('New', newOrganization.length);
        // console.log('Updated', updatedOrganizationsFinal.length);
        // console.log('newTotal', dbCsv.length + newOrganization.length );


        // All SQL commands for new rows to the DB
        var sqlCommandsForInsert = newOrganization.map(function (data) {
          var a = data.label ? data.label: '';
          var b = data.type ? data.type: '';
          var c = data.first_name ? data.first_name: '';
          var d = data.last_name ? data.last_name: '';
          var e = data.address ? data.address: '';
          var f = data.city ? data.city: '';
          var g = data.state ? data.state: '';
          var h = data.zip_code ? data.zip_code: '';
          var i = data.phone_number ? data.phone_number: '';
          var j = data.email ? data.email: '';
          var k = data.latitude ? data.latitude: null;
          var l = data.longitude ? data.longitude: null;

          var sql = "INSERT INTO organizations (organization_name, label, type,  first_name, last_name, address, city,  state, zip_code,  phone_number, email, latitude, longitude)" +
            " VALUES ('"+data.organization_name+ "'," +
            "'"+a+"', '"+b+"', '"+c+"', '"+d+"', '"+e+"', '"+f+"', '"+g+"'," +
            "'"+h+"', '"+i+"', '"+j+"', "+k+", "+l+");";

          return sql;

        });

        // All SQL commands for updates to the DB
        var sqlCommandsForUpdate = updatedOrganizationsFinal.map(function (data) {
          var a = data.label ? data.label: '';
          var b = data.type ? data.type: '';
          // var c = data.website ? data.website: '';
          // var d = data.sampling_device ? data.sampling_device: '';
          var e = data.first_name ? data.first_name: '';
          var f = data.last_name ? data.last_name: '';
          var g = data.address ? data.address: '';
          var h = data.city ? data.city: '';
          var i = data.state ? data.state: '';
          var j = data.zip_code ? data.zip_code: '';
          var k = data.phone_number ? data.phone_number: '';
          // var l = data.fax_number ? data.fax_number: '';
          // var m = data.cell_number ? data.cell_number: '';
          var n = data.email ? data.email: '';
          // var o = data.reposts_url ? data.reposts_url: '';
          var p = data.latitude ? data.latitude: null;
          var q = data.longitude ? data.longitude: null;
          // var r = data.is_partner ? data.is_partner: false;
          // var s = data.is_data_collector ? data.is_data_collector: false;
          // var t = data.non_members_can_call ? data.non_members_can_call: false;
          // var u = data.all_members_can_call ? data.all_members_can_call: false;
          // var v = data.is_archived ? data.is_archived: false;
          // var w = data.can_send_notifications ? data.can_send_notifications: false;
          // var x = data.video_start_time ? data.video_start_time: '';
          // var y = data.video_end_time ? data.video_end_time: '';
          // var z = data.video_is_online ? data.video_is_online: false;
          // var aa = data.video_minutes_to_wait ? data.video_minutes_to_wait: '';
          // var bb = data.admin_user_name ? data.admin_user_name: '';
          // var cc = data.video_time_zone ? data.video_time_zone: '';
          // var dd = data.last_report_entered ? data.last_report_entered: '';
          // var ee = data.clinic_sub_type ? data.clinic_sub_type: '';
          // var ff = data.is_kagen_data_collector ? data.is_kagen_data_collector: false;

          var sql = "UPDATE organizations SET " +
            "label='"+a+"', " +
            "type='"+b+"', " +
            "first_name='"+e+"', " +
            "last_name='"+f+"', " +
            "address='"+g+"', " +
            "city='"+h+"', " +
            "state='"+i+"', " +
            "zip_code='"+j+"', " +
            "phone_number='"+k+"', " +
            "email='"+n+"', " +
            "latitude="+p+", " +
            "longitude="+q+"" +
            " WHERE organization_name = '"+data.organization_name+"';";

          return sql;

        });

        var update = sqlCommandsForUpdate.map(function (x) {
          return x +'\n';
        }).join('').toString();
        var insert = sqlCommandsForInsert.map(function (x) {
          return x +'\n';
        }).join('').toString();


        fs.writeFile('update.sql', update);
        fs.writeFile('insert.sql', insert);

      });
  });

