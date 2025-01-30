# AccountProject

DB 구조는 아래 코드 복붙하셈

create table users(
id varchar(10) primary key,
password varchar(100),
name varchar(30),
role varchar(12),
enabled char(1)
);
