--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

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

SET default_table_access_method = heap;

--
-- Name: detalles_solicitud; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.detalles_solicitud (
    id integer NOT NULL,
    solicitud_id integer NOT NULL,
    rol_id integer NOT NULL,
    cantidad_puestos integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.detalles_solicitud OWNER TO diegocoghlan;

--
-- Name: detalles_solicitud_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.detalles_solicitud_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalles_solicitud_id_seq OWNER TO diegocoghlan;

--
-- Name: detalles_solicitud_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.detalles_solicitud_id_seq OWNED BY public.detalles_solicitud.id;


--
-- Name: empleados; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.empleados (
    id integer NOT NULL,
    nombre_completo character varying(200) NOT NULL,
    rol_id integer,
    activo boolean NOT NULL
);


ALTER TABLE public.empleados OWNER TO diegocoghlan;

--
-- Name: empleados_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.empleados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empleados_id_seq OWNER TO diegocoghlan;

--
-- Name: empleados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.empleados_id_seq OWNED BY public.empleados.id;


--
-- Name: equipos; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.equipos (
    id integer NOT NULL,
    tipo_equipo character varying(100),
    modelo character varying(100),
    numero_serie character varying(100) NOT NULL,
    estado character varying(50) NOT NULL,
    costo numeric(12,2),
    especificaciones jsonb,
    fecha_ingreso date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.equipos OWNER TO diegocoghlan;

--
-- Name: equipos_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.equipos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipos_id_seq OWNER TO diegocoghlan;

--
-- Name: equipos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.equipos_id_seq OWNED BY public.equipos.id;


--
-- Name: historial_asignaciones; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.historial_asignaciones (
    id integer NOT NULL,
    equipo_id integer NOT NULL,
    empleado_id integer NOT NULL,
    asignado boolean NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    resposable_id integer NOT NULL
);


ALTER TABLE public.historial_asignaciones OWNER TO diegocoghlan;

--
-- Name: historial_asignaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.historial_asignaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.historial_asignaciones_id_seq OWNER TO diegocoghlan;

--
-- Name: historial_asignaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.historial_asignaciones_id_seq OWNED BY public.historial_asignaciones.id;


--
-- Name: perfiles_requerimientos; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.perfiles_requerimientos (
    id integer NOT NULL,
    rol_id integer,
    tipo_equipo character varying(100),
    cantidad integer
);


ALTER TABLE public.perfiles_requerimientos OWNER TO diegocoghlan;

--
-- Name: perfiles_requerimientos_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.perfiles_requerimientos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perfiles_requerimientos_id_seq OWNER TO diegocoghlan;

--
-- Name: perfiles_requerimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.perfiles_requerimientos_id_seq OWNED BY public.perfiles_requerimientos.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre_rol character varying(100) NOT NULL
);


ALTER TABLE public.roles OWNER TO diegocoghlan;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO diegocoghlan;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: solicitudes_equipamento; Type: TABLE; Schema: public; Owner: diegocoghlan
--

CREATE TABLE public.solicitudes_equipamento (
    id integer NOT NULL,
    nombre_solicitud character varying(200),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado character varying(50) DEFAULT 'pendiente'::character varying NOT NULL
);


ALTER TABLE public.solicitudes_equipamento OWNER TO diegocoghlan;

--
-- Name: solicitudes_equipamento_id_seq; Type: SEQUENCE; Schema: public; Owner: diegocoghlan
--

CREATE SEQUENCE public.solicitudes_equipamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitudes_equipamento_id_seq OWNER TO diegocoghlan;

--
-- Name: solicitudes_equipamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: diegocoghlan
--

ALTER SEQUENCE public.solicitudes_equipamento_id_seq OWNED BY public.solicitudes_equipamento.id;


--
-- Name: detalles_solicitud id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.detalles_solicitud ALTER COLUMN id SET DEFAULT nextval('public.detalles_solicitud_id_seq'::regclass);


--
-- Name: empleados id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id SET DEFAULT nextval('public.empleados_id_seq'::regclass);


--
-- Name: equipos id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.equipos ALTER COLUMN id SET DEFAULT nextval('public.equipos_id_seq'::regclass);


--
-- Name: historial_asignaciones id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.historial_asignaciones ALTER COLUMN id SET DEFAULT nextval('public.historial_asignaciones_id_seq'::regclass);


--
-- Name: perfiles_requerimientos id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.perfiles_requerimientos ALTER COLUMN id SET DEFAULT nextval('public.perfiles_requerimientos_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: solicitudes_equipamento id; Type: DEFAULT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.solicitudes_equipamento ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_equipamento_id_seq'::regclass);


--
-- Name: detalles_solicitud detalles_solicitud_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.detalles_solicitud
    ADD CONSTRAINT detalles_solicitud_pkey PRIMARY KEY (id);


--
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id);


--
-- Name: equipos equipos_numero_serie_key; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_numero_serie_key UNIQUE (numero_serie);


--
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id);


--
-- Name: historial_asignaciones historial_asignaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.historial_asignaciones
    ADD CONSTRAINT historial_asignaciones_pkey PRIMARY KEY (id);


--
-- Name: perfiles_requerimientos perfiles_requerimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.perfiles_requerimientos
    ADD CONSTRAINT perfiles_requerimientos_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: solicitudes_equipamento solicitudes_equipamento_pkey; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.solicitudes_equipamento
    ADD CONSTRAINT solicitudes_equipamento_pkey PRIMARY KEY (id);


--
-- Name: roles unique_nombre_rol; Type: CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT unique_nombre_rol UNIQUE (nombre_rol);


--
-- Name: detalles_solicitud detalles_solicitud_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.detalles_solicitud
    ADD CONSTRAINT detalles_solicitud_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- Name: detalles_solicitud detalles_solicitud_solicitud_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.detalles_solicitud
    ADD CONSTRAINT detalles_solicitud_solicitud_id_fkey FOREIGN KEY (solicitud_id) REFERENCES public.solicitudes_equipamento(id);


--
-- Name: empleados empleados_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- Name: historial_asignaciones historial_asignaciones_empleado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.historial_asignaciones
    ADD CONSTRAINT historial_asignaciones_empleado_id_fkey FOREIGN KEY (empleado_id) REFERENCES public.empleados(id);


--
-- Name: historial_asignaciones historial_asignaciones_equipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.historial_asignaciones
    ADD CONSTRAINT historial_asignaciones_equipo_id_fkey FOREIGN KEY (equipo_id) REFERENCES public.equipos(id);


--
-- Name: historial_asignaciones historial_asignaciones_resposable_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.historial_asignaciones
    ADD CONSTRAINT historial_asignaciones_resposable_id_fkey FOREIGN KEY (resposable_id) REFERENCES public.empleados(id);


--
-- Name: perfiles_requerimientos perfiles_requerimientos_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: diegocoghlan
--

ALTER TABLE ONLY public.perfiles_requerimientos
    ADD CONSTRAINT perfiles_requerimientos_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

