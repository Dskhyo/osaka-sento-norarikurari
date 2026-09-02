/* ========================================
LOADING
======================================== */

const loadingScreen =
  document.querySelector(
    ".loading-screen"
  );


let isLoadingComplete =
  false;


const finishLoading =
  () => {

    if (isLoadingComplete) {
      return;
    }


    isLoadingComplete =
      true;


    const minimumDisplayTime =
      900;


    const remainingTime =
      Math.max(
        0,
        minimumDisplayTime - performance.now()
      );


    window.setTimeout(
      () => {

        document.body.classList.remove(
          "is-loading"
        );


        window.setTimeout(
          () => {

            if (loadingScreen) {
              loadingScreen.hidden = true;
            }

          },
          600
        );

      },
      remainingTime
    );

  };


if (document.readyState === "complete") {

  finishLoading();

} else {

  window.addEventListener(
    "load",
    finishLoading,
    { once: true }
  );

}


/* 読み込み失敗時も画面を塞ぎ続けないための安全策 */
window.setTimeout(
  finishLoading,
  5000
);



/* ========================================
HEADER SCROLL
======================================== */

const header =
  document.querySelector(".header");


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 80) {

      header.classList.add(
        "is-scrolled"
      );

    } else {

      header.classList.remove(
        "is-scrolled"
      );

    }

  }
);



/* ========================================
MOBILE MENU
======================================== */

const menuButton =
  document.querySelector(
    ".menu-button"
  );


const navLinks =
  document.querySelectorAll(
    ".nav a"
  );


if (menuButton) {

  menuButton.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "menu-open"
      );

    }
  );

}



navLinks.forEach(
  (link) => {

    link.addEventListener(
      "click",
      () => {

        document.body.classList.remove(
          "menu-open"
        );

      }
    );

  }
);



/* ========================================
ESC CLOSE MENU
======================================== */

window.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      document.body.classList.remove(
        "menu-open"
      );

    }

  }
);



/* ========================================
STANDARD SCROLL ANIMATION
既存のフェードアップ
======================================== */

const animationTargets =
  document.querySelectorAll(

    `
    .about-inner,
    .about-mascot,
    .sento-card,
    .bath-content,
    .journal-list article,
    .area-grid a,
    .instagram-inner
    `

  );


animationTargets.forEach(
  (target) => {

    target.classList.add(
      "fade-up"
    );

  }
);



const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {

      threshold:
        0.12,

      rootMargin:
        "0px 0px -30px 0px"

    }

  );



animationTargets.forEach(
  (target) => {

    observer.observe(
      target
    );

  }
);



/* ========================================
CARD STAGGER
カードを少しずつ遅らせる
======================================== */

const cards =
  document.querySelectorAll(
    ".sento-card"
  );


cards.forEach(
  (card, index) => {

    card.style.transitionDelay =
      `${index * 0.08}s`;

  }
);



/* ========================================
GSAP CHECK
GSAPが読み込まれている場合のみ実行
======================================== */

if (
  typeof gsap !== "undefined" &&
  typeof ScrollTrigger !== "undefined"
) {

  gsap.registerPlugin(
    ScrollTrigger
  );


  /* ========================================
  PAGE TURN
  セクションを本のページのように開く
  ======================================== */

  const pageTurnSections =
    gsap.utils.toArray(
      ".page-turn-section"
    );


  pageTurnSections.forEach(
    (section) => {


      /* ----------------------------------------
      左側の影を生成
      ---------------------------------------- */

      const shadow =
        document.createElement(
          "div"
        );


      shadow.classList.add(
        "page-turn-shadow"
      );


      section.appendChild(
        shadow
      );



      /* ----------------------------------------
      右側のハイライトを生成
      ---------------------------------------- */

      const highlight =
        document.createElement(
          "div"
        );


      highlight.classList.add(
        "page-turn-highlight"
      );


      section.appendChild(
        highlight
      );



      /* ========================================
      TIMELINE
      ======================================== */

      const tl =
        gsap.timeline({

          scrollTrigger: {

            trigger:
              section,

            /*
             * セクション上端が
             * 画面下から15%程度入ったところ
             */
            start:
              "top 85%",

            /*
             * 一度だけ再生
             */
            once:
              true

          }

        });



      /* ========================================
      SECTION PAGE TURN
      ======================================== */

      tl.fromTo(

        section,

        {

          /*
           * 左側から少し閉じている状態
           */
          rotationY:
            -16,

          /*
           * 少し左へずらしておく
           */
          x:
            -50,

          opacity:
            0,

          /*
           * 奥行き
           */
          transformPerspective:
            1200,

          /*
           * 本の綴じ部分を左側に設定
           */
          transformOrigin:
            "left center"

        },

        {

          rotationY:
            0,

          x:
            0,

          opacity:
            1,

          duration:
            1.15,

          ease:
            "power3.out"

        }

      );



      /* ========================================
      LEFT SHADOW
      左側の紙の影
      ======================================== */

      tl.fromTo(

        shadow,

        {

          opacity:
            0,

          scaleX:
            0.2,

          x:
            -25

        },

        {

          opacity:
            0.55,

          scaleX:
            1,

          x:
            0,

          duration:
            0.45,

          ease:
            "power2.out"

        },

        /*
         * Timeline開始直後から実行
         */
        0

      );



      /*
       * ページが開くにつれて
       * 左側の影を消す
       */

      tl.to(

        shadow,

        {

          opacity:
            0,

          scaleX:
            0.4,

          duration:
            0.6,

          ease:
            "power2.inOut"

        },

        0.5

      );



      /* ========================================
      RIGHT HIGHLIGHT
      紙の右端が反って光る演出
      ======================================== */

      tl.fromTo(

        highlight,

        {

          opacity:
            0,

          scaleX:
            0.3,

          /*
           * 少し外側から入ってくる
           */
          x:
            30

        },

        {

          opacity:
            0.7,

          scaleX:
            1,

          x:
            0,

          duration:
            0.5,

          ease:
            "power2.out"

        },

        /*
         * ページが少し開いたところから
         */
        0.1

      );



      /*
       * 開ききったら
       * ハイライトを消す
       */

      tl.to(

        highlight,

        {

          opacity:
            0,

          scaleX:
            0.45,

          duration:
            0.55,

          ease:
            "power2.inOut"

        },

        0.55

      );



      /* ========================================
      PAPER SETTLE
      最後にほんの少し紙が落ち着く動き
      ======================================== */

      tl.fromTo(

        section,

        {

          rotateZ:
            -0.3

        },

        {

          rotateZ:
            0,

          duration:
            0.35,

          ease:
            "power1.out"

        },

        0.7

      );

    }

  );



  /* ========================================
  REFRESH
  画像読み込み後に位置を再計算
  ======================================== */

  window.addEventListener(
    "load",
    () => {

      ScrollTrigger.refresh();

    }
  );

}
