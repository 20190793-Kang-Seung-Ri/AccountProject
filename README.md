# AccountProject

DB 구조는 아래 코드 복붙하셈
나중에 테이블 구조 바꿔야 되니까 테스트 할 사람들 해보고

create table users(
id varchar(10) primary key,
password varchar(100),
name varchar(30),
role varchar(12),
enabled char(1)
);

"2025-01-30 21:31" - connected DB
"2025-01-30 22:15" - 로그인 페이지 교체
