document.getElementById('fetchDataButton').addEventListener('click', async function() {
    try {
        const response = await fetch('/fetchData');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // 데이터가 올바르게 로드되는지 확인
        displayData(data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
    // 테이블이 있는 컨테이너의 높이 자동 조정
    dataContainer.style.height = `${table.scrollHeight}px`;
});



window.addEventListener('resize', adjustHeight);
window.addEventListener('DOMContentLoaded', adjustHeight);

function adjustHeight() {
    const dataContainer = document.getElementById('dataContainer');
    const table = document.getElementById('tableid');

    if (table.offsetHeight > window.innerHeight) {
        dataContainer.style.height = table.offsetHeight + 'px';
    } else {
        dataContainer.style.height = 'auto';
    }
}






function formatDateTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // 기존 콘텐츠 제거

    if (data.length === 0) {
        dataContainer.textContent = 'No data available';
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%'; // 테이블 너비를 100%로 설정
    table.style.borderCollapse = 'collapse'; // 테이블 테두리 병합
    table.style.textAlign = 'center'; // 테이블 전체 가운데 정렬
    table.id = "tableid";

    // 테이블 헤더 생성
    table.innerHTML = `
        <tr>
            <th>수</th>
            <th>이름</th>
            <th>성별</th>
            <th>학번</th>
            <th>전화번호</th>
            <th>나이</th>
            <th>전공(학과)</th>
            <th>제출일시</th>
        </tr>
    `;


    // 테이블 행에 데이터 삽입
    data.forEach((item, index) => {
        const row = table.insertRow();
        const cellValues = Object.values(item); // 객체의 값들만 추출

        // 순번 셀 추가
        const numberCell = row.insertCell();
        numberCell.textContent = index + 1; // 1부터 시작

        cellValues.forEach((cellText, i) => {
            const cell = row.insertCell();
            cell.style.textAlign = 'center'; // 셀 내용 가운데 정렬
            if (i === cellValues.length - 1) { // 마지막 셀이 Write Date인 경우
                cell.textContent = formatDateTime(cellText);
            } else {
                cell.textContent = cellText !== null && cellText !== undefined ? cellText : '';
            }
        });
  
    });

    dataContainer.appendChild(table);

    // 테이블이 있는 컨테이너의 높이 자동 조정
    dataContainer.style.height = `${table.scrollHeight}px`;
}