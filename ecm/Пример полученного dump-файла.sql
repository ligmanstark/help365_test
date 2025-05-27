--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE rpa;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD '***********************************';






--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10
-- Dumped by pg_dump version 11.10

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10
-- Dumped by pg_dump version 11.10

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10
-- Dumped by pg_dump version 11.10

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
-- Name: rpa; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE rpa WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE rpa OWNER TO postgres;

\connect rpa

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: audit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit (
    id integer NOT NULL,
    "desc" text,
    error text,
    action_type character varying(256),
    model character varying(256),
    success boolean DEFAULT false,
    "user" character varying(256),
    model_uuid character varying(256),
    system character varying(256),
    bot character varying(256),
    ip character varying(256),
    created timestamp without time zone,
    updated timestamp without time zone
);


ALTER TABLE public.audit OWNER TO postgres;

--
-- Name: audit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.audit_id_seq OWNER TO postgres;

--
-- Name: audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_id_seq OWNED BY public.audit.id;


--
-- Name: bots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bots (
    uuid uuid NOT NULL,
    name character varying(256),
    "desc" character varying(2048),
    status smallint,
    ip character varying(256),
    groups uuid[] DEFAULT '{}'::uuid[],
    env text,
    version character varying(256),
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bots OWNER TO postgres;

--
-- Name: ext_ctx; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ext_ctx (
    name character varying(250),
    "desc" character varying(250) NOT NULL,
    json text NOT NULL,
    ext_id character varying(150),
    uuid uuid NOT NULL
);


ALTER TABLE public.ext_ctx OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    uuid uuid NOT NULL,
    name character varying(256),
    "desc" character varying(2048),
    created timestamp without time zone,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    version bigint,
    created_at timestamp with time zone
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: processes_versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.processes_versions (
    uuid uuid NOT NULL,
    name character varying(250) NOT NULL,
    "desc" character varying(1000) DEFAULT ''::character varying,
    version integer DEFAULT 0,
    hash character varying(100) NOT NULL,
    user_rep boolean DEFAULT false NOT NULL,
    created timestamp without time zone NOT NULL,
    os character varying(10) DEFAULT 'Windows'::character varying NOT NULL,
    used_format integer DEFAULT 1 NOT NULL,
    user_uuid uuid NOT NULL,
    process_uuid uuid NOT NULL
);


ALTER TABLE public.processes_versions OWNER TO postgres;

--
-- Name: COLUMN processes_versions.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.processes_versions.name IS 'название';


--
-- Name: COLUMN processes_versions."desc"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.processes_versions."desc" IS 'описание';


--
-- Name: COLUMN processes_versions.version; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.processes_versions.version IS 'версия';


--
-- Name: COLUMN processes_versions.hash; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.processes_versions.hash IS 'Хэш переданный клиентом';


--
-- Name: COLUMN processes_versions.created; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.processes_versions.created IS 'когда загружен данный процесс в репозитарий';


--
-- Name: process_version_actual; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.process_version_actual AS
 WITH actualversions AS (
         SELECT pv.process_uuid,
            max(pv.version) AS version
           FROM public.processes_versions pv
          WHERE (pv.user_rep = false)
          GROUP BY pv.process_uuid
        )
 SELECT v.uuid
   FROM (actualversions ma
     JOIN public.processes_versions v ON (((ma.process_uuid = v.process_uuid) AND (ma.version = v.version) AND (v.user_rep = false))));


ALTER TABLE public.process_version_actual OWNER TO postgres;

--
-- Name: processes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.processes (
    uuid uuid NOT NULL,
    active boolean DEFAULT true NOT NULL,
    groups uuid[] DEFAULT '{}'::uuid[],
    created timestamp without time zone NOT NULL
);


ALTER TABLE public.processes OWNER TO postgres;

--
-- Name: TABLE processes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.processes IS 'RPA процессы';


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    process character varying(256),
    format text,
    context text,
    active boolean DEFAULT false,
    date_from timestamp without time zone,
    date_to timestamp without time zone,
    created timestamp without time zone DEFAULT now(),
    updated timestamp without time zone DEFAULT now(),
    name character varying(256),
    description character varying(2048)
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- Name: schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_id_seq OWNER TO postgres;

--
-- Name: schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;


--
-- Name: servers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servers (
    uuid uuid NOT NULL,
    name character varying(512),
    "desc" character varying(2048),
    active boolean,
    address character varying(512),
    status smallint DEFAULT 1 NOT NULL,
    type character varying(256),
    created timestamp without time zone NOT NULL,
    sync_date timestamp without time zone,
    key text
);


ALTER TABLE public.servers OWNER TO postgres;

--
-- Name: systems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.systems (
    uuid uuid NOT NULL,
    name character varying(256),
    "desc" character varying(2048),
    status smallint,
    ip character varying(256),
    config text,
    service boolean DEFAULT false NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.systems OWNER TO postgres;

--
-- Name: task_ctx; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_ctx (
    id integer NOT NULL,
    task_id integer NOT NULL,
    process character varying(36) NOT NULL,
    ctx text NOT NULL,
    version integer DEFAULT 0 NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.task_ctx OWNER TO postgres;

--
-- Name: TABLE task_ctx; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.task_ctx IS 'Контексты процессов';


--
-- Name: COLUMN task_ctx.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task_ctx.id IS 'Id записи';


--
-- Name: COLUMN task_ctx.task_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task_ctx.task_id IS 'task id переданный оркестровщиком';


--
-- Name: COLUMN task_ctx.process; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task_ctx.process IS 'токен rpa процесса';


--
-- Name: COLUMN task_ctx.ctx; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task_ctx.ctx IS 'контекст с которым должен выполниться rpa процесс ';


--
-- Name: task_ctx_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_ctx_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_ctx_id_seq OWNER TO postgres;

--
-- Name: task_ctx_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_ctx_id_seq OWNED BY public.task_ctx.id;


--
-- Name: task_ctx_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_ctx_token (
    task_ctx_id integer NOT NULL,
    token character varying(36) NOT NULL
);


ALTER TABLE public.task_ctx_token OWNER TO postgres;

--
-- Name: TABLE task_ctx_token; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.task_ctx_token IS 'Одноразовый токен для доступа к контексту процесса ';


--
-- Name: COLUMN task_ctx_token.token; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task_ctx_token.token IS 'Токен для одноразового доступа к контексту task_ctx';


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    process character varying(256),
    task_token character varying(1024),
    status integer,
    priority integer,
    output_ctx text,
    version integer DEFAULT 0 NOT NULL,
    groups uuid[] DEFAULT '{}'::uuid[],
    bot uuid,
    system uuid,
    log text,
    created timestamp without time zone,
    metrics text,
    planner_id integer,
    updated timestamp without time zone DEFAULT now() NOT NULL,
    processed boolean DEFAULT false
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: TABLE tasks; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tasks IS 'задачи';


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uuid uuid NOT NULL,
    login character varying(512),
    password character varying(512),
    email character varying(512),
    full_name character varying(2048),
    role smallint DEFAULT 2,
    groups uuid[] DEFAULT '{}'::uuid[],
    created timestamp without time zone,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: audit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit ALTER COLUMN id SET DEFAULT nextval('public.audit_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);


--
-- Name: task_ctx id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_ctx ALTER COLUMN id SET DEFAULT nextval('public.task_ctx_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Data for Name: audit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit (id, "desc", error, action_type, model, success, "user", model_uuid, system, bot, ip, created, updated) FROM stdin;
1	License Info	\N	Read	Status	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:32:30.99627	\N
2	License Set | Key: **************************************************************************************************************************************************************************************************************	\N	Update	Status	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:47:13.706709	2021-09-08 11:47:13.71099
3	License Info	\N	Read	Status	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:47:13.719068	\N
4	License Info	\N	Read	Status	t	\N	\N	\N	\N	172.18.0.1	2021-09-08 11:47:15.767179	\N
5	get Server status	\N	Status	Status	t	\N	\N	\N	\N	172.18.0.1	2021-09-08 11:47:20.777177	\N
6	Login: admin	\N	Login	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 11:47:24.50967	2021-09-08 11:47:24.56508
7	CheckAuth	\N	CheckAuth	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 11:47:24.574377	2021-09-08 11:47:24.576477
8	get Server status	\N	Status	Status	t	\N	\N	\N	\N	172.18.0.1	2021-09-08 11:48:47.831315	\N
9	get Server status	\N	Status	Status	t	\N	\N	\N	\N	172.18.0.1	2021-09-08 11:49:13.120918	\N
10	get Server status	\N	Status	Status	t	\N	\N	\N	\N	172.18.0.1	2021-09-08 11:49:14.364152	\N
11	CheckAuth	access denied	CheckAuth	User	f	\N	\N	\N	\N	172.18.0.1	2021-09-08 11:49:15.627836	\N
12	Login: admin	\N	Login	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 11:49:32.618355	2021-09-08 11:49:32.673618
13	CheckAuth	\N	CheckAuth	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 11:49:32.678917	2021-09-08 11:49:32.680954
15	Public repo list: page: 0, limit: 1000, groups: 	\N	GetPublicList	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:32.921846	2021-09-08 11:49:32.930712
14	UserRepo List: uuid: , page: 0, limit: 1000	\N	List	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:32.918188	2021-09-08 11:49:32.930805
16	CheckAuth	\N	CheckAuth	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 11:49:35.425962	2021-09-08 11:49:35.427828
17	RepoGen Actual. Page: 0, limit: 100, extId: 	\N	List	ExtContext	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:35.435304	2021-09-08 11:49:35.438493
18	UserRepo Upload	\N	Upload	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:41.299835	2021-09-08 11:49:41.309728
19	UserRepo List: uuid: , page: 0, limit: 1000	\N	List	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:41.317971	2021-09-08 11:49:41.322112
20	Public repo list: page: 0, limit: 1000, groups: 	\N	GetPublicList	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:41.318515	2021-09-08 11:49:41.323535
21	UserRepo InfoReq: 20c8b8ea-a728-4890-8f9e-bf4ffc6e8e9c	\N	Info	ProcessDesigner	t	********-****-****-****-************	20c8b8ea-a728-4890-8f9e-bf4ffc6e8e9c	\N	\N	172.18.0.1	2021-09-08 11:49:41.734456	2021-09-08 11:49:41.737384
22	UserRepo Download process: 20c8b8ea-a728-4890-8f9e-bf4ffc6e8e9c	\N	Download	ProcessDesigner	t	********-****-****-****-************	20c8b8ea-a728-4890-8f9e-bf4ffc6e8e9c	\N	\N	172.18.0.1	2021-09-08 11:49:41.748645	2021-09-08 11:49:41.751729
23	UserRepo List: uuid: , page: 0, limit: 1000	\N	List	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:45.083019	2021-09-08 11:49:45.086684
24	Public repo list: page: 0, limit: 1000, groups: 	\N	GetPublicList	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:45.083047	2021-09-08 11:49:45.089419
25	UserRepo Publication: 20c8b8ea-a728-4890-8f9e-bf4ffc6e8e9c | process: 69124c53-c9d8-4843-83a3-454a22bdc928	\N	Public	ProcessDesigner	t	********-****-****-****-************	20c8b8ea-a728-4890-8f9e-bf4ffc6e8e9c	\N	\N	172.18.0.1	2021-09-08 11:49:48.055646	2021-09-08 11:49:48.062402
26	UserRepo List: uuid: , page: 0, limit: 1000	\N	List	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:48.069455	2021-09-08 11:49:48.072117
27	Public repo list: page: 0, limit: 1000, groups: 	\N	GetPublicList	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:49:48.069469	2021-09-08 11:49:48.073709
28	Page: 0, Limit: 0, SimpleSearch: 	\N	List	Group	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:56:32.682544	2021-09-08 11:56:32.688213
29	Public repo list: page: 1, limit: 10, groups: 	\N	GetPublicList	ProcessDesigner	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:56:32.68644	2021-09-08 11:56:32.695631
30	Page: 1, Limit: 10, Status: 2, SimpleFilter: 	\N	List	System	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 11:56:35.127136	2021-09-08 11:56:35.132022
31	get Server status	\N	Status	Status	t	\N	\N	\N	\N	172.18.0.1	2021-09-08 12:01:52.78001	\N
32	System registration | system uuid: b93eb3c5-d1e6-4734-8b9c-a6b5df854665	\N	Create	System	t	\N	b93eb3c5-d1e6-4734-8b9c-a6b5df854665	b93eb3c5-d1e6-4734-8b9c-a6b5df854665	\N	172.18.0.1, 172.18.0.3	2021-09-08 12:02:18.311194	2021-09-08 12:02:18.3252
33	Login: admin	\N	Login	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 12:02:35.726947	2021-09-08 12:02:35.787959
34	CheckAuth	\N	CheckAuth	User	t	********-****-****-****-************	********-****-****-****-************	\N	\N	172.18.0.1	2021-09-08 12:02:35.798325	2021-09-08 12:02:35.801928
35	Page: 1, Limit: 10, Status: 2, SimpleFilter: 	\N	List	System	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 12:02:38.764502	2021-09-08 12:02:38.769509
36	Page: 1, Limit: 10, Status: 1, SimpleFilter: 	\N	List	System	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 12:02:40.472354	2021-09-08 12:02:40.476735
37	System Uuid: b93eb3c5-d1e6-4734-8b9c-a6b5df854665, Name: ELMA365, Desc: ELMA BPM System, Status: 2, Host: , Login: , Pass: , Auth Token: 	\N	Update	System	t	********-****-****-****-************	b93eb3c5-d1e6-4734-8b9c-a6b5df854665	\N	\N	172.18.0.1	2021-09-08 12:07:35.231873	2021-09-08 12:07:35.240638
38	Page: 1, Limit: 10, Status: 2, SimpleFilter: 	\N	List	System	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 12:07:35.248255	2021-09-08 12:07:35.252554
39	Page: 1, Limit: 10, Status: 2, SimpleFilter: 	\N	List	System	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 12:07:47.311964	2021-09-08 12:07:47.318644
40	Page: 1, Limit: 10, Status: 2, SimpleFilter: 	\N	List	System	t	********-****-****-****-************	\N	\N	\N	172.18.0.1	2021-09-08 12:07:47.587032	2021-09-08 12:07:47.591549
\.


--
-- Data for Name: bots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bots (uuid, name, "desc", status, ip, groups, env, version, created, updated) FROM stdin;
\.


--
-- Data for Name: ext_ctx; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ext_ctx (name, "desc", json, ext_id, uuid) FROM stdin;
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (uuid, name, "desc", created, updated) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, version, created_at) FROM stdin;
1	1	2021-09-08 11:47:17.499387+00
2	2	2021-09-08 11:47:17.505642+00
3	3	2021-09-08 11:47:17.508468+00
\.


--
-- Data for Name: processes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.processes (uuid, active, groups, created) FROM stdin;
69124c53-c9d8-4843-83a3-454a22bdc928	t	{}	2021-09-08 11:49:41.303771
\.


--
-- Data for Name: processes_versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.processes_versions (uuid, name, "desc", version, hash, user_rep, created, os, used_format, user_uuid, process_uuid) FROM stdin;
********-****-****-****-************	*******	\N	1	*******************************	f	2021-09-08 11:49:48.059416	Windows	1	********-****-****-****-************	********-****-****-****-************
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule (id, process, format, context, active, date_from, date_to, created, updated, name, description) FROM stdin;
\.


--
-- Data for Name: servers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servers (uuid, name, "desc", active, address, status, type, created, sync_date, key) FROM stdin;
********-****-****-****-************	rpa-server	\N	t	\N	2	that	2021-09-08 11:32:06.696414	\N	**************************************************************************************************************************************************************************************************************
\.


--
-- Data for Name: systems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.systems (uuid, name, "desc", status, ip, config, service, created, updated) FROM stdin;
********-****-****-****-************	webGrpc	\N	2	\N	\N	t	2021-09-08 11:32:07.321944	2021-09-08 11:32:07.321944
********-****-****-****-************	repository	\N	2	\N	\N	t	2021-09-08 11:47:21.868697	2021-09-08 11:47:21.868697
********-****-****-****-************	orchestra	\N	2	\N	\N	t	2021-09-08 11:47:22.207662	2021-09-08 11:47:22.207662
********-****-****-****-************	ELMA365	ELMA BPM System	2	172.18.0.1, 172.18.0.3	{"Pwd":"","Host":"","Login":"","ApplicationToken":""}	f	2021-09-08 12:02:18.320173	2021-09-08 12:07:35.237094
\.


--
-- Data for Name: task_ctx; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_ctx (id, task_id, process, ctx, version, created) FROM stdin;
\.


--
-- Data for Name: task_ctx_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_ctx_token (task_ctx_id, token) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, process, task_token, status, priority, output_ctx, version, groups, bot, system, log, created, metrics, planner_id, updated, processed) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uuid, login, password, email, full_name, role, groups, created, updated) FROM stdin;
********-****-****-****-************	admin	********************************/********-****-****-****-************	admin@admin.com		1	{}	2021-09-08 11:30:31.966781	2021-09-08 11:30:31.966781
\.


--
-- Name: audit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_id_seq', 40, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 3, true);


--
-- Name: schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_id_seq', 1, false);


--
-- Name: task_ctx_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_ctx_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);


--
-- Name: audit audit_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT audit_pk PRIMARY KEY (id);


--
-- Name: bots bots_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bots
    ADD CONSTRAINT bots_pk PRIMARY KEY (uuid);


--
-- Name: ext_ctx ext_ctx_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ext_ctx
    ADD CONSTRAINT ext_ctx_pk PRIMARY KEY (uuid);


--
-- Name: groups groups_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pk PRIMARY KEY (uuid);


--
-- Name: users new_users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT new_users_pk PRIMARY KEY (uuid);


--
-- Name: processes processes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT processes_pk PRIMARY KEY (uuid);


--
-- Name: processes_versions processes_versions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.processes_versions
    ADD CONSTRAINT processes_versions_pk PRIMARY KEY (uuid);


--
-- Name: servers servers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servers
    ADD CONSTRAINT servers_pk PRIMARY KEY (uuid);


--
-- Name: systems systems_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.systems
    ADD CONSTRAINT systems_pk PRIMARY KEY (uuid);


--
-- Name: task_ctx task_ctx_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_ctx
    ADD CONSTRAINT task_ctx_pk PRIMARY KEY (id);


--
-- Name: tasks tasks_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pk PRIMARY KEY (id);


--
-- Name: bots_uuid_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bots_uuid_uindex ON public.bots USING btree (uuid);


--
-- Name: ext_ctx_ext_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ext_ctx_ext_id_index ON public.ext_ctx USING btree (ext_id);


--
-- Name: groups_uuid_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX groups_uuid_uindex ON public.groups USING btree (uuid);


--
-- Name: new_users_uuid_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX new_users_uuid_uindex ON public.users USING btree (uuid);


--
-- Name: processes_token_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX processes_token_uindex ON public.processes USING btree (uuid);


--
-- Name: processes_versions_uuid_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX processes_versions_uuid_uindex ON public.processes_versions USING btree (uuid);


--
-- Name: servers_uuid_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX servers_uuid_uindex ON public.servers USING btree (uuid);


--
-- Name: systems_uuid_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX systems_uuid_uindex ON public.systems USING btree (uuid);


--
-- Name: task_ctx_task_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX task_ctx_task_id_index ON public.task_ctx USING btree (task_id DESC);


--
-- Name: task_ctx_token_task_ctx_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX task_ctx_token_task_ctx_id_uindex ON public.task_ctx_token USING btree (task_ctx_id);


--
-- Name: tasks_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tasks_id_uindex ON public.tasks USING btree (id);


--
-- Name: users_login_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_login_uindex ON public.users USING btree (login);


--
-- Name: processes_versions processes_versions_processes_uuid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.processes_versions
    ADD CONSTRAINT processes_versions_processes_uuid_fk FOREIGN KEY (process_uuid) REFERENCES public.processes(uuid);


--
-- Name: processes_versions processes_versions_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.processes_versions
    ADD CONSTRAINT processes_versions_user_id_fk FOREIGN KEY (user_uuid) REFERENCES public.users(uuid);


--
-- Name: task_ctx_token task_ctx_token_task_ctx_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_ctx_token
    ADD CONSTRAINT task_ctx_token_task_ctx_id_fk FOREIGN KEY (task_ctx_id) REFERENCES public.task_ctx(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

