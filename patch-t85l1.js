const fs = require("fs");
const path = require("path");

const clientRoot = path.join(
  __dirname,
  "node_modules",
  "eufy-security-client",
  "build"
);

const T85L1_TYPE = 211;
const typeFile = path.join(clientRoot, "http", "types.js");
const deviceFile = path.join(clientRoot, "http", "device.js");
const stationFile = path.join(clientRoot, "http", "station.js");
const securityFile = path.join(clientRoot, "eufysecurity.js");
const sessionFile = path.join(clientRoot, "p2p", "session.js");

function replaceOnce(file, search, replacement) {
  const source = fs.readFileSync(file, "utf8");
  if (source.includes(replacement)) {
    return;
  }
  if (!source.includes(search)) {
    throw new Error(`Patch anchor not found in ${file}: ${search}`);
  }
  fs.writeFileSync(file, source.replace(search, replacement));
}

function replaceAll(file, search, replacement) {
  const source = fs.readFileSync(file, "utf8");
  if (source.includes(replacement)) {
    return;
  }
  const patched = source.split(search).join(replacement);
  if (patched === source) {
    throw new Error(`Patch anchor not found in ${file}: ${search}`);
  }
  fs.writeFileSync(file, patched);
}

replaceOnce(
  typeFile,
  '    DeviceType[DeviceType["LOCK_85P0"] = 209] = "LOCK_85P0";',
  `    DeviceType[DeviceType["LOCK_85P0"] = 209] = "LOCK_85P0";
    DeviceType[DeviceType["LOCK_85L1"] = ${T85L1_TYPE}] = "LOCK_85L1";`
);

replaceOnce(
  typeFile,
  '        209: "FamiLock E34 (T85P0)",',
  `        209: "FamiLock E34 (T85P0)",
        ${T85L1_TYPE}: "Smart Lock C34 (T85L1)",`
);

replaceOnce(
  typeFile,
  "    [DeviceType.LOCK_85V0]: exports.LockT85V0DeviceProperties,",
  `    [DeviceType.LOCK_85V0]: exports.LockT85V0DeviceProperties,
    [DeviceType.LOCK_85L1]: exports.LockT85V0DeviceProperties,`
);

replaceOnce(
  typeFile,
  "    [DeviceType.LOCK_85P0]: {\n        ...exports.BaseStationProperties,\n    },",
  `    [DeviceType.LOCK_85P0]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_85L1]: {
        ...exports.BaseStationProperties,
    },`
);

replaceOnce(
  typeFile,
  "    [DeviceType.LOCK_85P0]: [CommandName.DeviceLockCalibration],",
  `    [DeviceType.LOCK_85P0]: [CommandName.DeviceLockCalibration],
    [DeviceType.LOCK_85L1]: [
        CommandName.DeviceLockCalibration,
        CommandName.DeviceAddUser,
        CommandName.DeviceDeleteUser,
        CommandName.DeviceUpdateUserPasscode,
        CommandName.DeviceUpdateUserSchedule,
        CommandName.DeviceUpdateUsername,
    ],`
);

replaceOnce(
  deviceFile,
  "            Device.isLockWifiT85L0(type) ||",
  `            Device.isLockWifiT85L0(type) ||
            Device.isLockWifiT85L1(type) ||`
);

replaceOnce(
  deviceFile,
  "    static isLockWifiT85L0(type) {\n        return types_1.DeviceType.LOCK_85L0 == type;\n    }",
  `    static isLockWifiT85L0(type) {
        return types_1.DeviceType.LOCK_85L0 == type;
    }
    static isLockWifiT85L1(type) {
        return types_1.DeviceType.LOCK_85L1 == type || type === ${T85L1_TYPE};
    }`
);

replaceOnce(
  deviceFile,
  '            sn.startsWith("T85L0") ||',
  `            sn.startsWith("T85L0") ||
            sn.startsWith("T85L1") ||`
);

replaceOnce(
  deviceFile,
  "    isLockWifiT85L0() {\n        return Device.isLockWifiT85L0(this.rawDevice.device_type);\n    }",
  `    isLockWifiT85L0() {
        return Device.isLockWifiT85L0(this.rawDevice.device_type);
    }
    isLockWifiT85L1() {
        return Device.isLockWifiT85L1(this.rawDevice.device_type);
    }`
);

replaceOnce(
  deviceFile,
  '        else if (this.isLockWifiT85V0()) {\n            metadata = {\n                ...types_1.LockT85V0DeviceProperties,\n            };\n            metadata[types_1.PropertyName.Type].states[this.getDeviceType()] = "FamiLock S3 (T85V0)";\n        }',
  `        else if (this.isLockWifiT85V0()) {
            metadata = {
                ...types_1.LockT85V0DeviceProperties,
            };
            metadata[types_1.PropertyName.Type].states[this.getDeviceType()] = "FamiLock S3 (T85V0)";
        }
        else if (this.isLockWifiT85L1()) {
            metadata = {
                ...types_1.LockT85V0DeviceProperties,
            };
            metadata[types_1.PropertyName.Type].states[this.getDeviceType()] = "Smart Lock C34 (T85L1)";
        }`
);

replaceAll(
  stationFile,
  "device.isLockWifiT85L0() ||",
  `device.isLockWifiT85L0() ||
            device.isLockWifiT85L1() ||`
);

replaceAll(
  stationFile,
  "Device.isLockWifiT85L0(this.getDeviceType()) ||",
  `Device.isLockWifiT85L0(this.getDeviceType()) ||
      Device.isLockWifiT85L1(this.getDeviceType()) ||`
);

replaceAll(
  stationFile,
  "!device_1.Device.isLockWifiT85L0(stationData.device_type) &&",
  `!device_1.Device.isLockWifiT85L0(stationData.device_type) &&
            !device_1.Device.isLockWifiT85L1(stationData.device_type) &&`
);

replaceAll(
  stationFile,
  "Device.isLockWifiT85L0(stationData.device_type) ||",
  `Device.isLockWifiT85L0(stationData.device_type) ||
                                            Device.isLockWifiT85L1(stationData.device_type) ||`
);

replaceAll(
  securityFile,
  "!device.isLockWifiT85L0())",
  `!device.isLockWifiT85L0() &&
                    !device.isLockWifiT85L1())`
);

replaceAll(
  securityFile,
  "device.isLockWifiT85L0())",
  `device.isLockWifiT85L0() ||
                            device.isLockWifiT85L1())`
);

replaceAll(
  sessionFile,
  "device_1.Device.isLockWifiT85L0(this.rawStation.devices[0]?.device_type) ||",
  `device_1.Device.isLockWifiT85L0(this.rawStation.devices[0]?.device_type) ||
                                            device_1.Device.isLockWifiT85L1(this.rawStation.devices[0]?.device_type) ||`
);

console.log("Applied eufy-security-client T85L1 compatibility patch.");
