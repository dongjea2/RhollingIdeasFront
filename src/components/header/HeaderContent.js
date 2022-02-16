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
                                <li key={category.id}><Link to={category.url}>{category.category}</Link></li>
                            ))}
                        </ul>
                    </li>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="#">인기</Link></li>
                    <li><Link to="#">신규</Link></li>
                    <li><Link to="#">마감임박</Link></li>
                    <li><Link to="#">공개예정</Link></li>
                </ul>
            </nav>
            <div className="search">
                <form>
                    <input type="search" placeholder="검색어를 입력해주세요." className="search-input" name="keyword" defaultValue="" autoComplete="off" />
                    <div><img src={require('../../images/mainpage/search.png')} alt="search" /></div>
                </form>
            </div>
        </div>
    </div>
    )
}