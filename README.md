# AccountProject

DB 구조는 아래 코드 복붙하셈
나중에 테이블 구조 바꿔야 되니까 테스트 할 사람들 해보고

CREATE TABLE USER (
    userid VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hiredate DATETIME,
    role varchar(12),
    enabled char(1)
);

백엔드 지금 부터 만들껀데 일단 내가 필요한거 부터 완성 할껀데
일단 만들기 전까지 그냥 파일에 요소 쳐서 임시로 확인하셈 
예){ "date": "2025-01-01", "category": "식사", "amount": 12000 }

"2025-01-30 21:31" - connected DB

"2025-01-30 22:15" - 로그인 페이지 교체

"2025-02-04 10:43" - 임시 1차 대시보드 업로드 완료

"2025-02-06 16:32" 백엔드 서버 및 임시 데베 연결 완료

"2025-02-06 16:32" - 임시 대시보드 백엔드 서버 연결 완료 및 캘린더 수정 완료

"2025-02-10 15:11" - 백승준 왔다감
