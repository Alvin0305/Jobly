--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: login_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.login_status AS ENUM (
    'Success',
    'Failed'
);


--
-- Name: notification_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.notification_type AS ENUM (
    'Friends-Request',
    'Comment',
    'Like'
);


--
-- Name: roles; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.roles AS ENUM (
    'Employee',
    'Employer'
);


--
-- Name: statuses; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.statuses AS ENUM (
    'Accepted',
    'Pending',
    'Rejected'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chats (
    id integer NOT NULL,
    user1_id integer,
    user2_id integer,
    user1_unread integer DEFAULT 0,
    user2_unread integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: coding_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coding_languages (
    id integer NOT NULL,
    name character varying(100)
);


--
-- Name: coding_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coding_languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coding_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coding_languages_id_seq OWNED BY public.coding_languages.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    post_id integer,
    user_id integer,
    content text,
    "time" timestamp without time zone DEFAULT now()
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: domains; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.domains (
    id integer NOT NULL,
    name character varying(100)
);


--
-- Name: domains_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.domains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.domains_id_seq OWNED BY public.domains.id;


--
-- Name: friends; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.friends (
    following_id integer NOT NULL,
    follower_id integer NOT NULL,
    "time" timestamp without time zone DEFAULT now()
);


--
-- Name: job_accepted_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_accepted_users (
    job_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: job_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_images (
    job_id integer NOT NULL,
    image_url text NOT NULL
);


--
-- Name: job_interested_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_interested_users (
    job_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: job_skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_skills (
    job_id integer NOT NULL,
    skill_id integer NOT NULL
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    posted_by integer,
    title text,
    company_name character varying(100),
    description text,
    "time" timestamp without time zone DEFAULT now(),
    required_experience integer DEFAULT 0,
    salary integer NOT NULL,
    is_filled boolean DEFAULT false
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name character varying(100)
);


--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: login_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login_logs (
    id integer NOT NULL,
    user_id integer,
    login_at timestamp without time zone DEFAULT now(),
    ip_address character varying(50),
    status public.login_status DEFAULT 'Success'::public.login_status NOT NULL
);


--
-- Name: login_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.login_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: login_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.login_logs_id_seq OWNED BY public.login_logs.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer,
    chat_id integer,
    content text,
    reply_to integer,
    seen boolean DEFAULT false,
    seen_at time without time zone,
    file_url text,
    is_edited boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    is_pinned boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    content text NOT NULL,
    post_id integer,
    type public.notification_type NOT NULL
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: post_domains; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_domains (
    post_id integer NOT NULL,
    domain_id integer NOT NULL
);


--
-- Name: post_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_images (
    id integer NOT NULL,
    post_id integer,
    image_url text,
    uploaded_at timestamp without time zone
);


--
-- Name: post_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_images_id_seq OWNED BY public.post_images.id;


--
-- Name: post_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_likes (
    post_id integer NOT NULL,
    liked_by integer NOT NULL,
    liked_at timestamp without time zone DEFAULT now()
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer,
    blog text,
    description text,
    "time" timestamp without time zone DEFAULT now()
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: qualifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.qualifications (
    id integer NOT NULL,
    name character varying(100)
);


--
-- Name: qualifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.qualifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: qualifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.qualifications_id_seq OWNED BY public.qualifications.id;


--
-- Name: requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.requests (
    id integer NOT NULL,
    requestor_id integer,
    acceptor_id integer,
    status public.statuses NOT NULL,
    request_date timestamp without time zone DEFAULT now()
);


--
-- Name: requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    post_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: user_coding_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_coding_languages (
    user_id integer NOT NULL,
    coding_language_id integer NOT NULL
);


--
-- Name: user_descriptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_descriptions (
    id integer NOT NULL,
    user_id integer,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: user_descriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_descriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_descriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_descriptions_id_seq OWNED BY public.user_descriptions.id;


--
-- Name: user_interests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_interests (
    user_id integer NOT NULL,
    interest_id integer NOT NULL
);


--
-- Name: user_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_languages (
    user_id integer NOT NULL,
    language_id integer NOT NULL
);


--
-- Name: user_qualifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_qualifications (
    user_id integer NOT NULL,
    qualification_id integer NOT NULL
);


--
-- Name: user_skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_skills (
    user_id integer NOT NULL,
    skill_id integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100),
    email character varying(255),
    password_hash character varying(255),
    headline character varying(255),
    summary text,
    image text,
    school text,
    college text,
    join_date timestamp without time zone DEFAULT now(),
    is_private boolean DEFAULT true,
    role public.roles NOT NULL,
    is_active boolean DEFAULT true
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: work_experience; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.work_experience (
    id integer NOT NULL,
    user_id integer,
    company_name character varying(255) NOT NULL,
    designation character varying(255) NOT NULL,
    start_date date,
    end_date date,
    description text,
    location character varying(255)
);


--
-- Name: work_experience_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.work_experience_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: work_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.work_experience_id_seq OWNED BY public.work_experience.id;


--
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- Name: coding_languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coding_languages ALTER COLUMN id SET DEFAULT nextval('public.coding_languages_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: domains id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.domains ALTER COLUMN id SET DEFAULT nextval('public.domains_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: login_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_logs ALTER COLUMN id SET DEFAULT nextval('public.login_logs_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: post_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_images ALTER COLUMN id SET DEFAULT nextval('public.post_images_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: qualifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.qualifications ALTER COLUMN id SET DEFAULT nextval('public.qualifications_id_seq'::regclass);


--
-- Name: requests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);


--
-- Name: user_descriptions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_descriptions ALTER COLUMN id SET DEFAULT nextval('public.user_descriptions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: work_experience id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_experience ALTER COLUMN id SET DEFAULT nextval('public.work_experience_id_seq'::regclass);


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chats (id, user1_id, user2_id, user1_unread, user2_unread, created_at) FROM stdin;
1	1	2	0	1	2025-06-15 13:15:12.949939
3	1	4	0	0	2025-06-16 18:17:33.735968
4	5	1	0	0	2025-06-16 18:20:01.326794
8	5	4	0	0	2025-06-16 18:43:12.855677
10	5	6	0	0	2025-06-16 18:59:39.323593
11	4	6	0	0	2025-06-16 19:00:34.209028
\.


--
-- Data for Name: coding_languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.coding_languages (id, name) FROM stdin;
1	C
2	C++
3	Java
4	Python
5	JavaScript
6	TypeScript
7	Go
8	Rust
9	C#
10	Kotlin
11	Swift
12	PHP
13	Ruby
14	R
15	SQL
16	NoSQL
17	HTML
18	CSS
19	Bash/Shell
20	MATLAB
21	Dart
22	Scala
23	Perl
24	Assembly
25	Haskell
26	Elixir
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments (id, post_id, user_id, content, "time") FROM stdin;
1	2	1	nice worl	2025-06-20 15:35:06.808007
2	2	1	new comment	2025-06-20 15:42:47.630278
3	2	1	hello	2025-06-20 15:44:20.701933
4	2	1	hi	2025-06-20 15:44:22.473877
5	2	1	abcd	2025-06-20 15:52:57.869477
6	2	1	\N	2025-06-20 15:54:38.532154
7	2	1	hy	2025-06-20 15:57:58.024938
8	2	1	he	2025-06-20 16:01:35.214985
9	2	1	abcdef	2025-06-20 16:04:51.61368
10	2	1	hey hello	2025-06-20 16:06:17.729338
11	2	1	abcdeefhe	2025-06-20 16:06:46.316355
\.


--
-- Data for Name: domains; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.domains (id, name) FROM stdin;
1	Algorithms & Data Structures
2	Operating Systems
3	Computer Networks
4	Database Systems
5	Computer Architecture
6	Compilers
7	Theory of Computation
8	Web Development (Frontend)
9	Web Development (Backend)
10	Mobile App Development
11	Desktop App Development
12	Full Stack Development
13	Game Development
14	Software Engineering & SDLC
15	Machine Learning
16	Deep Learning
17	Natural Language Processing (NLP)
18	Computer Vision
19	Data Science
20	Data Analytics
21	Reinforcement Learning
22	Cybersecurity
23	Cryptography
24	Network Security
25	Ethical Hacking
26	Cloud Computing (AWS, Azure, GCP)
27	DevOps & CI/CD
28	Containerization (Docker, Kubernetes)
29	Discrete Mathematics
30	Graph Theory
31	Linear Algebra for CS
32	Probability & Statistics for CS
33	Embedded Systems
34	Internet of Things (IoT)
35	Distributed Systems
36	Parallel Computing
37	Edge & Fog Computing
38	Quantum Computing
39	Augmented/Virtual Reality (AR/VR)
40	Blockchain & Web3
41	Robotics
42	Digital Signal Processing
\.


--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.friends (following_id, follower_id, "time") FROM stdin;
1	2	2025-06-20 22:16:44.330296
1	4	2025-06-20 22:46:07.526123
1	6	2025-06-20 22:46:08.310252
2	1	2025-07-05 15:50:28.031109
4	2	2025-07-14 12:44:27.585056
9	1	2025-07-15 17:47:50.717536
5	1	2025-07-15 17:47:52.096719
6	1	2025-07-15 17:47:53.435852
7	1	2025-07-15 17:47:54.477927
\.


--
-- Data for Name: job_accepted_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_accepted_users (job_id, user_id) FROM stdin;
1	1
\.


--
-- Data for Name: job_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_images (job_id, image_url) FROM stdin;
1	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1751868432/jobly/job/xmyibvczgzd67mzswqfb.png
\.


--
-- Data for Name: job_interested_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_interested_users (job_id, user_id) FROM stdin;
1	1
\.


--
-- Data for Name: job_skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_skills (job_id, skill_id) FROM stdin;
1	1
1	3
2	39
3	39
4	39
5	1
6	1
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.jobs (id, posted_by, title, company_name, description, "time", required_experience, salary, is_filled) FROM stdin;
1	9	Job 1	Company 1	this is the description of the job	2025-07-07 11:37:12.953326	0	10000	f
2	9	asaubd	abcd	sdvjsodjvsodjvsndjv	2025-07-15 21:22:49.931641	0	1234567	f
3	9	asaubd	abcd	sdvjsodjvsodjvsndjv	2025-07-15 21:23:11.40188	0	1234567	f
4	9	asaubd	abcd	sdvjsodjvsodjvsndjv	2025-07-15 21:23:23.595608	0	1234567	f
5	9	asaubd	abcd	sdvjsodjvsodjvsndjv	2025-07-15 21:23:54.024208	0	1234567	f
6	9	rtyuiop	dfghjkl	rexctfgvbhuinjrxctrbyuhgfctrtvbyuh	2025-07-15 21:26:36.347774	0	45678	f
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.languages (id, name) FROM stdin;
1	English
2	Hindi
3	Spanish
4	French
5	German
6	Chinese
7	Japanese
8	Korean
9	Arabic
10	Portuguese
11	Russian
12	Malayalam
13	Tamil
14	Telugu
15	Bengali
16	Gujarati
17	Punjabi
18	Marathi
19	Urdu
\.


--
-- Data for Name: login_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.login_logs (id, user_id, login_at, ip_address, status) FROM stdin;
1	1	2025-06-14 17:17:18.450135	\N	Success
2	1	2025-06-14 17:25:25.757029	\N	Success
3	1	2025-06-14 17:27:52.631086	\N	Success
4	1	2025-06-14 17:32:02.340777	\N	Success
5	1	2025-06-14 17:32:39.505944	\N	Success
6	1	2025-06-14 17:34:26.918159	\N	Success
7	1	2025-06-14 20:13:48.621391	\N	Success
8	1	2025-06-14 20:16:24.235341	\N	Success
9	1	2025-06-14 20:19:14.413733	\N	Success
10	1	2025-06-14 20:19:22.398993	\N	Success
11	1	2025-06-15 09:42:07.698088	\N	Success
12	1	2025-06-15 12:23:35.765767	\N	Success
13	2	2025-06-15 13:33:41.992784	\N	Success
14	2	2025-06-15 15:36:21.933653	\N	Success
15	2	2025-06-15 15:37:56.574017	\N	Success
16	1	2025-06-15 15:50:24.22389	\N	Success
17	2	2025-06-15 15:50:28.747765	\N	Success
18	1	2025-06-15 15:51:19.376716	\N	Success
19	2	2025-06-15 15:53:38.861171	\N	Success
20	1	2025-06-15 15:59:13.356116	\N	Success
21	2	2025-06-15 15:59:19.979933	\N	Success
22	1	2025-06-15 16:03:24.304098	\N	Success
23	2	2025-06-15 16:03:27.330181	\N	Success
24	1	2025-06-15 16:05:30.377039	\N	Success
25	2	2025-06-15 16:05:33.263339	\N	Success
26	1	2025-06-15 16:06:49.67328	\N	Success
27	2	2025-06-15 16:06:53.591325	\N	Success
28	1	2025-06-15 16:10:36.116712	\N	Success
29	2	2025-06-15 16:10:40.906912	\N	Success
30	1	2025-06-15 16:12:06.279598	\N	Success
31	2	2025-06-15 16:12:12.292992	\N	Success
32	1	2025-06-15 16:12:56.429666	\N	Success
33	2	2025-06-15 16:13:16.342006	\N	Success
34	1	2025-06-15 16:13:57.18369	\N	Success
35	2	2025-06-15 16:14:09.169706	\N	Success
36	1	2025-06-15 16:32:23.292747	\N	Success
37	2	2025-06-15 16:32:28.324009	\N	Success
38	1	2025-06-15 16:43:35.187343	\N	Success
39	2	2025-06-15 16:46:16.028962	\N	Success
40	1	2025-06-15 16:57:05.836825	\N	Success
41	1	2025-06-15 16:57:38.018764	\N	Success
42	1	2025-06-15 16:57:54.473702	\N	Success
43	1	2025-06-15 16:58:02.594022	\N	Success
44	1	2025-06-15 16:58:32.678188	\N	Success
45	1	2025-06-15 16:59:42.533862	\N	Success
46	2	2025-06-15 16:59:56.702299	\N	Success
47	1	2025-06-15 17:08:58.467166	\N	Success
48	2	2025-06-15 17:09:05.479347	\N	Success
49	2	2025-06-15 17:13:58.486177	\N	Success
50	1	2025-06-15 17:14:00.791694	\N	Success
51	1	2025-06-15 17:16:54.42499	\N	Success
52	2	2025-06-15 17:16:59.481085	\N	Success
53	1	2025-06-15 17:18:22.375351	\N	Success
54	2	2025-06-15 17:18:26.721337	\N	Success
55	1	2025-06-15 17:35:34.608037	\N	Success
56	2	2025-06-15 17:35:39.6119	\N	Success
57	2	2025-06-15 20:03:36.159122	\N	Success
58	1	2025-06-15 20:03:38.707793	\N	Success
59	2	2025-06-15 20:06:09.038777	\N	Success
60	1	2025-06-15 20:06:10.972265	\N	Success
61	1	2025-06-15 20:08:59.938762	\N	Success
62	2	2025-06-15 20:09:07.592413	\N	Success
63	2	2025-06-15 20:10:44.310413	\N	Success
64	1	2025-06-15 20:10:45.641882	\N	Success
65	2	2025-06-15 20:11:56.784001	\N	Success
66	1	2025-06-15 20:11:58.32695	\N	Success
67	2	2025-06-15 20:15:22.916619	\N	Success
68	1	2025-06-15 20:15:24.325107	\N	Success
69	2	2025-06-15 20:16:32.984746	\N	Success
70	1	2025-06-15 20:16:34.442714	\N	Success
71	1	2025-06-15 20:21:59.354922	\N	Success
72	2	2025-06-15 20:22:04.690325	\N	Success
73	1	2025-06-15 22:13:29.963143	\N	Success
74	2	2025-06-15 22:13:35.321356	\N	Success
75	2	2025-06-15 22:14:30.535337	\N	Success
76	1	2025-06-15 22:14:32.344793	\N	Success
77	1	2025-06-15 22:15:30.778345	\N	Success
78	2	2025-06-15 22:15:35.574495	\N	Success
79	1	2025-06-15 22:19:35.540046	\N	Success
80	2	2025-06-15 22:19:42.125068	\N	Success
81	2	2025-06-15 22:22:06.194476	\N	Success
82	1	2025-06-15 22:22:07.943068	\N	Success
83	1	2025-06-15 22:29:39.461361	\N	Success
84	2	2025-06-15 22:29:47.060225	\N	Success
85	2	2025-06-15 22:40:01.709393	\N	Success
86	1	2025-06-15 22:40:03.244663	\N	Success
87	1	2025-06-16 10:56:13.878193	\N	Success
88	2	2025-06-16 10:56:23.69927	\N	Success
89	2	2025-06-16 11:17:55.239428	\N	Success
90	1	2025-06-16 11:18:03.134281	\N	Success
91	2	2025-06-16 11:27:59.412771	\N	Success
92	1	2025-06-16 11:28:07.068221	\N	Success
93	2	2025-06-16 11:30:20.565395	\N	Success
94	1	2025-06-16 11:30:23.677433	\N	Success
95	2	2025-06-16 11:32:23.012517	\N	Success
96	1	2025-06-16 11:32:26.033458	\N	Success
97	1	2025-06-16 11:33:44.386808	\N	Success
98	2	2025-06-16 11:33:50.692574	\N	Success
99	1	2025-06-16 11:54:21.295685	\N	Success
100	2	2025-06-16 11:54:27.436326	\N	Success
101	1	2025-06-16 11:55:45.924849	\N	Success
102	2	2025-06-16 11:56:04.206001	\N	Success
103	2	2025-06-16 12:01:20.768258	\N	Success
104	1	2025-06-16 12:01:27.407616	\N	Success
105	1	2025-06-16 12:04:10.62542	\N	Success
106	2	2025-06-16 12:04:12.626414	\N	Success
107	1	2025-06-16 12:05:26.007973	\N	Success
108	2	2025-06-16 12:05:27.570566	\N	Success
109	2	2025-06-16 12:28:17.695056	\N	Success
110	1	2025-06-16 12:28:21.766214	\N	Success
111	1	2025-06-16 19:14:43.899805	\N	Success
112	1	2025-06-16 19:49:10.573941	\N	Success
113	1	2025-06-17 10:21:40.595635	\N	Success
114	1	2025-06-17 13:11:38.312603	\N	Success
115	1	2025-06-17 18:40:28.23773	\N	Success
116	1	2025-06-20 11:10:56.465305	\N	Success
117	1	2025-06-20 13:01:49.150543	\N	Success
118	1	2025-06-21 09:07:05.381601	\N	Success
119	1	2025-07-02 11:44:16.389119	\N	Success
120	1	2025-07-02 21:17:00.285298	\N	Success
121	2	2025-07-02 21:18:22.578387	\N	Success
122	1	2025-07-05 15:47:55.613719	\N	Success
123	1	2025-07-07 11:24:10.778988	\N	Success
124	1	2025-07-14 10:50:17.636143	\N	Success
125	2	2025-07-14 10:51:12.112719	\N	Success
126	1	2025-07-14 12:07:31.462113	\N	Success
127	2	2025-07-14 12:07:44.65131	\N	Success
128	1	2025-07-14 20:07:08.613165	\N	Success
129	9	2025-07-14 20:12:37.275375	\N	Success
130	1	2025-07-15 09:17:24.122904	\N	Success
131	1	2025-07-15 17:19:33.785258	\N	Success
132	1	2025-07-15 17:40:36.457352	\N	Success
133	1	2025-07-15 17:47:29.178391	\N	Success
134	1	2025-07-15 20:30:44.078261	\N	Success
135	2	2025-07-15 20:55:49.574376	\N	Success
136	9	2025-07-15 21:22:16.112851	\N	Success
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages (id, sender_id, chat_id, content, reply_to, seen, seen_at, file_url, is_edited, is_deleted, is_pinned, created_at) FROM stdin;
69	1	1	b	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:32:08.193709
68	1	1	a	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:31:04.740196
6	1	1	hey	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:00:09.818388
9	1	1	hi	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:08:07.004893
14	1	1	hy	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:14:10.160932
15	1	1	s	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:16:20.025681
17	1	1	sa	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:16:38.008918
19	1	1	b	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:17:13.69812
23	1	1	hey	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:31:45.305934
25	1	1	hey	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:33:05.295205
27	1	1	b	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 17:35:56.334269
12	1	1	h	\N	t	12:32:44.103193	\N	t	f	f	2025-06-15 17:13:11.656414
16	1	1	s	\N	t	12:32:44.103193	\N	t	f	f	2025-06-15 17:16:29.841294
13	1	1	ah	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 17:13:22.463175
50	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 20:17:12.593113
71	1	1	hy	\N	t	12:33:56.128703	\N	f	f	f	2025-06-16 12:33:56.116564
74	1	1	pqrst	\N	t	12:39:55.688413	\N	f	f	f	2025-06-16 12:39:55.677414
77	1	1	a	\N	t	12:46:36.689921	\N	f	f	f	2025-06-16 12:46:36.681992
80	1	1	a	\N	t	12:49:41.280598	\N	f	f	f	2025-06-16 12:49:41.26955
83	1	1	b	\N	t	12:57:23.155518	\N	f	f	f	2025-06-16 12:57:23.114103
84	2	1	s	\N	t	12:57:29.174068	\N	f	f	f	2025-06-16 12:57:29.154501
85	1	1	d	\N	t	12:57:37.227952	\N	f	f	f	2025-06-16 12:57:34.729863
88	1	1	\N	\N	t	13:47:31.584516	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750061850/jobly/chat/fonygdzvone1hvod5dxb.pdf	f	f	f	2025-06-16 13:47:31.540435
91	1	1	\N	\N	t	14:12:11.642724	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750063330/jobly/chat/vzrak2sbamrva0or3mn9.pdf	f	f	f	2025-06-16 14:12:11.601298
97	1	1	\N	\N	t	14:37:08.771638	https://res.cloudinary.com/dzv7lbx5r/raw/upload/v1750064828/jobly/chat/yr39rs9v9qgrvjwegp6y	f	f	f	2025-06-16 14:37:08.762684
100	1	1	\N	\N	t	14:52:56.544294	https://res.cloudinary.com/dzv7lbx5r/raw/upload/v1750065775/jobly/chat/kajqpzkgeo1wtbk0zkc3	f	f	f	2025-06-16 14:52:56.536851
103	1	1	a	\N	t	15:16:46.577692	\N	f	f	f	2025-06-16 15:16:46.570814
107	1	1	\N	\N	t	15:27:48.392364	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750067867/jobly/chat/raqminxyvp2ifkanxef1.png	f	f	f	2025-06-16 15:27:48.383943
110	4	3	hey	\N	t	18:18:30.738797	\N	f	f	f	2025-06-16 18:18:30.726734
111	1	3	hello	\N	t	18:18:37.10196	\N	f	f	f	2025-06-16 18:18:37.062927
65	2	1	j	\N	t	12:32:36.848105	\N	f	f	f	2025-06-16 12:28:30.295356
57	2	1	a	\N	t	12:32:36.848105	\N	f	f	f	2025-06-16 11:55:40.58176
4	2	1	hello	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 16:49:43.735217
5	2	1	hey	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 16:51:42.413974
7	2	1	hey	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:07:42.118209
8	2	1	hi	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:07:58.532596
11	2	1	b	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:09:43.557281
18	2	1	a	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:17:06.64265
20	2	1	a	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:18:38.267054
112	4	3	hi	\N	t	18:18:47.710564	\N	f	f	f	2025-06-16 18:18:45.542
115	4	11	a	\N	t	19:00:40.876576	\N	f	f	f	2025-06-16 19:00:38.533047
116	1	3	hello	\N	f	\N	\N	f	f	f	2025-07-14 13:03:35.412638
22	2	1	ca	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:18:48.586926
24	2	1	ok	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:32:39.7665
26	2	1	a	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:35:51.886506
28	2	1	ac	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 17:36:01.366982
43	2	1	helooooooooooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:17:01.22568
29	2	1	S	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 19:08:14.337057
2	2	1	This is the second message	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 14:17:33.850258
30	2	1	\N	\N	t	12:32:36.848105	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1749996528/jobly/chat/ah0uw0zxa7vbrjjzdbzw.webp	f	f	f	2025-06-15 19:38:49.829994
45	2	1	helooooooooooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 20:17:01.929265
47	2	1	helooooooooooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:17:02.441442
117	1	1	vazha	\N	f	\N	\N	f	f	f	2025-07-14 20:10:55.399293
72	1	1	qwert	\N	t	12:35:11.608875	\N	f	f	f	2025-06-16 12:35:11.59967
75	1	1	abc	\N	t	12:45:26.791568	\N	f	f	f	2025-06-16 12:45:26.784124
31	2	1	Update your uploadFiles function to use a FormData object instead of sending JSON.  📦 uploadFiles in userService.js js Copy Edit import axios from "axios";  export const uploadFiles = (files) => {   const formData = new FormData();   for (let file of files) {     formData.append("images", file); // key must match multer field name   }    return axios.post("/api/post/upload", formData, {     headers: {       "Content-Type": "multipart/form-data",     },   }); }; ✅ Make Sure Upload Input Allows Multiple Files In your React component:  jsx Copy Edit <input   type="file"   multiple   onChange={(e) => setSelectedFiles(e.target.files)} /> selectedFiles should be passed directly to uploadFiles.  🧪 Backend Checklist (✅ Already Correct): multer is set to handle .array("images", maxUploadCount) ✅  Controller uploadPostImages checks req.files ✅  Endpoint: POST /api/post/upload ✅	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 19:42:50.711696
32	2	1	helo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 19:43:25.28737
34	2	1	b	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:03:55.140261
44	2	1	helooooooooooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:17:01.577688
56	2	1	he	\N	t	12:32:36.848105	\N	f	f	f	2025-06-16 10:57:10.478034
62	1	1	d	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:06:30.283031
52	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:17:13.104684
78	1	1	a	\N	t	12:46:41.905653	\N	f	f	f	2025-06-16 12:46:41.897545
66	1	1	s	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:28:38.094896
59	1	1	hey	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:02:13.531081
21	1	1	b	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 17:18:42.378864
81	1	1	avd	\N	t	12:52:30.554531	\N	f	f	f	2025-06-16 12:52:30.545617
86	1	1	\N	\N	t	12:58:06.920763	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750058885/jobly/chat/s2k4paqfftqnxo5jb0xo.webp	f	f	f	2025-06-16 12:58:06.894314
33	1	1	a	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:03:47.172596
42	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 20:11:42.31303
39	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:11:41.480853
40	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:11:41.752736
58	1	1	b	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 11:56:08.395828
41	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:11:42.047401
89	1	1	\N	\N	t	13:56:44.754416	https://res.cloudinary.com/dzv7lbx5r/video/upload/v1750062403/jobly/chat/jv2zk7lvwqubmsmmax8j.mp4	f	f	f	2025-06-16 13:56:44.709925
98	1	1	\N	\N	t	14:52:18.457161	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750065737/jobly/chat/nlb3oqjoxnoin4w7flks.png	f	f	f	2025-06-16 14:52:18.449403
101	1	1	\N	\N	t	14:56:59.914225	https://res.cloudinary.com/dzv7lbx5r/raw/upload/v1750066019/jobly/chat/x26xu0ubjeszvhhzwljz.pdf	f	f	f	2025-06-16 14:56:59.906254
104	1	1	\N	\N	t	15:22:40.596168	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750067559/jobly/chat/fhmhyglpqvjrkxmrnwci.png	f	f	f	2025-06-16 15:22:40.585507
108	1	1	\N	\N	t	15:28:01.908693	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750067881/jobly/chat/trgyfurhinsxlgnkrjpy.png	f	f	f	2025-06-16 15:28:01.900387
73	1	1	abcdef	\N	t	12:37:09.401021	\N	f	f	f	2025-06-16 12:37:09.392704
76	1	1	qwd	\N	t	12:46:17.241074	\N	f	f	f	2025-06-16 12:46:17.229291
79	1	1	hgi	\N	t	12:48:37.460071	\N	f	f	f	2025-06-16 12:48:37.414376
82	1	1	a	\N	t	12:55:47.617578	\N	f	f	f	2025-06-16 12:55:47.609228
87	1	1	\N	\N	t	13:47:01.90754	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750061821/jobly/chat/trqba71cu1fsekiv6frj.png	f	f	f	2025-06-16 13:47:01.893538
90	1	1	\N	\N	t	14:06:45.627166	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750063005/jobly/chat/houxx8ke0xrqbm7rgxdw.pdf	f	f	f	2025-06-16 14:06:45.604265
96	1	1	\N	\N	t	14:34:30.464673	https://res.cloudinary.com/dzv7lbx5r/raw/upload/v1750064670/jobly/chat/ptu2i89k1dksckskueaw	f	f	f	2025-06-16 14:34:30.453743
99	1	1	\N	\N	t	14:52:39.295276	https://res.cloudinary.com/dzv7lbx5r/video/upload/v1750065758/jobly/chat/en3tpjgvxukzu43jrqza.mp4	f	f	f	2025-06-16 14:52:39.255787
102	1	1	\N	\N	t	14:57:43.706451	https://res.cloudinary.com/dzv7lbx5r/raw/upload/v1750066063/jobly/chat/pqgeywykend0ml2ki1h3	f	f	f	2025-06-16 14:57:43.699729
105	1	1	girl image	\N	t	15:23:19.709238	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750067599/jobly/chat/db84uwvfeifgt1uxnnfz.png	f	f	f	2025-06-16 15:23:19.700041
46	2	1	helooooooooooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	f	f	2025-06-15 20:17:02.2319
35	2	1	helloooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:11:29.50235
37	2	1	helloooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:11:32.816933
36	2	1	helloooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:11:32.393604
38	2	1	helloooooooooooooooooooooooooooooooooooooooooo	\N	t	12:32:36.848105	\N	f	t	f	2025-06-15 20:11:33.216423
67	2	1	p	\N	t	12:32:36.848105	\N	f	f	f	2025-06-16 12:28:47.518839
61	1	1	b	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:05:46.473836
63	1	1	g	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:07:48.147427
53	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 20:17:13.351352
54	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 20:17:13.560744
49	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:17:12.304259
51	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	t	f	2025-06-15 20:17:12.856905
48	1	1	hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii	\N	t	12:32:44.103193	\N	f	f	f	2025-06-15 20:17:11.985635
55	1	1	abcd	46	t	12:32:44.103193	\N	t	f	f	2025-06-15 22:40:17.413047
60	1	1	a	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:04:30.002097
64	1	1	a	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:09:33.858603
70	1	1	hi	\N	t	12:32:44.103193	\N	f	f	f	2025-06-16 12:32:44.061015
106	1	1	girl image	\N	t	15:23:28.072852	\N	f	f	f	2025-06-16 15:23:28.066347
109	1	1	\N	\N	t	15:36:40.441479	\N	f	t	f	2025-06-16 15:36:40.433745
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, sender_id, receiver_id, content, post_id, type) FROM stdin;
1	1	1	Alvin commented on your post	2	Comment
2	1	1	Alvin commented on your post	2	Comment
3	1	1	Alvin commented on your post	2	Comment
4	1	1	Alvin liked your post	2	Like
5	1	1	Alvin liked your post	3	Like
6	1	1	Alvin liked your post	4	Like
7	1	1	Alvin liked your post	5	Like
8	1	1	Alvin liked your post	6	Like
9	1	1	Alvin unliked your post	3	Like
10	1	1	Alvin unliked your post	2	Like
11	1	1	Alvin liked your post	2	Like
12	1	1	Alvin liked your post	3	Like
13	1	1	Alvin unliked your post	3	Like
14	1	1	Alvin liked your post	3	Like
15	1	4	Alvin sent a friend request	\N	Friends-Request
16	1	5	Alvin sent a friend request	\N	Friends-Request
17	1	4	Alvin sent a friend request	\N	Friends-Request
18	1	5	Alvin sent a friend request	\N	Friends-Request
19	1	4	Alvin sent a friend request	\N	Friends-Request
20	1	5	Alvin sent a friend request	\N	Friends-Request
21	1	4	Alvin sent a disconnection request	\N	Friends-Request
22	1	5	Alvin sent a disconnection request	\N	Friends-Request
23	1	4	Alvin sent a friend request	\N	Friends-Request
24	1	6	Alvin sent a friend request	\N	Friends-Request
25	1	4	Alvin sent a friend request	\N	Friends-Request
26	1	6	Alvin sent a friend request	\N	Friends-Request
27	1	6	Alvin sent a disconnection request	\N	Friends-Request
28	1	1	Alvin liked your post	7	Like
29	1	1	Alvin unliked your post	7	Like
30	1	5	Alvin sent a friend request	\N	Friends-Request
31	1	5	Alvin sent a disconnection request	\N	Friends-Request
32	1	2	Alvin sent a disconnection request	\N	Friends-Request
33	1	2	Alvin sent a friend request	\N	Friends-Request
34	1	2	Alvin sent a disconnection request	\N	Friends-Request
35	1	2	Alvin sent a friend request	\N	Friends-Request
36	1	9	Alvin sent a friend request	\N	Friends-Request
37	1	5	Alvin sent a friend request	\N	Friends-Request
38	1	6	Alvin sent a friend request	\N	Friends-Request
39	1	7	Alvin sent a friend request	\N	Friends-Request
\.


--
-- Data for Name: post_domains; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post_domains (post_id, domain_id) FROM stdin;
1	1
2	4
3	5
3	4
4	3
5	1
5	39
6	1
6	39
6	40
7	1
7	40
7	18
9	39
9	1
9	28
9	18
8	10
1	10
1	11
12	1
12	39
12	28
12	42
12	27
14	1
14	18
14	27
14	13
15	1
16	28
\.


--
-- Data for Name: post_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post_images (id, post_id, image_url, uploaded_at) FROM stdin;
1	2	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1749008762/jobly/post/dg6haotmyrjquiojseef.jpg	\N
2	3	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1749008762/jobly/post/dg6haotmyrjquiojseef.jpg	\N
3	3	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1749008604/jobly/post/mlsv6cjpw3k5kaxp7cpi.jpg	\N
4	3	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1749007845/jobly/post/ndleeqfzcknloc9d25fo.jpg	\N
5	4	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1749008604/jobly/post/mlsv6cjpw3k5kaxp7cpi.jpg	\N
6	5	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750146442/jobly/post/fhparsokgdi5tohmbeik.png	\N
7	5	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750146441/jobly/post/va2kb6oycyu6aiakczei.png	\N
8	8	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750400693/jobly/post/nmxzf5tps1nicb781cvg.jpg	\N
9	9	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750479671/jobly/post/klcy08m5nogvj0ep2g2d.jpg	\N
10	10	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750479847/jobly/post/w99gjadhhlghbl23h6qc.jpg	\N
11	11	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750480148/jobly/post/tjqyraexchcyciakyljn.jpg	\N
12	12	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1750480178/jobly/post/qf00xbqx6wx5rna6vogx.jpg	\N
\.


--
-- Data for Name: post_likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post_likes (post_id, liked_by, liked_at) FROM stdin;
1	2	2025-06-20 16:46:17.435213
1	1	2025-06-20 16:46:28.186528
4	1	2025-06-20 17:03:08.333556
5	1	2025-06-20 17:03:30.20595
6	1	2025-06-20 17:09:51.512192
2	1	2025-06-20 17:16:05.373741
3	1	2025-06-20 19:49:59.585906
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, user_id, blog, description, "time") FROM stdin;
1	1	Understand memory management and internals (mutability, object identity, reference counting).\n\nMaster multithreading, multiprocessing, and async programming (asyncio).\n\nWork with design patterns and architecture principles.\n\nBuild production-level APIs with authentication (JWT, OAuth).\n\nUse advanced OOP (mixins, abstract base classes, metaclasses).\n\nWork with real-world tools like Docker, CI/CD, and cloud services (e.g., AWS Lambda).\n\nContribute to or build Python libraries and frameworks.\n\nUnderstand performance optimization, profiling, and debugging tools.	Understand memory management and internals (mutability, object identity, reference counting).\n\n	2025-06-14 17:24:10.578677
2	1	\N	Would you like me to generate the exact commands for your current folder structure or check which branch your repo is using?	2025-06-14 17:47:29.802946
3	1	\N	Would you like me to generate the exact commands for your current folder structure or check which branch your repo is using?	2025-06-14 17:49:15.856839
4	1	\N	Would you like me to generate the exact commands for your current folder structure or check which branch your repo is using?	2025-06-14 17:55:32.437158
5	1		this is the description of the post	2025-06-17 13:17:22.631289
6	1	this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. 	This is the description of the post	2025-06-17 13:19:37.047891
7	1	this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. this is the content of the post. 	this is the description of the post. 	2025-06-17 13:21:12.929696
8	1		 this is a long description this is a long description this is a long description this is a long description this is a long description this is a long description this is a long description this is a long description this is a long description 	2025-06-20 11:54:54.617297
9	1		 blogblogblogblog  blogblogblogblog  blogblogblogblog  blogblogblogblog  blogblogblogblog 	2025-06-21 09:51:12.783635
10	1		abcd	2025-06-21 09:54:08.788003
11	1		this is the description of the post	2025-06-21 09:59:09.059502
12	1		New post	2025-06-21 09:59:39.143647
13	1	 this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post	and this is the description	2025-06-21 10:00:23.214133
14	1	 this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post	and this is the description	2025-06-21 10:00:44.360872
15	1	 this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post this is the blog of the post	and this is the description	2025-06-21 10:01:02.182776
16	1	 this is the blog of the post this is the blog of the post this is the blog of the post	 this is the blog of the post this is the blog of the post	2025-06-21 10:03:05.251087
\.


--
-- Data for Name: qualifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.qualifications (id, name) FROM stdin;
\.


--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.requests (id, requestor_id, acceptor_id, status, request_date) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tags (post_id, user_id) FROM stdin;
\.


--
-- Data for Name: user_coding_languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_coding_languages (user_id, coding_language_id) FROM stdin;
\.


--
-- Data for Name: user_descriptions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_descriptions (id, user_id, description, created_at) FROM stdin;
15	2	hiiiiiiiiiii	2025-07-15 21:18:56.50221
\.


--
-- Data for Name: user_interests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_interests (user_id, interest_id) FROM stdin;
1	1
1	2
1	3
1	4
\.


--
-- Data for Name: user_languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_languages (user_id, language_id) FROM stdin;
\.


--
-- Data for Name: user_qualifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_qualifications (user_id, qualification_id) FROM stdin;
\.


--
-- Data for Name: user_skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_skills (user_id, skill_id) FROM stdin;
1	1
1	3
1	5
2	1
2	2
2	4
4	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, firstname, lastname, email, password_hash, headline, summary, image, school, college, join_date, is_private, role, is_active) FROM stdin;
7	user	1	user@gmail.com	$2b$10$l684YBmzeEZb6hLg0cbOweAn1ENFExo.BJQEGm4yuE8qBpl4V1AXS	Software Developer	Turning thoughts into code as NITC sophomore	\N	\N	\N	2025-06-17 19:15:04.118767	t	Employer	t
8	user	2	user2@gmail.com	$2b$10$FM7fZpe1BHf0pcFYJ9VltO4OsxpIXScDmXonUdE6XS3Ilsrhe1hhm	Software Developer	Turning thoughts into code as NITC sophomore	\N	\N	\N	2025-06-17 19:15:48.683386	t	Employer	t
6	public	user	pubilc@gmail.com	$2b$10$D8U9AtjWIE3s15oxrSy66OGvAeyoNVOCMcrs0YiMkdlKqsOyjo7zC	Software Developer	Turning thoughts into code as NITC sophomore	\N	\N	\N	2025-06-16 18:45:09.824735	f	Employer	t
10	user1		user1@gmail.com	$2b$10$7ChKjAGS6pyyIEn3Q0JkzODRFP7rzlFiVsoWtZig5Xuz3oOmMamsm	\N	\N	\N	\N	\N	2025-07-15 17:42:25.432376	t	Employee	t
4	Durga	Suresh	durga@gmail.com	$2b$10$SqIa/CgXk/DwQLVsuXhbTuETKtC4vP8ThzBEsLVpoOLXFpXnsexB6	Software Developer	Turning thoughts into code as NITC sophomore	\N	\N	\N	2025-06-16 18:10:25.945229	t	Employee	t
5	Kiran	Nambiar	kiran@gmail.com	$2b$10$OHZtHeDv5R3EqyVM8RHkvuJ9rLwyzLgdyT8vKU9HzeF64vCRW.0DS	Software Developer	Turning thoughts into code as NITC sophomore	\N	\N	\N	2025-06-16 18:19:54.096547	t	Employee	t
11	user3		user3@gmail.com	$2b$10$/YUxF5BtJBd./XBVciESveaUzUXjEiQNyMZwOR37anjJjANjo45um	\N	\N	\N	\N	\N	2025-07-15 17:43:42.395643	t	Employee	t
12	user4		user4@gmail.com	$2b$10$/8JQLiTuqS.1YDxwzikBxeMJYAKD2qC3YD6dgkICWMGzmVHBIAEli	\N	\N	\N	\N	\N	2025-07-15 17:44:05.475934	t	Employee	t
13	user5		user5@gmail.com	$2b$10$w4rfGWSpz5.uvFGgCRLrx.nfMg9wJ3019c6y.atdS27cdxxgKypp2	\N	\N	\N	\N	\N	2025-07-15 17:44:25.613965	t	Employee	t
1	Alvin	A S	alvinanildas@gmail.com	$2b$10$.bG51ld8IzYFtFqrVaF7NuGSy4Brx1RsaDrcXsbmU0g3fNAE9iQDC	Software Developer	Turning thoughts into code as NITC sophomore	/boy.png	\N	\N	2025-06-14 17:16:17.134521	t	Employee	t
2	Athira	Antony	athira@gmail.com	$2b$10$nCNP7MgOWSYzaXmnuOBI7OJjMM1ZrLeszFzgEm5IgcHfv61oSlnda	Software Developer	Turning thoughts into code as NITC sophomore	https://res.cloudinary.com/dzv7lbx5r/image/upload/v1752593210/jobly/user/anltubk20l4mwsruafxs.jpg	\N	\N	2025-06-14 17:30:35.144549	t	Employee	t
9	employer	1	employer1@gmail.com	$2b$10$9kgpm1lnDwXVo3sA6KG7P.WovpHvJcctn9x5L9na0zf0jHkecmS3W	\N	\N	\N	\N	\N	2025-07-07 11:26:39.280403	f	Employer	t
\.


--
-- Data for Name: work_experience; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.work_experience (id, user_id, company_name, designation, start_date, end_date, description, location) FROM stdin;
\.


--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.chats_id_seq', 11, true);


--
-- Name: coding_languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coding_languages_id_seq', 26, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 11, true);


--
-- Name: domains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.domains_id_seq', 42, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 6, true);


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.languages_id_seq', 19, true);


--
-- Name: login_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.login_logs_id_seq', 136, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messages_id_seq', 117, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notifications_id_seq', 39, true);


--
-- Name: post_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_images_id_seq', 12, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 16, true);


--
-- Name: qualifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.qualifications_id_seq', 1, false);


--
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.requests_id_seq', 1, false);


--
-- Name: user_descriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_descriptions_id_seq', 15, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: work_experience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.work_experience_id_seq', 1, false);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: coding_languages coding_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coding_languages
    ADD CONSTRAINT coding_languages_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: domains domains_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);


--
-- Name: friends friends_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (follower_id, following_id);


--
-- Name: job_accepted_users job_accepted_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_accepted_users
    ADD CONSTRAINT job_accepted_users_pkey PRIMARY KEY (job_id, user_id);


--
-- Name: job_images job_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_images
    ADD CONSTRAINT job_images_pkey PRIMARY KEY (job_id, image_url);


--
-- Name: job_interested_users job_interested_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_interested_users
    ADD CONSTRAINT job_interested_users_pkey PRIMARY KEY (job_id, user_id);


--
-- Name: job_skills job_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_skills
    ADD CONSTRAINT job_skills_pkey PRIMARY KEY (job_id, skill_id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: login_logs login_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_logs
    ADD CONSTRAINT login_logs_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: post_domains post_domains_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_domains
    ADD CONSTRAINT post_domains_pkey PRIMARY KEY (post_id, domain_id);


--
-- Name: post_images post_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_images
    ADD CONSTRAINT post_images_pkey PRIMARY KEY (id);


--
-- Name: post_likes post_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_pkey PRIMARY KEY (post_id, liked_by);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: qualifications qualifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.qualifications
    ADD CONSTRAINT qualifications_pkey PRIMARY KEY (id);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (post_id, user_id);


--
-- Name: user_coding_languages user_coding_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_coding_languages
    ADD CONSTRAINT user_coding_languages_pkey PRIMARY KEY (user_id, coding_language_id);


--
-- Name: user_descriptions user_descriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_descriptions
    ADD CONSTRAINT user_descriptions_pkey PRIMARY KEY (id);


--
-- Name: user_interests user_interests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_interests
    ADD CONSTRAINT user_interests_pkey PRIMARY KEY (user_id, interest_id);


--
-- Name: user_languages user_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT user_languages_pkey PRIMARY KEY (user_id, language_id);


--
-- Name: user_qualifications user_qualifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_qualifications
    ADD CONSTRAINT user_qualifications_pkey PRIMARY KEY (user_id, qualification_id);


--
-- Name: user_skills user_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_pkey PRIMARY KEY (user_id, skill_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: work_experience work_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_experience
    ADD CONSTRAINT work_experience_pkey PRIMARY KEY (id);


--
-- Name: chats chats_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: chats chats_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: friends friends_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: friends friends_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: job_accepted_users job_accepted_users_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_accepted_users
    ADD CONSTRAINT job_accepted_users_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: job_accepted_users job_accepted_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_accepted_users
    ADD CONSTRAINT job_accepted_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: job_images job_images_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_images
    ADD CONSTRAINT job_images_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: job_interested_users job_interested_users_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_interested_users
    ADD CONSTRAINT job_interested_users_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: job_interested_users job_interested_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_interested_users
    ADD CONSTRAINT job_interested_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: job_skills job_skills_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_skills
    ADD CONSTRAINT job_skills_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: job_skills job_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_skills
    ADD CONSTRAINT job_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.domains(id) ON DELETE CASCADE;


--
-- Name: jobs jobs_posted_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_posted_by_fkey FOREIGN KEY (posted_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: login_logs login_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_logs
    ADD CONSTRAINT login_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;


--
-- Name: messages messages_reply_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_reply_to_fkey FOREIGN KEY (reply_to) REFERENCES public.messages(id) ON DELETE SET NULL;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: notifications notifications_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: post_domains post_domains_domain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_domains
    ADD CONSTRAINT post_domains_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES public.domains(id) ON DELETE CASCADE;


--
-- Name: post_domains post_domains_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_domains
    ADD CONSTRAINT post_domains_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_images post_images_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_images
    ADD CONSTRAINT post_images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_likes post_likes_liked_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_liked_by_fkey FOREIGN KEY (liked_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: post_likes post_likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: requests requests_acceptor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_acceptor_id_fkey FOREIGN KEY (acceptor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: requests requests_requestor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_requestor_id_fkey FOREIGN KEY (requestor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tags tags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: tags tags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_coding_languages user_coding_languages_coding_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_coding_languages
    ADD CONSTRAINT user_coding_languages_coding_language_id_fkey FOREIGN KEY (coding_language_id) REFERENCES public.coding_languages(id) ON DELETE CASCADE;


--
-- Name: user_coding_languages user_coding_languages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_coding_languages
    ADD CONSTRAINT user_coding_languages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_descriptions user_descriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_descriptions
    ADD CONSTRAINT user_descriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_interests user_interests_interest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_interests
    ADD CONSTRAINT user_interests_interest_id_fkey FOREIGN KEY (interest_id) REFERENCES public.domains(id) ON DELETE CASCADE;


--
-- Name: user_interests user_interests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_interests
    ADD CONSTRAINT user_interests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_languages user_languages_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT user_languages_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON DELETE CASCADE;


--
-- Name: user_languages user_languages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT user_languages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_qualifications user_qualifications_qualification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_qualifications
    ADD CONSTRAINT user_qualifications_qualification_id_fkey FOREIGN KEY (qualification_id) REFERENCES public.qualifications(id) ON DELETE CASCADE;


--
-- Name: user_qualifications user_qualifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_qualifications
    ADD CONSTRAINT user_qualifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_skills user_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.domains(id) ON DELETE CASCADE;


--
-- Name: user_skills user_skills_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: work_experience work_experience_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_experience
    ADD CONSTRAINT work_experience_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

