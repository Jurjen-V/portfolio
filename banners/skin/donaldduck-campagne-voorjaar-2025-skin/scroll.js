$(function () {
    var borders = document.querySelectorAll('.border');
    var stage = document.querySelector('#stage');
    var minHeight = 247;
    var maxScrollDepth = 230;
    // function resizeContainer() {
    //     let pexiscrolldepth = (PEXI.data && PEXI.data.skin) ? PEXI.data.skin.scrollDepth : 0;
    //     let stageHeight = (stage.clientHeight + 60);
    //     console.log('stageHeight:', stageHeight);
    //     console.log('pexiscrolldepth:', pexiscrolldepth);
    //     let calculatedHeight = (stageHeight  - 226) + pexiscrolldepth / 2;
        
    //     if(calculatedHeight < minHeight) {
    //         calculatedHeight = minHeight;
    //     }
    //     borders.forEach(function (border) {
    //         border.style.setProperty('height', `${calculatedHeight}px`, 'important');
    //     });
    //     console.log(calculatedHeight);

    // }
    // resizeContainer();

    let lastScrollDepth = PEXI.data.skin.scrollDepth;

    function updateBorderHeight(scrollDepth ) {

        let borderHeight;
        if (scrollDepth) {
            borderHeight = `calc(${PEXI.data.skin.screenHeight}px - ${minHeight}px + ${scrollDepth}px - ${PEXI.data.skin.offset}px)`;
            borders.forEach(function (border) {
                border.style.borderTop = '3px solid #000';
            });
        }
        if (scrollDepth >= 250 + PEXI.data.skin.offset) {
            borderHeight = `calc(${PEXI.data.skin.screenHeight}px)`;
            borders.forEach(function (border) {
                border.style.borderTop = '0px solid #000';
            });
        }

        if(window.innerHeight === 1500 ){
            borderHeight = `calc(${window.innerHeight}px - ${minHeight}px)`;
        }
        if (scrollDepth === 0) {
            borderHeight = ``;
        }
            // console.group('Scroll gegevens');
            // console.log(`screen height: ${PEXI.data.skin.screenHeight}`);
            // console.log(`stage height: ${window.innerHeight}`);
            // console.log(`scrollDepth: ${scrollDepth}`);
            // console.log('Skin Offset:', PEXI.data.skin.offset);
            // console.log('borderHeight:', PEXI.data.skin.screenHeight + scrollDepth);
            // console.log('minHeight:', minHeight);
            // console.groupEnd();
        borders.forEach(function (border) {
            border.style.setProperty('height', borderHeight, 'important');
        });
    }
    PEXI.scrollDepth(response => {
        if(response < 1500){
            updateBorderHeight(PEXI.data.skin.scrollDepth);
        }
    });
    window.addEventListener("resize", () => {
	    requestAnimationFrame(() => {
            updateBorderHeight(PEXI.data.skin.scrollDepth);
        });
	});
});