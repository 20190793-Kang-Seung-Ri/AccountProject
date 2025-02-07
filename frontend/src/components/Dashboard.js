import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        authorities: [],
        authenticated: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        // ✅ 세션 또는 로컬 스토리지에서 로그인 정보 가져오기
        const storedUser = sessionStorage.getItem("user"); // localStorage.getItem("user") 도 가능

        if (storedUser) {
            setUserInfo(JSON.parse(storedUser)); // ✅ 저장된 로그인 정보 사용
        }
    }, [navigate]);

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
                    <button onClick={handleLogout}>로그아웃</button>
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
