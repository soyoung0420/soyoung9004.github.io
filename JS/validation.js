/**
* regExp 정규식 객체
* el 검사할 요소 
* msg 알람 메시지 
*/
function regExpTest(regExp, el, msg) {
    if (regExp.test(el.value)) return true;
    //적합한 문자열이 아닌 경우
    // alert(msg);
    Swal.fire({
        icon : 'warning',
        title : `Validation Warning`,
        html : `${msg}`,
        toast : true,
        position : 'middle',
    })
    el.value = "";
    el.focus(); // 커서를 해당 요소에 위치 
    return false;
}
g
// 함수 작성시 좋은점 : 여러 곳에서 재사용이 가능하다. 
// pw의 blur가 아닌 pw check에 blur이다. 
function isEqualPwd() {
    if (pwd.value === pwdCheck.value) { // 같은지 검사해서, 같으면 true, 다르면 false를 반환
        return true;
    } else {
        Swal.fire({
            icon : 'warning',
            title : 'Validation Waring',
            html : '비밀번호가 일치하지 않습니다.<br> 확인해주세요',
            toast : true,
            position : 'middle',
        
        })
        pwd.select(); // 일치하지 않으니 블록지정!
        return false;
    }
}


/**
* 제출방지
* 1. event.preventDefault() - addEventListener, onsubmit
* 2. return false - 이벤트 핸들러 만들때 onsubmit을 붙였을 때에만 가능
* 
* 변수 충돌 때문에 하단 방식으로 작성하는 것이 가장 위험도가 없다(아이디 속성으로만 작성하는 것보다)
*/
document.memberFrm.onsubmit = function () {
    const userId = document.getElementById("userId");
    const pwd = document.getElementById("pwd");
    const pwdCheck = document.getElementById("pwdCheck");
    const userName = document.getElementById("userName");
    const email = document.getElementById("email");
    const tel1 = document.getElementById("tel1");
    const tel2 = document.getElementById("tel2");
    const tel3 = document.getElementById("tel3");

   

    //1.아이디검사
    //첫글자는 반드시 영소문자로 이루어지고,
    //아이디의 길이는 4~12글자사이
    //숫자가 하나이상 포함되어야함.
    const regExp1 = /^[a-z][a-z\d]{3,11}$/;
    const regExp2 = /[0-9]/;
    if (!regExpTest(regExp1 || regExp2
        , userId
        , `아이디는 영소문자로 시작, <br> 숫자가 하나 이상 포함된 4~12자로 입력해주세요`)) // 여긴 boolean값으로 들어와야 한다. 
        return false; // submit핸들러 기본 작동(submit)을 방지


    //2.비밀번호 확인 검사
    //숫자/문자/특수문자/ 포함 형태의 8~15자리 이내의 암호 정규식
    //전체길이검사 /^.{8,15}$/
    //숫자하나 반드시 포함 /\d/
    //영문자 반드시 포함 /[a-zA-Z]/
    //특수문자 반드시 포함  /[\\*!&]/

    const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&@#]/];

    for (let i = 0; i < regExpArr.length; i++) {
        if (
            !regExpTest(
                regExpArr[i],
                pwd,
                "비밀번호는 8~15자리로,<br>숫자/문자/특수문자(*!&@#)를 포함해야 합니다."
            )
        ) {
            return false;
        }
    }

    //비밀번호일치여부
    // 똑같은 비밀번호 2번 작성한 것 맞아?
    // isEqualPwd() 함수가 false 이면 !false => true가 되어 if문이 실행되고, 
    // false값을 반환하게 된다. 그러면 다르다고 판명되어 비밀번호 입력을 막게 되는것! 
    if (!isEqualPwd()) {
        return false;
    }
    // 비밀번호/비밀번호 체크 일치여부 검사
    document.querySelector("#pwdCheck").onblur = isEqualPwd();

    //3.이름검사
    //한글2글자 이상만 허용.
    const regExp3 = /^[가-힣]{2,}$/;
    if (!regExpTest(regExp3, userName, "한글 2글자이상 입력하세요."))
        return false;

   
    //5.이메일 검사
    // 4글자 이상(\w = [a-zA-Z0-9_], [\w-\.]) @가 나오고
    // 1글자 이상(주소). 글자 가 1~3번 반복됨
    if (
        !regExpTest(
            /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/,
            email,
            "이메일 형식에 맞지 않습니다. <br> 확인 바랍니다."
        )
    )
        return false;

    //6. 전화번호 검사
    // 전화번호 앞자리는 두자리이상, 두번째 자리는 3~4자리 숫자, 세번째 자리는 4자리 숫자
    if (!regExpTest(/^0\d{1,2}$/, tel1, "숫자 2자리 이상 입력"))
        return false;
    if (!regExpTest(/^[0-9]{3,4}$/, tel2, "숫자 3~4자리 입력"))
        return false;
    if (!regExpTest(/^[0-9]{4}$/, tel3, "숫자 4자리 입력"))
        return false;

    return true; // 생략 가능 

};

//정상 제출시 알림 
const submit = document.querySelector("#submit");

submit.addEventListener('click', ()=>{
   
    Swal.fire({
        icon : 'success',
        title : `Welcome😆`,
        html : `회원 가입이 완료되었습니다.`,
        toast : true,
        position : 'middle', 
    })

})

