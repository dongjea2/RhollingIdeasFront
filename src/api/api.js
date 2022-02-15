//API 함수를 작성해 주세요 (브런치로 각자 작업 후, 충돌 난 사람이 병합하기)


//메인 페이지, 디스커버 페이지에 보여지는 프로젝트
export async function getProjects(){
  const response = await fetch('https://learn.codeit.kr/api/foods');
  const body = await response.json();
  return body;
}