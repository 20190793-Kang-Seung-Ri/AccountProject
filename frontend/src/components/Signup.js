import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        userid: "",
        password: "",
        username: "",
        email: "",
        hiredate: new Date().toISOString().slice(0, 10), // 날짜 형식 수정
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            const response = await axios.post("http://localhost:8085/api/users/register", formData);

            alert(response.data.message);
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("회원가입에 실패했습니다.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>회원 가입</h2>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <input
                    type="text"
                    name="userid"
                    placeholder="아이디"
                    value={formData.userid}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="이름"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.signupButton}>회원가입</button>
            </form>
        </div>
    );
}

const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" },
    form: { width: "300px", background: "white", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" },
    input: { width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "14px" },
    signupButton: { width: "100%", padding: "10px", backgroundColor: "#012345", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" },
    error: { color: "red", fontSize: "14px", marginBottom: "10px" },
};

export default Signup;
