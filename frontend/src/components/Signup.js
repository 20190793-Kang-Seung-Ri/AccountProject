import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // ✅ 스타일 파일 불러오기

function Signup() {
    const [formData, setFormData] = useState({
        userid: "",
        password: "",
        username: "",
        email: "",
        hiredate: new Date().toISOString().slice(0, 10), // ✅ 날짜 형식 수정
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClear = (field) => {
        setFormData({ ...formData, [field]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userid || !formData.password || !formData.username || !formData.email) {
            setErrorMessage("모든 필드를 입력해주세요.");
            return;
        }

        if (formData.password.length < 3) {
            setErrorMessage("비밀번호는 최소 3자 이상이어야 합니다.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("올바른 이메일 형식이 아닙니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8085/api/users/register", formData, { withCredentials: true });
    
            // ✅ 회원가입 성공 메시지 표시
            alert(response.data?.message || "회원가입 성공!");
            navigate("/dashboard");
        } catch (error) {
            console.error("회원가입 오류:", error);
    
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.response) {
                setErrorMessage("서버 응답 오류: " + error.response.status);
            } else if (error.request) {
                setErrorMessage("서버에 응답이 없습니다. 네트워크 상태를 확인해주세요.");
            } else {
                setErrorMessage("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
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
                        value={formData.userid}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    {formData.userid && (
                        <span className="clear-button" onClick={() => handleClear("userid")}>✖</span>
                    )}
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="input-wrapper">
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    {formData.password && (
                        <span className="clear-button" onClick={() => handleClear("password")}>✖</span>
                    )}
                </div>

                {/* 이름 입력 필드 */}
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="username"
                        placeholder="이름"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    {formData.username && (
                        <span className="clear-button" onClick={() => handleClear("username")}>✖</span>
                    )}
                </div>

                {/* 이메일 입력 필드 */}
                <div className="input-wrapper">
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    {formData.email && (
                        <span className="clear-button" onClick={() => handleClear("email")}>✖</span>
                    )}
                </div>

                <button type="submit" className="login-button">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;
