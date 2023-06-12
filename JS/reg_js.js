 // JavaScript로 모달 팝업을 제어하는 부분
 const modalLinks = document.querySelectorAll('.popLink');
 console.log(modalLinks);
 const modalOverlay = document.querySelectorAll('.window');
 console.log(modalOverlay);
 const closeButtons = document.querySelectorAll('.close');

 // 링크를 클릭하면 모달 팝업을 열기
 modalLinks.forEach((link, index) => {
     link.addEventListener('click', (e) => {
         e.preventDefault();
         modalOverlay[index].style.display = 'block';
     });
 });

 // 닫기 버튼을 클릭하면 모달 팝업을 닫기
 closeButtons.forEach((button, index) => {
     button.addEventListener('click', () => {
         modalOverlay[index].style.display ='none';
     });
 });


 // 회원정보 조회
const loadMemberList = () => {

    const tbody = document.querySelector("table#memberLog tbody");
    const memberLists = JSON.parse(localStorage.getItem('memberLists'));

    tbody.innerHTML = memberLists.reduce((html, {userId, pwd, userName, email, tel1, tel2, tel3}, index) => {
        const tr = `
        <tr>
                <td style="text-align: center;">${index+1}</td>    
                <td>${userName}</td>    
                <td>${userId}</td>    
                <td>${email}</td>    
                <td>${tel1}-${tel2}-${tel3}</td>    
        </tr>
        `;
        return html+tr;
    }, "");
};

const saveMemberList = () =>{
    const frm = document.memberFrm;
    const userId = frm.userId;
    const pwd = frm.pwd; 
    const pwdCheck = frm.pwdCheck;
    const userName = frm.userName;
    const email = frm.email;
    const tel1 = frm.tel1;
    const tel2 = frm.tel2;
    const tel3 = frm.tel3;


    const memberList = new Member(userId.value, pwd.value, userName.value, email.value, tel1.value, tel2.value, tel3.value);

    const memberLists = JSON.parse(localStorage.getItem('memberLists')) || [];
    // 배열에 각 멤버 객체를 담기
    memberLists.push(memberList);
    const jsonStr = JSON.stringify(memberLists);
    localStorage.setItem("memberLists", jsonStr);

    // 초기화 
    userId.value = '';
    userName.value = '';
    pwd.value = '';
    pwdCheck.value = '';
    email.value = '';
    tel1.value = '';
    tel2.value = '';
    tel3.value = '';

    loadMemberList();
}

class Member{

    constructor(userId, pwd, userName, email, tel1, tel2, tel3){
        this.userId = userId;
        this.pwd = pwd;
        this.userName = userName;
        this.email = email;
        this.tel1 = tel1;
        this.tel2 = tel2;
        this.tel3 = tel3;
    }
}

window.onload = () =>{
    loadMemberList();
};