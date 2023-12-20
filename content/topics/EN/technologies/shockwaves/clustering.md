# Clustering

In developing ShockWaves, our focus has been on scalability and compatibility. The ShockWaves platform always operates
in a Kubernetes cluster, even if it's running on a single computer.

- Each ShockWaves node can be used for computations.
- Computations are managed through message queues, allowing for automatic load distribution across cluster nodes.

