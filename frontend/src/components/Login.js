import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [credentials, setCredentials] = useState({ userid: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log("입력값 변경됨:", credentials);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:8085/api/auth/login", credentials, { withCredentials: true });
    
            if (response.data.authenticated) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                navigate("/dashboard");
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
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>로그인</h2>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <input
                    type="text"
                    name="userid"
                    placeholder="아이디"
                    value={credentials.userid}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.loginButton}>로그인</button>
                <button type="button" style={styles.signupButton} onClick={() => navigate("/signup")}>회원가입</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    form: {
        width: "300px",
        background: "white",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "14px",
    },
    loginButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#9b59b6",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        marginBottom: "10px",
    },
    signupButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#012345",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
};

export default Login;
