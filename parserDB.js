var Transform = require('stream').Transform;
var csv = require('csv-streamify');
var JSONStream = require('JSONStream');
var compare = require('./compare.js');

var csvToJson = csv({objectMode: true});

var parser = new Transform({objectMode: true});

parser.header = null;
parser._rawHeader = [];
parser._transform = function(data, encoding, done) {

    this.push({
      organization_name: data[1],
      label: data[2],
      type: data[3],
      website: data[4],
      sampling_device: data[5],
      first_name: data[6],
      last_name: data[7],
      address: data[8],
      city: data[9],
      state: data[10],
      zip_code: data[11],
      phone_number: data[12],
      fax_number: data[13],
      cell_number: data[14],
      email: data[15],
      reposts_url: data[16],
      latitude: data[17],
      longitude: data[18],
      is_partner: data[19],
      is_data_collector: data[20],
      non_members_can_call: data[21],
      all_members_can_call: data[22],
      is_archived: data[23],
      can_send_notifications: data[24],
      video_start_time: data[25],
      video_end_time: data[26],
      video_is_online: data[27],
      video_minutes_to_wait: data[28],
      admin_user_name: data[29],
      video_time_zone: data[30],
      last_report_entered: data[31],
      clinic_sub_type: data[32],
      is_kagen_data_collector: data[33]
    });
  done();
};

var jsonToStrings = JSONStream.stringify(false);

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(jsonToStrings)
.pipe(process.stdout);



