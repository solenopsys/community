# Conception 

A modern industrial equipment control system should not resemble an electric control panel with a tangle of wires. It
should appear more like a server rack containing state-of-the-art equipment. Inside such a panel, there should be a
combination of high electrical power hardware and high-performance data processing systems.

The reason for the abundance of wires within control panels with machine controllers is the use of outdated standards
and data transmission protocols.

The Combinatorics framework introduces a new standard for expansion boards based on the M.2
interface, allowing the elimination of numerous wires and equipping equipment with high-speed data communication lines.

#### M2E Hub

The M2E Hub module is a board that contains multiple M2E connectors along one or more edges (using M.2 connectors
labeled B). The board contains an FPGA for integrating signals from connected modules. Each M2E connector is connected
to a separate FPGA port, allowing data transmission voltages ranging from 0.6V to 3.3V. Hub boards can be generated
using the Combinatorics platform service.

#### M2E Modules

M2E modules can include multiple connectors for connecting computational cores based on FPGA SOSC or ARM, which require
more data exchange lines. Data processing cores connect to these connectors, and multiple data exchange interfaces can
be attached to the same connectors. The data transmission interface of M2E modules includes 8 differential pairs and 8
regular data transmission lines.

##### Inverted Module Connectors

Unlike standard M.2 connectors, module boards use female connectors (Mama). This is done for two reasons: modules can be
manufactured based on boards of varying thickness, and the receiving board can be made on an aluminum substrate. M.2
requires a thickness of 0.8 and a double-sided board based on fiberglass; hence, male connectors are located on the Hub
board.

#### M2E Power

Next to each M2E connector, there are 2 bolts designed for securing the module and transferring 24 volts. The maximum
power for one connector is 1000W at 24V and 40A. For power levels exceeding 1000W, high-voltage, high-current busbars
are used on the connectors, and power transfer is achieved through spring contacts. The M.2 board has a 3.3V power
supply. When using high voltages and working with the network, galvanic isolation is established with communication
through digital isolators.
