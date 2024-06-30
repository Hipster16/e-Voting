const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Evoting", (m) => {
  const evoting = m.contract("Evoting");
  console.log(evoting);
  return { evoting };
});