let validator = require("../functions");

describe("validator", function () {
  it("should change MAC address", function () {
    let address = validator.changeMAC('aa:aa:aa:aa:aa');
    expect(address).toBe('AA:AA:AA:AA:AA');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('ab:4a:12:de:fa');
    expect(address).toBe('AB:4A:12:DE:FA');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('Ab:cD:Ef:aB:Cd');
    expect(address).toBe('AB:CD:EF:AB:CD');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('abcdef99fa');
    expect(address).toBe('AB:CD:EF:99:FA');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('EADFCB');
    expect(address).toBe('EA:DF:CB');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC(':aabb:ccddff:');
    expect(address).toBe('AA:BB:CC:DD:FF');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('aaBB:CCdd:Ee:FF');
    expect(address).toBe('AA:BB:CC:DD:EE:FF');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('hJKSkha23sjDhkh2kahkhdk0hwqafoppsackjkq');
    expect(address).toBe('A2:3D:2A:D0:AF:AC');
  });

  it("should change MAC address", function () {
    let address = validator.changeMAC('А2:ВВ:2f:СС:еe:аа');
    expect(address).toBe('A2:BB:2F:CC:EE:AA');
  });
  it("should change MAC address", function () {
    let address = validator.changeMAC('ав{\o/}ЖsjeС6еф7AсCЕ.№а');
    expect(address).toBe('AB:EC:6E:7A:CC:EA');
  });
  
});    