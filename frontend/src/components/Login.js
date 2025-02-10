import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // ✅ CSS 적용

function Login() {
    const [credentials, setCredentials] = useState({ userid: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleClear = (field) => {
        setCredentials({ ...credentials, [field]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8085/api/auth/login",
                credentials,
                { withCredentials: true } // ✅ 세션 유지
            );

            if (response.data?.authenticated) {
                console.log("✅ 로그인 성공, 사용자 정보:", response.data);
                navigate("/dashboard"); // ✅ 로그인 성공 시 대시보드로 이동
            } else {
                setErrorMessage("인증 실패: 올바른 아이디 또는 비밀번호를 입력하세요.");
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "로그인 실패!");
            } else if (error.request) {
                setErrorMessage("서버 응답이 없습니다.");
            } else {
                setErrorMessage("클라이언트 오류 발생!");
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                {/* ✅ 로고 클릭 시 대시보드로 이동 */}
                <img 
                    src="/assets/LOGO.png" 
                    alt="logo" 
                    className="image clickable" 
                    onClick={() => navigate("/dashboard")} 
                />
                
                {errorMessage && <p className="error">{errorMessage}</p>}

                {/* 아이디 입력 필드 */}
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="userid"
                        placeholder="아이디"
                        value={credentials.userid}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    {credentials.userid && (
                        <span className="clear-button" onClick={() => handleClear("userid")}>✖</span>
                    )}
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="비밀번호"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    {credentials.password && (
                        <>
                            <span className="clear-button" onClick={() => handleClear("password")}>✖</span>
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "👓" : "🕶️"}
                            </span>
                        </>
                    )}
                </div>

                <button type="submit" className="login-button">로그인</button>

                <div className="links">
                    <a href="/find-id" className="link">아이디 찾기 </a>| 
                    <a href="/forgot-password" className="link"> 비밀번호 찾기 </a>| 
                    <a href="/signup" className="link"> 회원가입</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
