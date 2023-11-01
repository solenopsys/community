# Converged Framework

Converged is an industrial framework designed for creating digital factories capable of managing thousands of devices. It enables simultaneous processing of business data, such as orders and payments, and the control of production systems. This is achieved through a cluster-based distributed data processing system.


## Architecture

Converged is a framework for creating applications, similar to Android. Any network participant can create and publish their own application.

Converged has a modular architecture that is easy to expand. Micro-frontends are used for the frontend, and microservices for the backend. Converged does not use backends for data access as it used to. Instead, there are specialized data access services.

This framework is designed without bottlenecks. It can have thousands of visual interface modules, as well as thousands of data processing modules. Data processing modules can work on a single computer or on clusters of thousands of servers.
 

## Framework Components

**Micro Frontends** - These are interface modules that can be added and extended dynamically. Any user can create and publish their own micro frontend on the Solenopsys platform, and other network participants can immediately use it.

**Microservices** - These are modules for handling user requests in the backend. They function as containers in a lightweight Kubernetes cluster. Any user can create and publish their own microservice on the Solenopsys platform, and other network participants can immediately use it.

**Data Storage Services** - Instead of traditional databases with regular drivers, Converged uses data storage services. They are wrappers for database drivers that work with the database asynchronously through a message queue.

**Streams** - Data exchange between the frontend and backend occurs through message streams, using WebSockets for the frontend and ZeroMQ within the cluster.

**Routers** - They facilitate interaction between multiple micro frontends and microservices, routing message flows via WebSockets. This is essential for real-time event display.

**Microkernels** - These are specialized containers that process data. They are similar to lambda functions in AWS. For data exchange between microkernels, the ZeroMQ technology is used. Within a single node (computer), the data exchange speed can reach three million messages per second, with a data transfer delay of about 5 microseconds.
