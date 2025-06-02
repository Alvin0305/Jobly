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
    role roles not null
);

create type statuses as enum('Accepted', 'Pending', 'Rejected');

create table requests (
    id serial primary key,
    requestor_id integer references users(id),
    acceptor_id integer references users(id),
    status statuses not null,
    request_date timestamp default now()
);

create table posts(
    id serial primary key,
    user_id integer references users(id),
    blog text,
    description text,
    time timestamp default now()
);

create table tags (
    post_id integer references posts(id),
    user_id integer references users(id),
    primary key (post_id, user_id)
);

create table comments (
    id serial primary key,
    post_id integer references posts(id),
    user_id integer references users(id),
    content text,
    time timestamp default now()
);

create table skills (
    id serial primary key,
    name varchar(100)
);

create table user_skills (
    user_id integer references users(id),
    skill_id integer references skills(id),
    primary key (user_id, skill_id)
);

create table interests (
    id serial primary key,
    name varchar(100)
);

create table user_interests (
    user_id integer references users(id),
    interest_id integer references interests(id),
    primary key (user_id, interest_id)
);

create table qualifications (
    id serial primary key,
    name varchar(100)
);

create table user_qualifications (
    user_id integer references users(id),
    qualification_id integer references qualifications(id),
    primary key (user_id, qualification_id)
);

create table languages (
    id serial primary key,
    name varchar(100)
);

create table user_languages (
    user_id integer references users(id),
    language_id integer references languages(id),
    primary key (user_id, language_id)
);

create table coding_languages (
    id serial primary key,
    name varchar(100)
);

create table user_coding_languages (
    user_id integer references users(id),
    coding_language_id integer references coding_languages(id),
    primary key (user_id, coding_language_id)
);

create table jobs (
    id serial primary key,
    posted_by integer references users(id),
    title text,
    company_name varchar(100),
    description text,
    time timestamp default now(),
    required_experience integer default 0,
    salary integer not null,
    is_filled boolean default false
);

create table job_images (
    job_id integer references jobs(id),
    image_url text,
    primary key (job_id, image_url)
);