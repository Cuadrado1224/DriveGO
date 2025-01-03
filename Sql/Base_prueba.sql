PGDMP  +                    |         	   DB_Driver    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16387 	   DB_Driver    DATABASE     ~   CREATE DATABASE "DB_Driver" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "DB_Driver";
                     postgres    false            �            1259    24577    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id_usu integer NOT NULL,
    nom_usu character varying(15) NOT NULL,
    ape_usu character varying(20) NOT NULL,
    corr_usu character varying(50) NOT NULL,
    con_usu character varying(20) NOT NULL,
    cargo character varying(15) NOT NULL,
    cont_temp character varying(20),
    tmp_cont character varying(2) DEFAULT 'no'::character varying
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    24576    usuarios_id_usu_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.usuarios_id_usu_seq;
       public               postgres    false    218            �           0    0    usuarios_id_usu_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.usuarios_id_usu_seq OWNED BY public.usuarios.id_usu;
          public               postgres    false    217            �            1259    24583 	   vehiculos    TABLE     �  CREATE TABLE public.vehiculos (
    mat_veh character varying(10) NOT NULL,
    mar_veh character varying(20) NOT NULL,
    mod_veh character varying(20) NOT NULL,
    tip_veh character varying(20) NOT NULL,
    anio_veh integer NOT NULL,
    est_veh character varying(20) NOT NULL,
    tip_trans_veh character varying(20) NOT NULL,
    kil_veh integer NOT NULL,
    num_ocu_veh integer NOT NULL,
    num_pue_veh integer NOT NULL,
    img_veh text
);
    DROP TABLE public.vehiculos;
       public         heap r       postgres    false            [           2604    24580    usuarios id_usu    DEFAULT     r   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usu SET DEFAULT nextval('public.usuarios_id_usu_seq'::regclass);
 >   ALTER TABLE public.usuarios ALTER COLUMN id_usu DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    24577    usuarios 
   TABLE DATA           k   COPY public.usuarios (id_usu, nom_usu, ape_usu, corr_usu, con_usu, cargo, cont_temp, tmp_cont) FROM stdin;
    public               postgres    false    218   �       �          0    24583 	   vehiculos 
   TABLE DATA           �   COPY public.vehiculos (mat_veh, mar_veh, mod_veh, tip_veh, anio_veh, est_veh, tip_trans_veh, kil_veh, num_ocu_veh, num_pue_veh, img_veh) FROM stdin;
    public               postgres    false    219   �       �           0    0    usuarios_id_usu_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.usuarios_id_usu_seq', 13, true);
          public               postgres    false    217            ^           2606    24582    usuarios usuarios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usu);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            `           2606    24589    vehiculos vehiculos_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (mat_veh);
 B   ALTER TABLE ONLY public.vehiculos DROP CONSTRAINT vehiculos_pkey;
       public                 postgres    false    219            �   �   x�����@E�cxib'��Dc,�h����#,l��+Fc�B�[̙��SC�Qj=��u��Qr�I�i�A���v�BK�#�:�:G��wV6����P��B�[#�������Y)�
�P�_.�d�<g�:=�g���&8���P��D�����m�B< ;�po      �   T  x�u�mk�0�?��e�ė4Ð�Ѯ�E�0���t�邎v�~FYm;{!�܇��%�9O�8�@xȓ�?<�I�<���˪<?��heS֥lZ�_�NT��>`ۏ�[�/��8p�P�	m��3�����\������,;C rz�5���?s��EQ�]�!sO���^tU{��n�ŷɖ3H�n����̫���w#F����0�1� �-��d�U��2�;lB�0�
�-(������V�I�U_]Y���cg^�R�,�5��6J��z�(ܥ��$fTũkrQB�e+��pf�����\�c�{F]۟���	puR=�IiUU�����1f�v���-����C     