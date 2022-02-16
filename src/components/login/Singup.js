import  rholling  from '../../images/mainpage/rholling.PNG';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useState } from 'react';

export default function Signup() {

    const INIT_VALUES = {
        name: '',
        id: '',
        id2: '',
        pwd: '',
        pwd2: ''
    }

    const [values, setValues] = useState(INIT_VALUES);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((preValue) => ({
            ...preValue,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        
    }

    return(
        <>
        {/* 상단 로고(클릭시 메인페이지 이동) */}
        <div className="logo">
        <Link to="/">
            <img src={rholling}/>
        </Link>
        </div>

        {/* 회원가입 inputbox */}
        <div className="signup_box">
            <form className="signup_box2" onSubmit={handleSubmit}>
                <h3>가입하기</h3>
                이름<br/>
                <input 
                    type="text" 
                    name="name" 
                    value={values.name} 
                    onChange={handleChange} 
                    placeholder="사용하실 이름을 입력해주세요" 
                    required
                />
                이메일 주소<br/>
                <input 
                    type="text" 
                    name="id" 
                    value={values.id} 
                    onChange={handleChange} 
                    placeholder="이메일 주소를 입력해주세요" 
                    required
                />
                <input 
                    type="text" 
                    name="id2" 
                    value={values.id2} 
                    onChange={handleChange} 
                    placeholder="이메일 주소를 확인합니다" 
                    required
                />
                비밀번호<br/>
                <input 
                    type="password" 
                    name="pwd" 
                    value={values.pwd} 
                    onChange={handleChange} 
                    placeholder="비밀번호를 입력해주세요" 
                    required
                />
                <input 
                    type="password" 
                    name="pwd2" 
                    value={values.pwd2} 
                    onChange={handleChange} 
                    placeholder="비밀번호를 확인합니다" 
                    required
                />
                <button id="signup_button" type='submit'>가입하기</button>
            </form>
            <hr/>

            {/* 로그인 페이지로 이동 */}
            <div>
                이미 Rholling Ideas 계정이 있으신가요?
                <Link to="/login">기존 계정으로 로그인하기</Link>
            </div>
        </div>
        </>
    );
}