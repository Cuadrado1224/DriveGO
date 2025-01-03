PGDMP      7                |         	   DB_Driver    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    tmp_cont character varying(2) DEFAULT 'no'::character varying,
    verificado boolean DEFAULT false,
    codigo_verificacion character varying(255)
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
          public               postgres    false    217            �            1259    24583 	   vehiculos    TABLE     7  CREATE TABLE public.vehiculos (
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
    img_veh text,
    precio_veh numeric(10,2) DEFAULT 0.00,
    chasis character varying(20),
    combustible character varying(20)
);
    DROP TABLE public.vehiculos;
       public         heap r       postgres    false            [           2604    24580    usuarios id_usu    DEFAULT     r   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usu SET DEFAULT nextval('public.usuarios_id_usu_seq'::regclass);
 >   ALTER TABLE public.usuarios ALTER COLUMN id_usu DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    24577    usuarios 
   TABLE DATA           �   COPY public.usuarios (id_usu, nom_usu, ape_usu, corr_usu, con_usu, cargo, cont_temp, tmp_cont, verificado, codigo_verificacion) FROM stdin;
    public               postgres    false    218          �          0    24583 	   vehiculos 
   TABLE DATA           �   COPY public.vehiculos (mat_veh, mar_veh, mod_veh, tip_veh, anio_veh, est_veh, tip_trans_veh, kil_veh, num_ocu_veh, num_pue_veh, img_veh, precio_veh, chasis, combustible) FROM stdin;
    public               postgres    false    219   �       �           0    0    usuarios_id_usu_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.usuarios_id_usu_seq', 29, true);
          public               postgres    false    217            `           2606    24582    usuarios usuarios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usu);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            b           2606    24589    vehiculos vehiculos_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (mat_veh);
 B   ALTER TABLE ONLY public.vehiculos DROP CONSTRAINT vehiculos_pkey;
       public                 postgres    false    219            �   �  x���Kkc1F׾?�Ȳ��nJW-L)��U6�,��yl��י��������ӑ��W�qOGn;n[������~{_�z���y��c[ϛy8}޹ū�l]w�;�.�i��,�b�ԑ���=��l��8��D�b(c+ ��вv��T!�8y�Y.�W�x�<����nfe��GsK���=���ʓ؋��l��������~����w>���8�<���Q��� ���̿��8ƨq�ș�4��|dMֺ'��r9��4}A�O5�V�� iJ,�"'�4�L>܊��P����tR�w��N�E��cWn�FPI)H�	oN�aR�C�;q����r��s㽈L�*����R��1�j,9MHw�*��+h�#8I��AE �hc�t/4/
Z��� �j�!�"ߋ�^�#�k	BM�UV�a�N��i�>�R��      �   a  x�u�mk�0�?_��\L�ԏaH��t)C(H�t:�tAG�_����Vo����sn����s�<�qh>^���q�1�DU����z>lD#�*d�(��[Q�7x��m?�6lnJ�O|�8I*�}�? ��qk�?��y���^�^dV��ɓh��^�3���i���g��ꭗ��II�!S`�0n�:8�T�{c�Z��ZJ2U���Tu��j
����.����TU�R+�/��+�ڢ�(4m �H�,�(yg�uĢp���̺q�׶�D����M�`����i����㹝!m�HD���2��UYޣ�&P>&�,�w�' ���p�Rt�]�>	�͇�G۲�_����     