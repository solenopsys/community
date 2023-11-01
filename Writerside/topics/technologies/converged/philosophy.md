# Philosophy

**Minimalism** - using a minimal set of fundamental elements in a variety of variations, with maximum reusability and universality.

**Rejecting the integration of heavyweight systems** with their own complex infrastructure in favor of lightweight basic technologies with customizable user interfaces (UI modules). Examples of heavyweight systems include Gitlab, Grafana, MAAS, and OpenStack. Reasons for this decision include redundancy (90% of the functionality of these systems is unnecessary), a high entry threshold for users, complex integration and deployment, a lack of control over internal infrastructure and the visual interface, and high resource demands.

**Rejecting the integration of applications with their own UI interfaces**. Examples of applications with their own UI interfaces include Octoprint, Kubernetes Dashboard, Portainer, and Cockpit. You can use any development tools, but they should **not** be embedded as modules in the Solenopsys platform.

**Rejecting the integration of NGX components**, if there is a high-quality component with well-written code, it can be integrated directly into UiMatrix, provided with a license, or linked to it in one of the ui-matrix libraries by creating a wrapper.

**Rejecting ready-made design systems and CSS frameworks**. For example, Material, Human, Fluent, Foundation, Bootstrap, Angular UI. These frameworks impose strict constraints on interface design and do not align with the task of creating real-time interfaces for digital factories, complex integration, and redundancy. We will use the best design system practices but focus on creating a monolithic, modern, fast, and high-quality real-time interface.

**Ready-made integrations** - creating Converged modules based on existing open-source projects. For example, database systems like PostgreSQL, Mongo, and others.
