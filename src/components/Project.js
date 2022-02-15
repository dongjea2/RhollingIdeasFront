import './ProjectList.css';


function Project({ item }) {
  const { projectNo ,imgUrl, category,maker, title, brief,sumPrice ,ahchiveRate, remainingDate } = item;


  return (
    <div class="item">
        <link to='/'> <img class="item-image" src={imgUrl} alt={title}/> </link>
        <button class="like"></button>
        <button class="not-like"></button>

        <div class="info">
            <link to='/'> <span class="title">{title}</span> </link>
            <div class="catelink">
                <span class="category"> <link to ="/">{category}</link> </span>
                <span class="category">|</span>
                <span class="company"> <link to="/">{maker}</link> </span>
            </div>

            <span class="iteminfo">{brief}</span>

            <div class="priceAndPercent">
                      <span class="price">{sumPrice}원</span>
                      <span class="percent">{ahchiveRate}%</span>
                      <span class="leftDay"> <img src="/rhollEE/images/mainpage/time.PNG"/> {remainingDate} </span>
            </div>
        </div>
    </div>

  );
}

function ProjectList({ items }) {
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li key={item.id}>
          <Project item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
