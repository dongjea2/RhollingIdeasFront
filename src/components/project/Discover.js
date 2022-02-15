import './Discover.css';
import ProjectList from './Project';
import items from '../../api/mock/projectMock.json';

export default function Discover(){
    return(
<div className="fundingList">
    <span className="listTitle">전체</span>
    <div className="listInfo">
        <button className="status"></button>
        <button className="achiev"></button>
        <button className="recommend"></button>
    </div>
    <div className="listLength">
        <div>
            <span className="fundcount">{items.length}</span>
            개의 프로젝트가 있습니다.
        </div>
        <button className="orderBy"></button>
    </div>
    <ProjectList items={items}/>
</div>
    );
}