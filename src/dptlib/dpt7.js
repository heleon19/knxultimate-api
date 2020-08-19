/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2020 Supergiovane
*/

//
// DPT7: 16-bit unsigned integer value
//


const util = require('util');
const knxLog = require('./../KnxLog');

exports.formatAPDU = function (value) {
    var apdu_data = new Buffer(2);
    if (!isFinite(value)) {
        knxLog.get().warn("DPT7: cannot write non-numeric or undefined value");
    } else {
        if (value < 0 || value > 65535) {
            knxLog.get().warn("DPT7: value must be between 0 and 65535. Auto adjousting.");
            if (value < 0) value = 0;
            if (value > 65535) value = 65535;
        }
        apdu_data[0] = value >> 8;
        apdu_data[1] = value & 0xff;
    }
    return apdu_data;
}

exports.fromBuffer = function (buf) {
    if (buf.length != 2) {
        knxLog.get().warn("DPT7.fromBuffer: buf should be 2 bytes long (got %d bytes)", buf.length);
    } else {
        return (buf[0] * 256) + buf[1]
    }
}



exports.basetype = {
    "bitlength": 16,
    "signedness": "unsigned",
    "valuetype": "basic",
    "desc": "16-bit unsigned value"
}

// DPT subtypes info
exports.subtypes = {
    // 7.001 pulses
    "001": {
        "use": "G",
        "name": "DPT_Value_2_Ucount",
        "desc": "pulses",
        "unit": "pulses"
    },

    // 7.002 time(ms)
    "002": {
        "use": "G",
        "name": "DPT_TimePeriodMsec",
        "desc": "time (ms)",
        "unit": "milliseconds"
    },

    // 7.003 time (10ms)
    "003": {
        "use": "G",
        "name": "DPT_TimePeriod10Msec",
        "desc": "time (10ms)",
        "unit": "centiseconds"
    },

    // 7.004 time (100ms)
    "004": {
        "use": "G",
        "name": "DPT_TimePeriod100Msec",
        "desc": "time (100ms)",
        "unit": "deciseconds"
    },

    // 7.005 time (sec)
    "005": {
        "use": "G",
        "name": "DPT_TimePeriodSec",
        "desc": "time (s)",
        "unit": "seconds"
    },

    // 7.006 time (min)
    "006": {
        "use": "G",
        "name": "DPT_TimePeriodMin",
        "desc": "time (min)",
        "unit": "minutes"
    },

    // 7.007 time  (hour)
    "007": {
        "use": "G",
        "name": "DPT_TimePeriodHrs",
        "desc": "time (hrs)",
        "unit": "hours"
    },

    // 7.010 DPT_PropDataType
    // not to be used in runtime communications!
    "010": {
        "use": "FB",
        "name": "DPT_PropDataType",
        "desc": "Identifier Interface Object Property data type "
    },

    // 7.011
    "011": {
        "use": "FB SAB",
        "name": "DPT_Length_mm",
        "desc": "Length in mm",
        "unit": "mm"
    },

    // 7.012
    "012": {
        "use": "FB",
        "name": "DPT_UEICurrentmA",
        "desc": "bus power supply current (mA)",
        "unit": "mA"
    },

    // 7.013
    "013": {
        "use": "FB",
        "name": "DPT_Brightness",
        "desc": "interior brightness",
        "unit": "lux"
    },

    // 7.600 Kelvin
    "600": {
        "use": "FB",
        "name": "DPT_Absolute_Colour_Temperature",
        "desc": "absolute colour temperature (K).",
        "unit": "K",
        "range" : [0, 65535]
    }
}
