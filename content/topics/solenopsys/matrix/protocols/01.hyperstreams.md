# HyperStreams 

**HyperStreams** is a binary, lightweight, asynchronous messaging protocol designed specifically for Converged clusters. Its primary goal is to enable fast asynchronous communication between micro frontends and microservices.

## HyperStreams Architecture

HyperStreams does not rely on traditional message queue mechanisms and does not support transactional message transmission. Its architecture is simple and based on routers, which serve as points of message exchange between frontends and backends.

Each router provides connections to frontends via WebSocket and to backends via ZeroMQ. Both of these protocols operate over TCP. HyperStreams is an end-to-end framework whose purpose is to simply transmit messages from one connection to another.

## Why Create a Custom Protocol?

Existing protocols are considered too complex and heavyweight for our needs, and their implementations are too tightly bound to specific platforms. Due to the unique requirements of the task, particularly the creation of digital factories, we need real-time information display. Therefore, a simple binary protocol was developed as the best solution for our needs.

### Some Other Protocol Options:

- **AMQP**: This is an open protocol for message transmission between system components, often used with RabbitMQ. It is similar to HyperStreams but more complex in implementation and lacks support for streams.

- **STOMP**: This text-based protocol is aimed at integration with the Java platform and JMS systems, which are heavyweight and enterprise-oriented.

- **rsocket**: A more suitable protocol compared to STOMP, but all its implementations are focused on Java and intended for enterprise use.

### HyperStreams Components
HyperStreams components are part of the Converged framework.
- **Router instance**: A microservice responsible for message routing and access control.
- **Frontend library**: A library that offers an interface for interacting with HyperStreams and ensures the connection to the router is maintained.
- **Backend libraries**: Libraries for different programming languages that provide an interface for working with HyperStreams on the backend.
