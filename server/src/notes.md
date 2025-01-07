owner:
  can change a user into an admin \
  and vice versa
  can ban a user or admin
  can delete any event
  can delete any email template
  can create an event
  can create an email template
  can edit any event
  can edit any email template
  can send emails to specific people \
  or all people on the email list
  can remove user from email list
  can view users
  can view email list
  can view email templates
  can view events
  cannot edit their own account
  cannot delete their account

admin:
  can ban a user
  can delete their own created events
  can delete their own created email templates
  can create an event
  can create an email template
  can edit their own event
  can edit their own email template
  can send emails to specific people \
  or all people on the email list
  can remove user from email list
  can view users
  can view email list
  can view email templates
  can view events
  cannot edit their own accoun
  cannot delete their account

user:
  can view events
  can view users
  cannot view, create, edit the email list
  cannot view, create, edit any email templates
  can register for an event
  can unregister for an event
  can subscribe to email list
  can unsubscribe to email list
  can verify email
  can edit their own account
  can create account
  can delete account

todo//
  add routing for email native login \
  - email verification codes
  - pending user creation
  define the respective tables mentioned

http_routes//
  /users    

  /email_list

  /email_templates

  /auth

  /events

notes//
  a join table between users and their emails would be useful \
  you can return just emails or map them to names
  use banning as a way to avoid information loss from potential \
  bad actors, not deleting owner and admin users is essential
  it goes without saying that if you can create, edit, or delete \
  something, then you can view it as well
  native login / signup will use jwts and http only cookies
  events can have images, to make this project harder, use AWS S3

packages//
  use joi schemas for data validation
  use resend for native email verification \
  and general email sending
  use redis bull for queue functionality

middleware//
  check if someone is an admin, owner, or regular user
  validate request data with a joi schema dynamically
  verify a jwt to ensure authentication

routes//
  routes to manage auth, login, signup, and refreshing tokens
  routes to manage users, includes admins and anything that \
  affects a users account, like banning, deleting, etc.
  routes to manage events, includes anything related to events
  routes to manage email templates, includes anything related \
  to the email templates
  routes to manage the email list, includes anything related \
  to the email list and email subscriptions for a user

database//
  a postgres class can be used to make dynamicly access \
  different tables in our postgres database
  a redis database can be used with bull for queuing \
  we can use delays with bull to have scheduled emails \
  and push to the redis queue normally for instant emails \
  a worker thread will be used to handle tasks from the queue \
  in a non-blocking manner as you might do in a real queue system

app//
  a web app where users can create or login to an account \
  with github, google, or natively, the app is meant to \
  serve as a hub of events for student users to see \
  events posted by admins and the owner, the owner \
  and admins can also manage email messaging with \
  this app via creating email templates and sending \
  emails using our mail list which users are automatically \
  invited to join upon signup, so like an onboarding thing \
  we might use a boolean for that actually

  possible_database_tables//
    notes///
      member is the default for a user just signing up

    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      role VARCHAR(20) CHECK (role IN ('owner', 'admin', 'member')) NOT NULL,
      google_id VARCHAR(255),
      github_id VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      user_name VARCHAR(50) UNIQUE,
      icon_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_subscribed_to_emails BOOLEAN DEFAULT FALSE,
      is_onboarded BOOLEAN DEFAULT FALSE
    );
  `;

  const createEventTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      details TEXT,
      cover_image_url TEXT,
      posted_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      latitude DECIMAL(9, 6),
      longitude DECIMAL(9, 6),
      date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      address TEXT,
      people_going INTEGER DEFAULT 0,
      type VARCHAR(20) CHECK (type IN ('in-person', 'virtual')) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createEmailTemplateTableQuery = `
    CREATE TABLE IF NOT EXISTS email_templates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      template_name VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      html_content TEXT NOT NULL,
      created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;