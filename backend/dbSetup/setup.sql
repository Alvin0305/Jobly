-- sudo -u postgres psql

create database jobly_db;

\c jobly_db

create type roles as enum('Employee', 'Employer');

create table users (
    id serial primary key,
    firstname varchar(100) not null,
    lastname varchar(100),
    email varchar(255),
    password_hash varchar(255),
    headline varchar(255),
    summary text,
    image text,
    school text,
    college text,
    join_date timestamp default now(),
    is_private boolean default true,
    role roles not null,
    boolean is_active default true
);

create type statuses as enum('Accepted', 'Pending', 'Rejected');

create table requests (
    id serial primary key,
    requestor_id integer references users(id) on delete cascade,
    acceptor_id integer references users(id) on delete cascade,
    status statuses not null,
    request_date timestamp default now()
);

create table posts(
    id serial primary key,
    user_id integer references users(id) on delete cascade,
    blog text,
    description text,
    time timestamp default now()
);

create table tags (
    post_id integer references posts(id) on delete cascade,
    user_id integer references users(id) on delete cascade,
    primary key (post_id, user_id)
);

create table comments (
    id serial primary key,
    post_id integer references posts(id) on delete cascade,
    user_id integer references users(id) on delete cascade,
    content text,
    time timestamp default now()
);

create table skills (
    id serial primary key,
    name varchar(100)
);

create table user_skills (
    user_id integer references users(id) on delete cascade,
    skill_id integer references skills(id) on delete cascade,
    primary key (user_id, skill_id)
);

create table interests (
    id serial primary key,
    name varchar(100)
);

create table user_interests (
    user_id integer references users(id) on delete cascade,
    interest_id integer references interests(id) on delete cascade,
    primary key (user_id, interest_id)
);

create table qualifications (
    id serial primary key,
    name varchar(100)
);

create table user_qualifications (
    user_id integer references users(id) on delete cascade,
    qualification_id integer references qualifications(id) on delete cascade,
    primary key (user_id, qualification_id)
);

create table languages (
    id serial primary key,
    name varchar(100)
);

create table user_languages (
    user_id integer references users(id) on delete cascade,
    language_id integer references languages(id) on delete cascade,
    primary key (user_id, language_id)
);

create table coding_languages (
    id serial primary key,
    name varchar(100)
);

create table user_coding_languages (
    user_id integer references users(id) on delete cascade,
    coding_language_id integer references coding_languages(id) on delete cascade,
    primary key (user_id, coding_language_id)
);

create table jobs (
    id serial primary key,
    posted_by integer references users(id) on delete cascade,
    title text,
    company_name varchar(100),
    description text,
    time timestamp default now(),
    required_experience integer default 0,
    salary integer not null,
    is_filled boolean default false
);

create table job_images (
    job_id integer references jobs(id) on delete cascade,
    image_url text,
    primary key (job_id, image_url)
);

create table friends (
    following_id integer references users(id) on delete cascade,
    follower_id integer references users(id) on delete cascade,
    time timestamp default now(),
    primary key (follower_id, following_id)
);

create table chats (
	id serial primary key,
	name varchar(100),
	is_group boolean default false,
	created_by int references users(id) on delete set null,
	created_at timestamp,
	image text
);

create table messages (
	id serial primary key,
	sender_id int references users(id) on delete cascade,
	chat_id int references chats(id) on delete cascade,
	content text,
	reply_to int references messages(id) on delete set null,
	file_url text,
	is_edited boolean default false,
	is_deleted boolean default false,
	is_pinned boolean default false,
	created_at timestamp default now()
);

create table chat_members (
	id serial primary key,
	chat_id int references chats(id) on delete cascade,
	user_id int references users(id) on delete cascade,
	added_at timestamp,
	is_admin boolean default false
);

create table message_seen (
	id serial primary key,
	message_id int references messages(id) on delete cascade,
	user_id int references users(id) on delete cascade,
	seen_at timestamp default now()
);






create table post_likes (
	post_id int references posts(id) on delete cascade,
	liked_by int references users(id) on delete cascade,
	liked_at timestamp default now(),
	primary key (post_id, liked_by)
);

create type login_status as enum ('Success', 'Failed');

create table login_logs (
	id serial primary key,
	user_id int references users(id) on delete cascade,
	login_at timestamp default now(),
	ip_address varchar(50),
	status login_status
);

create table post_images (
	id serial primary key,
	post_id int references posts(id) on delete cascade,
	image_url text,
	uploaded_at timestamp
);
