import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Login.css";

function Dashboard() {
    const [userInfo, setUserInfo] = useState({
        userid: "",
        username: "",
        email: "",
        hiredate: "",
        authorities: [],
        authenticated: false,
    });

    useEffect(() => {
        axios.get("http://localhost:8085/api/userinfo", { withCredentials: true })
            .then(response => {
                if (response.data.authenticated) {
                    setUserInfo({
                        userid: response.data.userid,
                        username: response.data.username,
                        email: response.data.email,
                        hiredate: response.data.hiredate,
                        authorities: response.data.authorities || [],
                        authenticated: true,
                    });
                }
            })
            .catch(error => {
                console.error("❌ 사용자 정보 불러오기 실패:", error);
                setUserInfo({ authenticated: false }); // 인증 실패 시 초기화
            });
    }, []);
    

    const handleLogout = () => {
        axios.post("http://localhost:8085/logout", {}, { withCredentials: true })
            .then(() => {
                // ✅ 세션 스토리지 및 로컬 스토리지 삭제
                sessionStorage.removeItem("user");
                localStorage.removeItem("user");
    
                // ✅ 상태 초기화
                setUserInfo({ username: "", authorities: [], authenticated: false });
    
                // ✅ 로그인 페이지로 이동
                window.location.href = "/dashboard";
            })
            .catch(error => console.error("Logout failed:", error));
    };

    return (
        <div>
            <h1 style={{ color: "red" }}>대쉬보드 화면</h1>
    
            <h4>
                <p>👤 로그인 사용자 : {userInfo.authenticated ? userInfo.username : "로그인 안됨"}</p>
                <p>🔑 사용자 권한 : {userInfo.authenticated ? (userInfo.authorities?.join(", ") || "권한 없음") : "권한 없음"}</p>
            </h4>
    
            <div>
                {userInfo.authenticated ? (
                    <>
                        <button onClick={handleLogout}>로그아웃</button>
                        <a href="/edit"><button>회원정보 수정</button></a>
                    </>
                ) : (
                    <>
                        <a href="/login"><button>로그인</button></a>
                        <a href="/signup"><button>회원가입</button></a>
                    </>
                )}
            </div>
        </div>
    );
    
}

export default Dashboard;
