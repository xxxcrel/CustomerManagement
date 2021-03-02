drop table tbl_user if exists;

create table tbl_user(
    id int not null primary key,
    avatar_url varchar(100),
    username varchar(30),
    id_card varchar(19),
    age int,
    gender varchar(10),
    address varchar(200),
    tel varchar(12)
);
