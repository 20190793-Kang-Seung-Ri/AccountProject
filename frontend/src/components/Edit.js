import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // ✅ 스타일 파일 불러오기

function Edit() {
    const [formData, setFormData] = useState({
        userid: "",
        password: "",
        username: "",
        email: "",
        hiredate: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // ✅ 로그인된 사용자 정보 불러오기
    useEffect(() => {
        axios.get("http://localhost:8085/api/userinfo", { withCredentials: true })
            .then(response => {
                console.log("✅ API 응답 데이터:", response.data); // 🚀 콘솔에서 데이터 확인
                
                if (response.data.authenticated) {
                    setFormData({
                        userid: response.data.userid,
                        password: "",
                        username: response.data.username,
                        email: response.data.email,
                        hiredate: response.data.hiredate,
                    });
                }
            })
            .catch(error => console.error("사용자 정보 불러오기 실패:", error));
    }, []);
    

    // ✅ 입력 필드 변경 핸들러
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClear = (field) => {
        setFormData({ ...formData, [field]: "" });
    };

    // ✅ 회원정보 수정 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email) {
            setErrorMessage("이름과 이메일을 입력해주세요.");
            return;
        }

        if (formData.password && formData.password.length < 3) {
            setErrorMessage("비밀번호는 최소 3자 이상이어야 합니다.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("올바른 이메일 형식이 아닙니다.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8085/api/users/${formData.userid}`, formData, {
                withCredentials: true,
            });

            alert(response.data?.message || "회원정보가 수정되었습니다.");
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("회원정보 수정에 실패했습니다.");
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

                {/* 아이디 (수정 불가능) */}
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="userid"
                        value={formData.userid}
                        disabled
                        className="input"
                    />
                </div>

                {/* 비밀번호 입력 필드 (선택 사항) */}
                <div className="input-wrapper">
                    <input
                        type="password"
                        name="password"
                        placeholder="새 비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    {formData.password && (
                        <>
                            <span className="clear-button" onClick={() => handleClear("password")}>✖</span>
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "👓" : "🕶️"}
                            </span>
                        </>
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

                <button type="submit" className="login-button">수정하기</button>
            </form>
        </div>
    );
}

export default Edit;
