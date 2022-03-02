import { Link } from "react-router-dom";
import categorys from './category.json'

export default function HeaderContent() {
    return(
        <div className="header-content">
        <div className="header-search">
            <nav className="cate-navbar">
                <ul className="main-menu">
                    <li className="cate">
                        카테고리
                        <ul className="category">
                            {categorys.map((category) => (
                                <li key={category.id}>
                                    <div>
                                    <a href={category.url}>{category.category}</a></div></li>
                            ))}
                        </ul>
                    </li>
                    <li><Link to="/">홈</Link></li>
                    <li><a href="/discover?sort=likeCnt">인기</a></li>
                    <li><a href="/discover?sort=newRelease">신규</a></li>
                    <li><a href="/discover?sort=endCome">마감임박</a></li>
                    <li><a href="/discover?onGoing=preLaunch">공개예정</a></li>
                </ul>
            </nav>
            <div className="search">
                <form action="/discover">
                    <input type="search" placeholder="검색어를 입력해주세요." className="search-input" name="keyword" defaultValue="" autoComplete="off" />
                    <div><img src={require('../../images/mainpage/search.png')} alt="search" /></div>
                </form>
            </div>
        </div>
    </div>
    )
}