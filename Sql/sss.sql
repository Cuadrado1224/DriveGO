UPDATE USUARIOS SET nom_usu='pepe',ape_usu='perez',corr_usu='pp@gmail.com',cargo='Administrador' where id_usu=1;
INSERT INTO USUARIOS(nom_usu,ape_usu,corr_usu,con_usu,cargo) values ('Alejandro','perez','ale@gmail.com','123456','Administrador');

Select * from usuarios;

Delete from Usuarios where id_usu=6;