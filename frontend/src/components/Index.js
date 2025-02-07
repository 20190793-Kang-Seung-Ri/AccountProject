import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard"); // ✅ /로 접속하면 자동으로 /dashboard로 이동
    }, [navigate]);

    return null; // ✅ 화면에 아무것도 표시하지 않음
}

export default Index;
