# SHOCK Protocol

**SHOCK Protocol** it's a binary Streaming (S), High-throughput (H), Open (O) protocol for Computing (C) on lite Kernels (K).
Designed specifically for Solenopsys Infrastructure.
 Its primary goal is to enable realtime asynchronous communication between User Iterface, microservices,compute Kernels and Devices.

## SHOCK Protocol Architecture
It is application-level protocol.

SHOCK Protocol does not rely on traditional message queue mechanisms and does not support transactional message
transmission. Its architecture is simple and based on routers, which serve as points of message exchange between
frontends and backends.

For transport layer SHOCK Protocol uses WebSocket and ZeroMQ or another Packages protocols.

Each router provides connections to frontends via WebSocket and to backends via ZeroMQ. Both of these protocols operate
over TCP. SHOCK Protocol is an end-to-end framework whose purpose is to simply transmit messages from one connection to
another.


Process - это вычислительный процесс к которому относится стрим сообщений, у этого процесса есть состояние которое
хранться в кеше.
Object - адрес объекта к которому идет обращение (это может быть микросервис, ядро, устройство)
Method - метод который вызывается на объекте (это может быть функция, событие, свойство)


## Структура пакета

### Заголовок 
1 байт - указывают структуру заголовка и длинну полей
Биты
- 5 бит определяют длинну поля Process
- 2 Бита определяют 0-3 байт на Object
- 1 Бит определяет функцию

### Длинна полей
- Process Может быть длинной от 0 до 16 байт.
- Object Может быть длинной от 0 до 3 байт.
- Method Может быть длинной от 0 до 1 байт.

Максимальная длинна заголовка 21 байт, минимальная 1 байт.

Поле процесс имет структуру
- Инициатор
- ID процесса
- ID sub процесса (может несколько)


Длинна заголовка может меняться


## Why Create a Custom Protocol?

Existing protocols are considered too complex and heavyweight for our needs, and their implementations are too tightly
bound to specific platforms. Due to the unique requirements of the task, particularly the creation of digital factories,
we need real-time information display. Therefore, a simple binary protocol was developed as the best solution for our
needs.

### Some Other Protocol Options:

- **AMQP**: This is an open protocol for message transmission between system components, often used with RabbitMQ. It is
  similar to SHOCK Protocol but more complex in implementation and lacks support for streams.

- **STOMP**: This text-based protocol is aimed at integration with the Java platform and JMS systems, which are
  heavyweight and enterprise-oriented.

- **rsocket**: A more suitable protocol compared to STOMP, but all its implementations are focused on Java and intended
  for enterprise use.

### SHOCK Protocol Components

SHOCK Protocol components are part of the Converged framework.

- **Router instance**: A microservice responsible for message routing and access control.
- **Frontend library**: A library that offers an interface for interacting with SHOCK Protocol and ensures the
  connection to the router is maintained.
- **Backend libraries**: Libraries for different programming languages that provide an interface for working with SHOCK
  Protocol on the backend.
