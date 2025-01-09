todos/roadmap:
  - finish the database setup, server planning (done-ish), and backend file structure
  - finish the node server and routes, controllers for said routes, and schemas to validate req data
  - finish all those docker files and docker compose files for both local and production environments
  - finish the worker thread for the redis bull queue, this listens to queued emails and handles them
  - finish the design and file structure for the typescript react frontend with redux
  - (worst part), connect the client and server and make sure everything works smoothly
  - setup nginx, prep for deployment on railway, deploy the docker containers
  - see how we can use big cloud providers, enter terraform
  - add a bunch of other stuff to over engineer the site (optional)
  - make a better readme and some instructions

extra_notes:
  - try and use the makefile to be lazy and practice it
  - setup the vite.config for local frontend proxy stuff internally on our machine
  - use resend for email sending
  - postgres for the database, redis with bull for the email queue
  - railway as our first provider, use other providers once the site is complete

worst_case_completion_time:
  - server: 1/29
  - queue_worker_thread: 1/31
  - client: 2/29
  - deployment: 3/1

stretch_features:
  - a CI/CD pipeline would be cool, probably using jenkins or github actions
  - image uploading with AWS S3 would add more user functionality, not necessary though
  - web sockets and a way to see how many people viewed an event would be sick, but highly unnecessary
  - google analytics integration, and with web sockets to track mouse movement, imagine, lol, look
  into those types of tools if we finish early for maximum data collection lmao
  - seo optimization, why? Just because
  - server side rendering, although I think we might get that from nginx, highly unsure
  - general speed and site optimizations, refactoring
  - highly document the project (will probably do this anyways with comments)