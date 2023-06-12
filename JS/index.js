// 모달 팝업 기능

// 모달 팝업 속성 가져오기 
const modalLinks = document.querySelectorAll('.popLink');
const modalOverlay = document.querySelectorAll('.window');
const closeButtons = document.querySelectorAll('.close');

// 메뉴를 클릭하면 해당하는 모달 팝업을 열기
modalLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay[index].style.display = 'block';
    });
});

// 닫기 버튼 클릭 시 모달 팝업을 닫기
closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        modalOverlay[index].style.display = 'none';
    });
});


// 이미지 슬라이드 기능

// 이미지 슬라이드를 감싸는 창 
const slide_wrapper = document.querySelectorAll('.slide_wrapper');

// 각 해당되는 이미지 슬라이드를 개별로 움직이도록 구현
slide_wrapper.forEach((wrapper) => {
    const slideBox = wrapper.querySelector('ul'); // ul태그 
    const slides = wrapper.querySelectorAll('li');  // li태그 

    // 현재 슬라이드 index
    let slideIndex = 0;

    // 이미지의 수(슬라이드의 개수)
    const slideCount = slides.length;
    console.log(slideCount);

    // 버튼 객체 가져오기 
    const prev = wrapper.querySelector('#previous');
    const next = wrapper.querySelector('#next');

    // 슬라이드의 크기
    const slideWidth = 250;
    const slideMargin = 10;

    // ul 넓이 계산
    slideBox.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

    // 슬라이드의 번호에 따라 크기 만큼 이동
    const moveSlide = (num) => {
        slideBox.style.left = `${-num * (slideWidth + slideMargin)}px`;
        slideIndex = num;
    };

    // next 버튼 클릭시 슬라이등 오른쪽으로 이동
    // 최대 크기-3인 이유는 총 마지막 이미지가 보여지는 화면의 마지막칸에서 멈춰야 하기 때문이다.
    next.addEventListener('click', () => {
        if (slideIndex < slideCount - 3) {
            moveSlide(slideIndex + 1);
        } else {
            moveSlide(0);
            // 처음으로 돌아감
        }
    });

    // prev 버튼 클릭시 슬라이드 앞으로 이동
    prev.addEventListener('click', () => {
        if (slideIndex > 0) {
            moveSlide(slideIndex - 1);
        };
    });

})


// 메인 프로필 클릭에 따라 nav 토글 만들기
const profile = document.querySelector("#header #profile");
const nav = document.querySelector("#header nav");

profile.addEventListener('click', () => {
    nav.classList.toggle('invisible');
});

// JOIN폼에서 Login버튼 누르면 안내 메시지 나오기 
const login_btn = document.querySelector("#login_btn");
login_btn.onclick = (e) => {
    e.preventDefault();
    Swal.fire({
        icon: 'info',
        title: `Updating...😥`,
        html: `로그인은 추후 업데이트 예정입니다. `,
        toast: true,
        position: 'middle',
    })


}



